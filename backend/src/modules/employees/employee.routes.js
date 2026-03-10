import express from "express";
import * as employeeController from "./employee.controller.js";
import { authenticate } from "../../middleware/authMiddleware.js";
import { requireRole } from "../../middleware/roleMiddleware.js";

const router = express.Router();

/* All employee APIs require login */
router.use(authenticate);

router.post(
  "/create",
  requireRole(["superadmin","admin"]),
  employeeController.createEmployee
);

router.get(
  "/list",
  requireRole(["superadmin","admin","manager"]),
  employeeController.listEmployees
);

router.put(
  "/update/:employeeId",
  requireRole(["superadmin","admin"]),
  employeeController.updateEmployee
);

router.delete(
  "/delete/:employeeId",
  requireRole(["superadmin","admin"]),
  employeeController.deleteEmployee
);

router.put(
  "/reassign-manager",
  requireRole(["superadmin","admin"]),
  employeeController.reassignManager
);

export default router;