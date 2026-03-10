import express from "express";
import * as controller from "./service.controller.js";

const router = express.Router();

router.post("/create", controller.createService);
router.get("/list", controller.listServices);
router.put("/update/:serviceId", controller.updateService);
router.delete("/delete/:serviceId", controller.deleteService);

export default router;