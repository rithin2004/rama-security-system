import * as testimonialService from "./testimonial.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";

export const createTestimonial = asyncHandler(async (req, res) => {

  const testimonial = await testimonialService.createTestimonial(req.body);

  res.status(201).json(success(testimonial));

});

export const listTestimonials = asyncHandler(async (req, res) => {

  const testimonials = await testimonialService.listTestimonials();

  res.json(success(testimonials));

});

export const updateTestimonial = asyncHandler(async (req, res) => {

  const { testimonialId } = req.params;

  await testimonialService.updateTestimonial(testimonialId, req.body);

  res.json(success(null, "Testimonial updated"));

});

export const deleteTestimonial = asyncHandler(async (req, res) => {

  const { testimonialId } = req.params;

  await testimonialService.deleteTestimonial(testimonialId);

  res.json(success(null, "Testimonial deleted"));

});