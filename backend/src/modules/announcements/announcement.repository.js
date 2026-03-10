import { db } from "../../config/firebase.js";
import { generateId } from "../../utils/idGenerator.js";

const COLLECTION = "announcements";

export const createAnnouncement = async (data) => {

  const announcementId = await generateId("announcements", "ANN");

  const announcement = {
    announcementId,
    ...data,
    createdAt: new Date(),
    modifiedAt: new Date()
  };

  await db.collection(COLLECTION).doc(announcementId).set(announcement);

  return announcement;
};

export const getAnnouncements = async (limit = 10, lastDocId = null) => {

  let query = db.collection(COLLECTION)
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