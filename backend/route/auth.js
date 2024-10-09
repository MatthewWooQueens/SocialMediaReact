import express from "express";
const router = express.Router();

import { signup, login, logout, refreshTokens, profile } from "../controllers/authController.js";
import { protectRoute } from "../middleware/routeProtecter.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refreshTokens);
router.get("/profile", protectRoute, profile);


export default router;
