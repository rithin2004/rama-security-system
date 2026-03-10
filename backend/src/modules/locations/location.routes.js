import express from "express";
import * as locationController from "./location.controller.js";

const router = express.Router();

router.post("/create", locationController.createLocation);
router.get("/list", locationController.listLocations);

export default router;