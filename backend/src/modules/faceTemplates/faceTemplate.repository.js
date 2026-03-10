import { db } from "../../config/firebase.js";
import { generateId } from "../../utils/idGenerator.js";

const COLLECTION = "faceTemplates";

export const createFaceTemplate = async (data) => {

  const templateId = await generateId("faceTemplates", "FCT");

  const template = {
    templateId,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.collection(COLLECTION).doc(templateId).set(template);

  return template;
};


export const getTemplateByEmployee = async (employeeId) => {

  const snapshot = await db
    .collection(COLLECTION)
    .where("employeeId", "==", employeeId)
    .get();

  if (snapshot.empty) return null;

  return snapshot.docs[0].data();
};