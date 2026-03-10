import express from "express";
import * as templateController from "./faceTemplate.controller.js";

const router = express.Router();

router.post("/register", templateController.registerFace);
router.get("/:employeeId", templateController.getTemplate);
router.post("/verify", templateController.verifyFace);

export default router;