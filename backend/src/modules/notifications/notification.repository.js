import { db } from "../../config/firebase.js";
import { generateId } from "../../utils/idGenerator.js";

const COLLECTION = "notifications";

export const createNotification = async (data) => {

  const notificationId = await generateId("notifications", "NOT");

  const notification = {
    notificationId,
    ...data,
    read: false,
    createdAt: new Date()
  };

  await db.collection(COLLECTION).doc(notificationId).set(notification);

  return notification;
};

export const getNotificationsByEmployee = async (empId, limit = 10, lastDocId = null) => {

  let query = db
    .collection(COLLECTION)
    .where("targetEmployeeId", "==", empId)
    .orderBy("createdAt", "desc")
    .limit(Number(limit));

  if (lastDocId) {

    const lastDoc = await db.collection(COLLECTION).doc(lastDocId).get();

    if (lastDoc.exists) {
      query = query.startAfter(lastDoc);
    }

  }

  const snapshot = await query.get();

  return snapshot.docs.map(doc => doc.data());

};

export const markNotificationRead = async (notificationId) => {

  await db
    .collection(COLLECTION)
    .doc(notificationId)
    .update({
      read: true
    });
};