import * as iconService from "./icon.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";

export const createIcon = asyncHandler(async (req, res) => {

  const icon = await iconService.createIcon(req.body);

  res.status(201).json(success(icon, "Icon created"));

});

export const listIcons = asyncHandler(async (req, res) => {

  const icons = await iconService.listIcons();

  res.json(success(icons));

});

export const updateIcon = asyncHandler(async (req, res) => {

  const { iconId } = req.params;

  await iconService.updateIcon(iconId, req.body);

  res.json(success(null, "Icon updated"));

});

export const deleteIcon = asyncHandler(async (req, res) => {

  const { iconId } = req.params;

  await iconService.deleteIcon(iconId);

  res.json(success(null, "Icon deleted"));

});