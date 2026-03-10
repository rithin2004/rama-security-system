import { db } from "../../config/firebase.js";
import { generateId } from "../../utils/idGenerator.js";

const COLLECTION = "locations";

export const createLocation = async (locationData) => {

  const locationId = await generateId("locations", "LOC");

  const location = {
    locationId,
    ...locationData,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.collection(COLLECTION).doc(locationId).set(location);

  return location;
};

export const getLocations = async (limit = 10, lastDocId = null) => {

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

export const getLocationById = async (locationId) => {

  const doc = await db.collection(COLLECTION).doc(locationId).get();

  if (!doc.exists) return null;

  return doc.data();
};