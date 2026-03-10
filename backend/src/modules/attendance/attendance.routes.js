import express from "express";
import * as attendanceController from "./attendance.controller.js";
import { authenticate } from "../../middleware/authMiddleware.js";
import { requireRole } from "../../middleware/roleMiddleware.js";

const router = express.Router();

/* Guards must be logged in */
router.use(authenticate);

router.post(
  "/punch-in",
  requireRole(["security_guard"]),
  attendanceController.punchIn
);

router.post(
  "/punch-out",
  requireRole(["security_guard"]),
  attendanceController.punchOut
);

export default router;