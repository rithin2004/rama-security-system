import express from "express";
import * as controller from "./icon.controller.js";

const router = express.Router();

router.post("/create", controller.createIcon);
router.get("/list", controller.listIcons);
router.put("/update/:iconId", controller.updateIcon);
router.delete("/delete/:iconId", controller.deleteIcon);

export default router;