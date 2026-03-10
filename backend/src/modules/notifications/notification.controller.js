import * as service from "./notification.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";

export const sendNotification = asyncHandler(async (req, res) => {

  const notification = await service.sendNotification(req.body);

  res.status(201).json(success(notification));

});

export const getEmployeeNotifications = asyncHandler(async (req, res) => {

  const notifications = await service.getEmployeeNotifications(req.params.empId);

  res.json(success(notifications));

});

export const markRead = asyncHandler(async (req, res) => {

  await service.markRead(req.params.notificationId);

  res.json(success(null, "Notification marked as read"));

});