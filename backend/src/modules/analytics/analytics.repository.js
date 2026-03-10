import { db } from "../../config/firebase.js";

export const getAttendanceCount = async () => {

  const snapshot = await db.collection("attendance").count().get();

  return snapshot.data().count;
};


export const getActivityLogsCount = async () => {

  const snapshot = await db.collection("activityLogs").count().get();

  return snapshot.data().count;
};


export const getEmployeesCount = async () => {

  const snapshot = await db.collection("employees").count().get();

  return snapshot.data().count;
};