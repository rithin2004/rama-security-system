import express from "express";
import * as controller from "./announcement.controller.js";

const router = express.Router();

router.post("/create", controller.createAnnouncement);
router.get("/list", controller.listAnnouncements);

export default router;