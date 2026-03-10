import { db } from "../../config/firebase.js";
import { generateId } from "../../utils/idGenerator.js";

const COLLECTION = "company";

export const createCompany = async (data) => {

  const companyId = await generateId("company", "CMP");

  const company = {
    companyId,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.collection(COLLECTION).doc(companyId).set(company);

  return company;

};

export const getCompany = async () => {

  const snapshot = await db.collection(COLLECTION).limit(1).get();

  if (snapshot.empty) return null;

  return snapshot.docs[0].data();

};

export const updateCompany = async (companyId, data) => {

  await db
    .collection(COLLECTION)
    .doc(companyId)
    .update({
      ...data,
      updatedAt: new Date()
    });

};