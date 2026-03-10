import * as templateService from "./faceTemplate.service.js";

export const registerFace = async (req, res) => {

  try {

    const template = await templateService.registerFace(req.body);

    res.status(201).json(template);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
};


export const getTemplate = async (req, res) => {

  try {

    const template = await templateService.getEmployeeTemplate(req.params.employeeId);

    res.json(template);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
};

export const verifyFace = async (req, res) => {

  try {

    const result = await templateService.verifyEmployeeFace(req.body);

    res.json(result);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
};