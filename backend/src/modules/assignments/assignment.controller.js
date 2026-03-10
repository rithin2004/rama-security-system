import * as assignmentService from "./assignment.service.js";

export const createAssignment = async (req, res) => {
  try {
    const assignment = await assignmentService.createAssignment(req.body);
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listAssignments = async (req, res) => {
  try {
    const assignments = await assignmentService.listAssignments();
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const assignGuardLocation = async (req, res) => {

  try {

    const result = await assignmentService.assignGuardLocation(req.body);

    res.status(201).json(result);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};