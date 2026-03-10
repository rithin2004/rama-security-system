import * as uploadService from "./upload.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";

export const uploadProfilePhoto = asyncHandler(async (req, res) => {

  const result = await uploadService.uploadProfilePhoto(req);

  res.json(success(result));

});

export const uploadAadhaar = asyncHandler(async (req, res) => {

  const result = await uploadService.uploadAadhaar(req);

  res.json(success(result));

});

export const uploadTestimonialImage = asyncHandler(async (req, res) => {

  const result = await uploadService.uploadTestimonialImage(req);

  res.json(success(result));

});

export const uploadCompanyLogo = asyncHandler(async (req, res) => {

  const result = await uploadService.uploadCompanyLogo(req);

  res.json(success(result));

});