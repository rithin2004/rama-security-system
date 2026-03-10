import { db } from "../../config/firebase.js";
import { generateId } from "../../utils/idGenerator.js";

const COLLECTION = "assignments";

export const createAssignment = async (data) => {

  const assignmentId = await generateId("assignments", "ASS");

  const assignment = {
    assignmentId,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.collection(COLLECTION).doc(assignmentId).set(assignment);

  return assignment;
};

export const getAssignments = async () => {
  const snapshot = await db.collection(COLLECTION).get();
  return snapshot.docs.map(doc => doc.data());
};

export const getAssignmentByEmployee = async (empId) => {

  const snapshot = await db
    .collection(COLLECTION)
    .where("empId", "==", empId)
    .get();

  if (snapshot.empty) return null;

  return snapshot.docs[0].data();
};