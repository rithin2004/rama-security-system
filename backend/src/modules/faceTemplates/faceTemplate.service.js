import * as templateRepo from "./faceTemplate.repository.js";
import { db } from "../../config/firebase.js";
import { verifyFace } from "../../utils/faceMatcher.js";
import { logActivity } from "../../utils/activityLogger.js";


export const registerFace = async (data) => {

  const { employeeId, templateVector } = data;

  if (!employeeId)
    throw new Error("employeeId required");

  if (!templateVector)
    throw new Error("templateVector required");

  // Create face template
  const template = await templateRepo.createFaceTemplate({
    employeeId,
    templateVector,
    modelVersion: "face-api-v1"
  });

  // Update employee record
  await db
    .collection("employees")
    .doc(employeeId)
    .update({
      faceTemplateId: template.templateId,
      modifiedAt: new Date()
    });

  // Activity log
  await logActivity({
    type: "success",
    action: "face_registered",
    title: "Face Template Registered",
    detail: "Face template stored",
    taggedId: employeeId
  });

  return template;
};


export const getEmployeeTemplate = async (employeeId) => {

  const template = await templateRepo.getTemplateByEmployee(employeeId);

  if (!template)
    throw new Error("Face template not found");

  return template;
};


export const verifyEmployeeFace = async (data) => {

  const { employeeId, templateVector } = data;

  if (!employeeId)
    throw new Error("employeeId required");

  if (!templateVector)
    throw new Error("templateVector required");

  const template = await templateRepo.getTemplateByEmployee(employeeId);

  if (!template)
    throw new Error("Face template not registered");

  const result = verifyFace(
    template.templateVector,
    templateVector
  );

  return result;
};