import * as whyusService from "./whyus.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";

export const createWhyUs = asyncHandler(async (req, res) => {

  const whyus = await whyusService.createWhyUs(req.body);

  res.status(201).json(success(whyus));

});

export const listWhyUs = asyncHandler(async (req, res) => {

  const items = await whyusService.listWhyUs();

  res.json(success(items));

});

export const updateWhyUs = asyncHandler(async (req, res) => {

  const { whyusId } = req.params;

  await whyusService.updateWhyUs(whyusId, req.body);

  res.json(success(null, "WhyUs updated"));

});

export const deleteWhyUs = asyncHandler(async (req, res) => {

  const { whyusId } = req.params;

  await whyusService.deleteWhyUs(whyusId);

  res.json(success(null, "WhyUs deleted"));

});