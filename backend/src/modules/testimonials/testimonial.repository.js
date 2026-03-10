import { db } from "../../config/firebase.js";
import { generateId } from "../../utils/idGenerator.js";

const COLLECTION = "testimonials";

export const createTestimonial = async (data) => {

  const testimonialId = await generateId("testimonials", "TST");

  const testimonial = {
    testimonialId,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.collection(COLLECTION).doc(testimonialId).set(testimonial);

  return testimonial;
};

export const getTestimonials = async () => {

  const snapshot = await db.collection(COLLECTION).get();

  return snapshot.docs.map(doc => doc.data());

};

export const getTestimonialByDisplayOrder = async (displayOrder) => {

  const snapshot = await db
    .collection(COLLECTION)
    .where("displayOrder", "==", displayOrder)
    .get();

  if (snapshot.empty) return null;

  return snapshot.docs[0].data();

};

export const updateTestimonial = async (testimonialId, data) => {

  await db
    .collection(COLLECTION)
    .doc(testimonialId)
    .update({
      ...data,
      updatedAt: new Date()
    });

};

export const deleteTestimonial = async (testimonialId) => {

  await db.collection(COLLECTION).doc(testimonialId).delete();

};