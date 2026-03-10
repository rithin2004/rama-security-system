import * as service from "./analytics.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";

export const getSystemStats = asyncHandler(async (req, res) => {

  const stats = await service.getSystemStats();

  res.json(success(stats));

});