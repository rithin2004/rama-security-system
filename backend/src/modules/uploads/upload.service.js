import {
  validateImageFile,
  validateAadhaarFile
} from "../../utils/validators/fileValidator.js";

/* Profile Photo Upload */
export const uploadProfilePhoto = async (req) => {

  if (!req.file)
    throw new Error("File required");

  validateImageFile(req.file);

  const fileName = `profile/${Date.now()}_${req.file.originalname}`;

  const url = `https://placeholder-storage/${fileName}`;

  return { url };

};


/* Aadhaar Upload */
export const uploadAadhaar = async (req) => {

  if (!req.file)
    throw new Error("File required");

  validateAadhaarFile(req.file);

  const fileName = `aadhaar/${Date.now()}_${req.file.originalname}`;

  const url = `https://placeholder-storage/${fileName}`;

  return { url };

};


/* Testimonial Image Upload */
export const uploadTestimonialImage = async (req) => {

  if (!req.file)
    throw new Error("File required");

  validateImageFile(req.file);

  const fileName = `testimonials/${Date.now()}_${req.file.originalname}`;

  const url = `https://placeholder-storage/${fileName}`;

  return { url };

};


/* Company Logo Upload */
export const uploadCompanyLogo = async (req) => {

  if (!req.file)
    throw new Error("File required");

  validateImageFile(req.file);

  const fileName = `company/${Date.now()}_${req.file.originalname}`;

  const url = `https://placeholder-storage/${fileName}`;

  return { url };

};