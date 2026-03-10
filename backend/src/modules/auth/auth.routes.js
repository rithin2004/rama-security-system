import express from "express";
import * as controller from "./auth.controller.js";

const router = express.Router();

router.post("/login", controller.loginResolve);

export default router;