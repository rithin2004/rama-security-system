export const calculateWorkedHours = (punchIn, punchOut) => {

  let totalMinutes = 0;

  for (let i = 0; i < punchIn.length; i++) {

    if (!punchOut[i]) continue;

    const start = new Date(punchIn[i]);
    const end = new Date(punchOut[i]);

    if (end <= start) {
      throw new Error("Invalid punch order");
    }

    const diff = (end - start) / 60000;

    totalMinutes += diff;
  }

  return totalMinutes / 60;
};


export const calculateAttendanceStatus = (workedHours, assignedHours) => {

  const grace = 1;

  if (workedHours === 0)
    return "absent";

  if (workedHours < (assignedHours / 2 - grace))
    return "absent";

  if (workedHours < (assignedHours - grace))
    return "half_day";

  return "full_day";
};