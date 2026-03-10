import express from "express";
import * as controller from "./testimonial.controller.js";

const router = express.Router();

router.post("/create", controller.createTestimonial);
router.get("/list", controller.listTestimonials);
router.put("/update/:testimonialId", controller.updateTestimonial);
router.delete("/delete/:testimonialId", controller.deleteTestimonial);

export default router;