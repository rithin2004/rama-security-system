import express from "express";
import multer from "multer";
import * as uploadController from "./upload.controller.js";
import { authenticate } from "../../middleware/authMiddleware.js";

const router = express.Router();

/* Memory storage */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

/* All upload APIs require login */
router.use(authenticate);

router.post(
  "/profile-photo",
  upload.single("file"),
  uploadController.uploadProfilePhoto
);

router.post(
  "/aadhaar",
  upload.single("file"),
  uploadController.uploadAadhaar
);

router.post(
  "/testimonial-image",
  upload.single("file"),
  uploadController.uploadTestimonialImage
);

router.post(
  "/company-logo",
  upload.single("file"),
  uploadController.uploadCompanyLogo
);

export default router;