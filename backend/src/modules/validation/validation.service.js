import { logActivity } from "../../utils/activityLogger.js";
import { getAssignmentByEmployee } from "../assignments/assignment.repository.js";
import { getLocationById } from "../locations/location.repository.js";
import { calculateDistanceMeters } from "../../utils/geoUtils.js";
import { verifyEmployeeFace } from "../faceTemplates/faceTemplate.service.js";

export const managerVisit = async (data) => {

  const {
    managerId,
    empId,
    latitude,
    longitude,
    templateVector
  } = data;

  // Face verification of guard
  const faceResult = await verifyEmployeeFace({
    employeeId: empId,
    templateVector
  });

  if (!faceResult.verified) {
    throw new Error("Face verification failed");
  }

  // Get guard assignment
  const assignment = await getAssignmentByEmployee(empId);

  if (!assignment)
    throw new Error("Guard has no assigned location");

  const location = await getLocationById(assignment.locationId);

  if (!location)
    throw new Error("Location not found");

  // GPS validation
  const distance = calculateDistanceMeters(
    latitude,
    longitude,
    location.latitude,
    location.longitude
  );

  if (distance > location.radius)
    throw new Error("Manager is outside the location radius");

  // Activity log
  const log = await logActivity({
    type: "success",
    action: "manager_validation",
    title: "Manager Surprise Visit",
    detail: `Manager validated guard ${empId} at location ${assignment.locationId}`,
    actorId: managerId,
    taggedId: empId
  });

  return log;
};