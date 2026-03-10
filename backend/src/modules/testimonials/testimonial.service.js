import * as repo from "./testimonial.repository.js";
import { logActivity } from "../../utils/activityLogger.js";

export const createTestimonial = async (data) => {

  const testimonials = await repo.getTestimonials();

  if (testimonials.length >= 6)
    throw new Error("Maximum 6 testimonials allowed");

  const existingOrder = await repo.getTestimonialByDisplayOrder(data.displayOrder);

  if (existingOrder)
    throw new Error("displayOrder already exists");

  const testimonialData = {
    name: data.name,
    designation: data.designation || null,
    company: data.company || null,
    message: data.message,
    rating: data.rating,
    iconId: data.iconId || null,
    imageURL: data.imageURL || null,
    displayOrder: data.displayOrder,
    createdBy: data.createdBy
  };

  const testimonial = await repo.createTestimonial(testimonialData);

  await logActivity({
    type: "success",
    action: "testimonial_created",
    title: "Testimonial created",
    detail: testimonial.name,
    actorId: data.createdBy
  });

  return testimonial;
};

export const listTestimonials = async () => {
  return repo.getTestimonials();
};

export const updateTestimonial = async (testimonialId, data) => {

  if (data.displayOrder !== undefined) {

    const existingOrder = await repo.getTestimonialByDisplayOrder(data.displayOrder);

    if (existingOrder && existingOrder.testimonialId !== testimonialId)
      throw new Error("displayOrder already exists");

  }

  await repo.updateTestimonial(testimonialId, data);

};

export const deleteTestimonial = async (testimonialId) => {

  await repo.deleteTestimonial(testimonialId);

};