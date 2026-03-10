import { db } from "../../config/firebase.js";
import { generateId } from "../../utils/idGenerator.js";

const COLLECTION = "whyus";

export const createWhyUs = async (data) => {

  const whyusId = await generateId("whyus", "WHY");

  const whyus = {
    whyusId,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.collection(COLLECTION).doc(whyusId).set(whyus);

  return whyus;
};

export const getWhyUs = async () => {

  const snapshot = await db.collection(COLLECTION).get();

  return snapshot.docs.map(doc => doc.data());

};

export const getWhyUsByDisplayOrder = async (displayOrder) => {

  const snapshot = await db
    .collection(COLLECTION)
    .where("displayOrder", "==", displayOrder)
    .get();

  if (snapshot.empty) return null;

  return snapshot.docs[0].data();

};

export const updateWhyUs = async (whyusId, data) => {

  await db
    .collection(COLLECTION)
    .doc(whyusId)
    .update({
      ...data,
      updatedAt: new Date()
    });

};

export const deleteWhyUs = async (whyusId) => {

  await db.collection(COLLECTION).doc(whyusId).delete();

};