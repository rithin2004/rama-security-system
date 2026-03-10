import * as repo from "./notification.repository.js";

export const sendNotification = async (data) => {

  const notificationData = {
    title: data.title,
    message: data.message,
    type: data.type || "info",
    targetEmployeeId: data.targetEmployeeId
  };

  return repo.createNotification(notificationData);
};

export const getEmployeeNotifications = async (empId) => {
  return repo.getNotificationsByEmployee(empId);
};

export const markRead = async (notificationId) => {
  return repo.markNotificationRead(notificationId);
};