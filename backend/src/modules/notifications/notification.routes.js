import express from "express";
import * as controller from "./notification.controller.js";

const router = express.Router();

router.post("/send", controller.sendNotification);
router.get("/:empId", controller.getEmployeeNotifications);
router.patch("/read/:notificationId", controller.markRead);

export default router;