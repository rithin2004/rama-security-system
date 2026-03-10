import express from "express";
import * as controller from "./whyus.controller.js";

const router = express.Router();

router.post("/create", controller.createWhyUs);
router.get("/list", controller.listWhyUs);
router.put("/update/:whyusId", controller.updateWhyUs);
router.delete("/delete/:whyusId", controller.deleteWhyUs);

export default router;