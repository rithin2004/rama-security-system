import * as service from "./announcement.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";

export const createAnnouncement = asyncHandler(async (req, res) => {

  const announcement = await service.createAnnouncement(req.body);

  res.status(201).json(success(announcement));

});

export const listAnnouncements = asyncHandler(async (req, res) => {

  const announcements = await service.listAnnouncements();

  res.json(success(announcements));

});