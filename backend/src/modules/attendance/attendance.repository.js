import { db } from "../../config/firebase.js";
import { generateId } from "../../utils/idGenerator.js";

const COLLECTION = "attendance";

export const createAttendance = async (attendanceId, data) => {

  const attendance = {
    attendanceId,
    ...data,
    createdAt: new Date(),
    modifiedAt: new Date()
  };

  await db
    .collection(COLLECTION)
    .doc(attendanceId)
    .set(attendance);

  return attendance;

};

export const getAttendanceByEmployeeAndShiftDate = async (empId, shiftDate) => {

  const snapshot = await db
    .collection(COLLECTION)
    .where("empId", "==", empId)
    .where("shiftDate", "==", shiftDate)
    .get();

  if (snapshot.empty) return null;

  return snapshot.docs[0].data();
};


export const updateAttendance = async (attendanceId, data) => {

  await db
    .collection(COLLECTION)
    .doc(attendanceId)
    .update({
      ...data,
      modifiedAt: new Date()
    });
};

export const createAttendanceIfNotExists = async (attendanceId, data) => {

  const ref = db.collection("attendance").doc(attendanceId);

  await db.runTransaction(async (tx) => {

    const doc = await tx.get(ref);

    if (doc.exists) {
      throw new Error("Attendance already exists");
    }

    tx.set(ref, {
      attendanceId,
      ...data,
      createdAt: new Date(),
      modifiedAt: new Date()
    });

  });

};