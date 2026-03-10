import { db } from "../config/firebase.js";

export const generateId = async (counterName, prefix) => {

  const counterRef = db.collection("counters").doc(counterName);

  const newId = await db.runTransaction(async (transaction) => {

    const counterDoc = await transaction.get(counterRef);

    if (!counterDoc.exists) {
      throw new Error(`Counter ${counterName} does not exist`);
    }

    const current = counterDoc.data().current || 0;
    const next = current + 1;

    transaction.update(counterRef, { current: next });

    const padded = String(next).padStart(5, "0");

    return `${prefix}${padded}`;
  });

  return newId;
};