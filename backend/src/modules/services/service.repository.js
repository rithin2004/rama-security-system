import { db } from "../../config/firebase.js";
import { generateId } from "../../utils/idGenerator.js";

const COLLECTION = "services";

export const createService = async (data) => {

  const serviceId = await generateId("services", "SRV");

  const service = {
    serviceId,
    ...data
  };

  await db.collection(COLLECTION).doc(serviceId).set(service);

  return service;
};

export const getServices = async () => {

  const snapshot = await db.collection(COLLECTION).get();

  return snapshot.docs.map(doc => doc.data());

};

export const updateService = async (serviceId, data) => {

  await db.collection(COLLECTION).doc(serviceId).update(data);

};

export const deleteService = async (serviceId) => {

  await db.collection(COLLECTION).doc(serviceId).delete();

};