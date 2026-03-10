import * as repo from "./whyus.repository.js";
import { logActivity } from "../../utils/activityLogger.js";

export const createWhyUs = async (data) => {

  const items = await repo.getWhyUs();

  if (items.length >= 8)
    throw new Error("Maximum 8 WhyUs items allowed");

  const existingOrder = await repo.getWhyUsByDisplayOrder(data.displayOrder);

  if (existingOrder)
    throw new Error("displayOrder already exists");

  const whyusData = {
    title: data.title,
    description: data.description,
    iconId: data.iconId,
    displayOrder: data.displayOrder,
    createdBy: data.createdBy
  };

  const whyus = await repo.createWhyUs(whyusData);

  await logActivity({
    type: "success",
    action: "whyus_created",
    title: "WhyUs item created",
    detail: whyus.title,
    actorId: data.createdBy
  });

  return whyus;
};

export const listWhyUs = async () => {
  return repo.getWhyUs();
};

export const updateWhyUs = async (whyusId, data) => {

  if (data.displayOrder !== undefined) {

    const existingOrder = await repo.getWhyUsByDisplayOrder(data.displayOrder);

    if (existingOrder && existingOrder.whyusId !== whyusId)
      throw new Error("displayOrder already exists");

  }

  await repo.updateWhyUs(whyusId, data);

};

export const deleteWhyUs = async (whyusId) => {

  await repo.deleteWhyUs(whyusId);

};