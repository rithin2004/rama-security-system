import express from "express";
import * as assignmentController from "./assignment.controller.js";

const router = express.Router();

router.post("/create", assignmentController.createAssignment);
router.get("/list", assignmentController.listAssignments);
router.post("/assign-guard-location", assignmentController.assignGuardLocation);

export default router;