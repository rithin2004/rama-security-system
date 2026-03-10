import express from "express";
import * as controller from "./company.controller.js";

const router = express.Router();

router.post("/create", controller.createCompany);
router.get("/", controller.getCompany);
router.put("/update", controller.updateCompany);

export default router;