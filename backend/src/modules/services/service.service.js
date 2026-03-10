import * as repo from "./service.repository.js";
import { logActivity } from "../../utils/activityLogger.js";

export const createService = async (data) => {

  const services = await repo.getServices();

  if (services.length >= 6)
    throw new Error("Maximum 6 services allowed");

  const service = await repo.createService(data);

  await logActivity({
    type: "success",
    action: "service_created",
    title: "Service created",
    detail: service.title,
    actorId: data.createdBy
  });

  return service;

};

export const listServices = async () => {
  return repo.getServices();
};

export const updateService = async (serviceId, data) => {

  await repo.updateService(serviceId, data);

};

export const deleteService = async (serviceId) => {

  await repo.deleteService(serviceId);

};