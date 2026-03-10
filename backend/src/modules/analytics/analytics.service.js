import * as repo from "./analytics.repository.js";

export const getSystemStats = async () => {

  const [
    totalEmployees,
    totalAttendance,
    totalLogs
  ] = await Promise.all([
    repo.getEmployeesCount(),
    repo.getAttendanceCount(),
    repo.getActivityLogsCount()
  ]);

  return {
    totalEmployees,
    totalAttendanceRecords: totalAttendance,
    totalActivityLogs: totalLogs
  };

};