import { db } from "../config/firebase.js";
import { generateId } from "./idGenerator.js";

export const logActivity = async ({
  type = "info",
  action,
  title,
  detail,
  actorId = null,
  taggedId = null
}) => {

  const logId = await generateId("activityLogs", "ACT");

  const log = {
    logId,
    type,
    action,
    title,
    detail,
    actorId,
    taggedId,
    timestamp: new Date()
  };

  await db.collection("activityLogs").doc(logId).set(log);

  return log;
};