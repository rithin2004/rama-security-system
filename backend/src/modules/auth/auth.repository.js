import { db } from "../../config/firebase.js";

export const findEmployeeByIdentifier = async (identifier) => {

  let snapshot = await db
    .collection("employees")
    .where("employeeId","==",identifier)
    .get();

  if (!snapshot.empty) return snapshot.docs[0].data();

  snapshot = await db
    .collection("employees")
    .where("phone","==",identifier)
    .get();

  if (!snapshot.empty) return snapshot.docs[0].data();

  snapshot = await db
    .collection("employees")
    .where("email","==",identifier)
    .get();

  if (!snapshot.empty) return snapshot.docs[0].data();

  return null;

};