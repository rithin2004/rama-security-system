import * as validationService from "./validation.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";

export const managerVisit = asyncHandler(async (req, res) => {

  const result = await validationService.managerVisit(req.body);

  res.json(success(result));

});