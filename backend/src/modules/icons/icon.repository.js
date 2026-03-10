import { db } from "../../config/firebase.js";
import { generateId } from "../../utils/idGenerator.js";

const COLLECTION = "icons";

export const createIcon = async (data) => {

  const iconId = await generateId("icons", "ICO");

  const icon = {
    iconId,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.collection(COLLECTION).doc(iconId).set(icon);

  return icon;

};

export const getIcons = async (limit = 10, lastDocId = null) => {

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

export const updateIcon = async (iconId, data) => {

  await db
    .collection(COLLECTION)
    .doc(iconId)
    .update({
      ...data,
      updatedAt: new Date()
    });

};

export const deleteIcon = async (iconId) => {

  await db.collection(COLLECTION).doc(iconId).delete();

};