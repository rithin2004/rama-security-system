import * as companyService from "./company.service.js";

export const createCompany = async (req, res) => {

  try {

    const company = await companyService.createCompany(req.body);

    res.status(201).json(company);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

export const getCompany = async (req, res) => {

  try {

    const company = await companyService.getCompany();

    res.json(company);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

export const updateCompany = async (req, res) => {

  try {

    await companyService.updateCompany(req.body);

    res.json({ message: "Company profile updated successfully" });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};