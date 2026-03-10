import * as locationService from "./location.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";

export const createLocation = asyncHandler(async (req, res) => {

  const location = await locationService.createLocation(req.body);

  res.status(201).json(success(location));

});

export const listLocations = asyncHandler(async (req, res) => {

  const locations = await locationService.listLocations();

  res.json(success(locations));

});