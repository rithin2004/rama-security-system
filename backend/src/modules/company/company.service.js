import * as repo from "./company.repository.js";
import { logActivity } from "../../utils/activityLogger.js";

export const createCompany = async (data) => {

  const existing = await repo.getCompany();

  if (existing)
    throw new Error("Company profile already exists");

  const companyData = {
    companyName: data.companyName,
    email: data.email,
    phone: data.phone,
    alternatePhone: data.alternatePhone || null,
    address: data.address,
    website: data.website || null,
    about: data.about || null,
    mission: data.mission || null,
    vision: data.vision || null,
    logoURL: data.logoURL || null,
    createdBy: data.createdBy
  };

  const company = await repo.createCompany(companyData);

  await logActivity({
    type: "success",
    action: "company_created",
    title: "Company profile created",
    detail: company.companyName,
    actorId: data.createdBy
  });

  return company;
};

export const getCompany = async () => {

  return repo.getCompany();

};

export const updateCompany = async (data) => {

  const company = await repo.getCompany();

  if (!company)
    throw new Error("Company profile not found");

  await repo.updateCompany(company.companyId, data);

};