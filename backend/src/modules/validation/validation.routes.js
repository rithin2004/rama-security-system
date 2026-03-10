import express from "express";
import * as validationController from "./validation.controller.js";
import { authenticate } from "../../middleware/authMiddleware.js";
import { requireRole } from "../../middleware/roleMiddleware.js";

const router = express.Router();

/* Managers must be logged in */
router.use(authenticate);

router.post(
  "/manager-visit",
  requireRole(["manager"]),
  validationController.managerVisit
);

export default router;