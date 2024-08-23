import express from "express";
const router = express.Router();

import { getAuth } from "../controllers/authController.js";

router.get("/", getAuth);

export default router
