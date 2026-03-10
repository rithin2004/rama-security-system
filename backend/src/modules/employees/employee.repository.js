import { db } from "../../config/firebase.js";
import { generateId } from "../../utils/idGenerator.js";

const COLLECTION = "employees";

export const createEmployee = async (employeeData) => {

  const employeeId = await generateId("employees", "EMP");

  const employee = {
    employeeId,
    ...employeeData
  };

  await db.collection(COLLECTION).doc(employeeId).set(employee);

  return employee;
};

export const getEmployees = async (limit = 10, lastDocId = null) => {

  let query = db.collection(COLLECTION).limit(Number(limit));

  if (lastDocId) {

    const lastDoc = await db.collection(COLLECTION).doc(lastDocId).get();

    if (lastDoc.exists) {
      query = query.startAfter(lastDoc);
    }

  }

  const snapshot = await query.get();

  return snapshot.docs.map(doc => doc.data());

};

export const getEmployeeByPhone = async (phone) => {
  const snapshot = await db
    .collection(COLLECTION)
    .where("phone", "==", phone)
    .get();

  if (snapshot.empty) return null;

  return snapshot.docs[0].data();
};

export const getEmployeeByEmail = async (email) => {
  const snapshot = await db
    .collection(COLLECTION)
    .where("email", "==", email)
    .get();

  if (snapshot.empty) return null;

  return snapshot.docs[0].data();
};

export const getEmployeeByAadhaar = async (aadhaar) => {
  const snapshot = await db
    .collection(COLLECTION)
    .where("aadhaarNumber", "==", aadhaar)
    .get();

  if (snapshot.empty) return null;

  return snapshot.docs[0].data();
};

export const getEmployeeById = async (employeeId) => {

  const doc = await db.collection(COLLECTION).doc(employeeId).get();

  if (!doc.exists) return null;

  return doc.data();

};

export const updateEmployee = async (employeeId, data) => {

  await db
    .collection(COLLECTION)
    .doc(employeeId)
    .update(data);

};

export const deactivateEmployee = async (employeeId, data) => {

  await db
    .collection(COLLECTION)
    .doc(employeeId)
    .update(data);

};

export const getGuardsByManager = async (managerId) => {

  const snapshot = await db
    .collection(COLLECTION)
    .where("assignedManagerId", "==", managerId)
    .get();

  return snapshot.docs.map(doc => doc.data());

};