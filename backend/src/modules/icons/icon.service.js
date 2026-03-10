import * as repo from "./icon.repository.js";
import { logActivity } from "../../utils/activityLogger.js";

export const createIcon = async (data) => {

  const icon = await repo.createIcon(data);

  await logActivity({
    type: "success",
    action: "icon_created",
    title: "Icon created",
    detail: icon.iconComponent,
    actorId: data.createdBy
  });

  return icon;

};

export const listIcons = async () => {
  return repo.getIcons();
};

export const updateIcon = async (iconId, data) => {

  await repo.updateIcon(iconId, data);

};

export const deleteIcon = async (iconId) => {

  await repo.deleteIcon(iconId);

};