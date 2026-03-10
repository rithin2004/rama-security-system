import * as attendanceService from "./attendance.service.js";

export const punchIn = async (req, res) => {

  try {

    const attendance = await attendanceService.punchIn(req.body);

    res.status(201).json(attendance);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
};


export const punchOut = async (req, res) => {

  try {

    const attendance = await attendanceService.punchOut(req.body);

    res.status(200).json(attendance);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
};