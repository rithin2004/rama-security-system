import * as repo from "./announcement.repository.js";
import { logActivity } from "../../utils/activityLogger.js";
import { getEmployees } from "../employees/employee.repository.js";
import { createNotification } from "../notifications/notification.repository.js";

export const createAnnouncement = async (data) => {

  const announcementData = {
    title: data.title,
    message: data.message,
    type: data.type || "info",
    targetRoles: data.targetRoles || ["all"],
    createdBy: data.createdBy
  };

  const announcement = await repo.createAnnouncement(announcementData);

  // Activity log
  await logActivity({
    type: "success",
    action: "announcement_created",
    title: "Announcement Created",
    detail: announcement.title,
    actorId: data.createdBy
  });

  const employees = await getEmployees();

  const notifications = [];

  for (const emp of employees) {

    if (announcement.targetRoles.includes("all")) {

      notifications.push(
        createNotification({
          title: "New Announcement",
          message: announcement.title,
          type: "info",
          targetEmployeeId: emp.employeeId
        })
      );

      continue;
    }

    if (announcement.targetRoles.includes(emp.role)) {

      notifications.push(
        createNotification({
          title: "New Announcement",
          message: announcement.title,
          type: "info",
          targetEmployeeId: emp.employeeId
        })
      );

    }
  }

  await Promise.all(notifications);

  return announcement;
  
};

export const listAnnouncements = async () => {
  return repo.getAnnouncements();
};