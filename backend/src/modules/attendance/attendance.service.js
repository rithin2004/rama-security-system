import * as attendanceRepo from "./attendance.repository.js";
import { getAssignmentByEmployee } from "../assignments/assignment.repository.js";
import { calculateDistanceMeters } from "../../utils/geoUtils.js";
import { getLocationById } from "../locations/location.repository.js";
import { verifyEmployeeFace } from "../faceTemplates/faceTemplate.service.js";
import { logActivity } from "../../utils/activityLogger.js";
import {
  calculateWorkedHours,
  calculateAttendanceStatus
} from "../../utils/attendanceCalculator.js";


export const punchIn = async (data) => {

  const { empId, latitude, longitude, templateVector } = data;

  // Face Verification
  const faceResult = await verifyEmployeeFace({
    employeeId: empId,
    templateVector
  });

  if (!faceResult.verified) {
    throw new Error("Face verification failed");
  }

  // Get assignment
  const assignment = await getAssignmentByEmployee(empId);

  if (!assignment)
    throw new Error("Employee has no assigned shift");

  // Get location
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

  if (distance > location.radius) {
    throw new Error("You are outside the allowed attendance radius");
  }

  const now = new Date();
  const time = now.toISOString();

  const shiftDate = new Date();
  shiftDate.setHours(0, 0, 0, 0);

  const dateStr = shiftDate.toISOString().split("T")[0];
  const attendanceId = `ATT_${empId}_${dateStr}`;

  let attendance = await attendanceRepo.getAttendanceByEmployeeAndShiftDate(empId, shiftDate);

  if (!attendance) {

    attendance = {
      empId,
      locationId: assignment.locationId,
      shiftDate,
      punchInAt: [time],
      punchOutAt: [],
      workedHours: 0,
      assignedHours: 0,
      status: "present"
    };

    const createdAttendance = await attendanceRepo.createAttendanceIfNotExists(attendanceId, attendance);

    await logActivity({
      type: "success",
      action: "attendance_punch_in",
      title: "Punch In",
      detail: "Employee punched in",
      actorId: empId
    });

    return createdAttendance;
  }

  // Prevent double punch-in
  if (attendance.punchInAt.length > attendance.punchOutAt.length) {
    throw new Error("Previous punch-out missing");
  }

  attendance.punchInAt.push(time);

  await attendanceRepo.updateAttendance(attendance.attendanceId, {
    punchInAt: attendance.punchInAt
  });

  await logActivity({
    type: "success",
    action: "attendance_punch_in",
    title: "Punch In",
    detail: "Employee punched in",
    actorId: empId
  });

  return attendance;
};



export const punchOut = async (data) => {

  const { empId, latitude, longitude, templateVector } = data;

  // Face Verification
  const faceResult = await verifyEmployeeFace({
    employeeId: empId,
    templateVector
  });

  if (!faceResult.verified) {
    throw new Error("Face verification failed");
  }

  const now = new Date();
  const time = now.toISOString();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const attendance = await attendanceRepo.getAttendanceByEmployeeAndShiftDate(empId, today);

  if (!attendance)
    throw new Error("Punch in first");

  const location = await getLocationById(attendance.locationId);

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
    throw new Error("You are outside the allowed attendance radius");

  // Prevent punchOut without punchIn
  if (attendance.punchOutAt.length >= attendance.punchInAt.length)
    throw new Error("No active punch-in found");

  const lastPunchIn = new Date(
    attendance.punchInAt[attendance.punchInAt.length - 1]
  );

  const nowTime = new Date(time);

  if (nowTime <= lastPunchIn)
    throw new Error("Punch out must be after punch in");

  attendance.punchOutAt.push(time);

  const workedHours = calculateWorkedHours(
    attendance.punchInAt,
    attendance.punchOutAt
  );

  const assignment = await getAssignmentByEmployee(empId);

  if (!assignment)
    throw new Error("Employee has no assigned shift");

  const start = new Date(`1970-01-01T${assignment.shiftStartTime}:00`);
  const end = new Date(`1970-01-01T${assignment.shiftEndTime}:00`);

  let diff = end - start;

  // Night shift support
  if (diff < 0)
    diff += 24 * 60 * 60 * 1000;

  const assignedHours = diff / 3600000;

  const status = calculateAttendanceStatus(workedHours, assignedHours);

  await attendanceRepo.updateAttendance(attendance.attendanceId, {
    punchOutAt: attendance.punchOutAt,
    workedHours,
    assignedHours,
    status
  });

  await logActivity({
    type: "success",
    action: "attendance_punch_out",
    title: "Punch Out",
    detail: "Employee punched out",
    actorId: empId
  });

  return {
    ...attendance,
    workedHours,
    assignedHours,
    status
  };
};