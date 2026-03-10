import * as serviceService from "./service.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";

export const createService = asyncHandler(async (req, res) => {

  const service = await serviceService.createService(req.body);

  res.status(201).json(success(service));

});

export const listServices = asyncHandler(async (req, res) => {

  const services = await serviceService.listServices();

  res.json(success(services));

});

export const updateService = asyncHandler(async (req, res) => {

  const { serviceId } = req.params;

  await serviceService.updateService(serviceId, req.body);

  res.json(success(null, "Service updated successfully"));

});

export const deleteService = asyncHandler(async (req, res) => {

  const { serviceId } = req.params;

  await serviceService.deleteService(serviceId);

  res.json(success(null, "Service deleted successfully"));

});