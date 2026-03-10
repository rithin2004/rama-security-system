import { asyncHandler } from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import * as service from "./auth.service.js";

export const loginResolve = asyncHandler(async(req,res)=>{

  const { identifier } = req.body;

  const result = await service.resolveLogin(identifier);

  res.json(success(result));

});