import * as assignmentRepo from "./assignment.repository.js";
import { logActivity } from "../../utils/activityLogger.js";
import * as employeeRepo from "../employees/employee.repository.js";
import * as locationRepo from "../locations/location.repository.js";

export const createAssignment = async (data) => {

  const assignmentData = {
    empId: data.empId,
    locationId: data.locationId,
    shiftStartTime: data.shiftStartTime,
    shiftEndTime: data.shiftEndTime,
    assignedBy: data.assignedBy || null
  };

  const assignment = await assignmentRepo.createAssignment(assignmentData);

  await logActivity({
    type: "success",
    action: "assignment_created",
    title: "Guard Assigned",
    detail: `Guard ${assignment.empId} assigned`,
    actorId: assignment.assignedBy,
    taggedId: assignment.empId
  });

  return assignment;
};

export const listAssignments = async () => {
  return await assignmentRepo.getAssignments();
};

export const assignGuardLocation = async (data) => {

  const {
    empId,
    managerId,
    latitude,
    longitude,
    buildingName,
    street,
    city,
    state,
    pincode,
    shiftStartTime,
    shiftEndTime
  } = data;

  const guard = await employeeRepo.getEmployeeById(empId);

  if (!guard)
    throw new Error("Guard not found");

  if (guard.role !== "security_guard")
    throw new Error("Employee is not a guard");

  if (guard.assignedManagerId !== managerId)
    throw new Error("Guard is not assigned to this manager");

  const manager = await employeeRepo.getEmployeeById(managerId);

  if (!manager || manager.role !== "manager")
    throw new Error("Invalid manager");

  if (guard.assignedAdminId !== manager.assignedAdminId)
    throw new Error("Guard and manager must belong to same admin");

  // create location
  const location = await locationRepo.createLocation({
    latitude,
    longitude,
    buildingName,
    street,
    city,
    state,
    pincode,
    createdBy: managerId
  });

  // create assignment
  const assignment = await assignmentRepo.createAssignment({
    empId,
    locationId: location.locationId,
    shiftStartTime,
    shiftEndTime,
    assignedBy: managerId
  });

  await logActivity({
    type: "success",
    action: "guard_assigned_location",
    title: "Guard assigned to location",
    detail: guard.name,
    actorId: managerId,
    taggedId: empId
  });

  return {
    location,
    assignment
  };

};