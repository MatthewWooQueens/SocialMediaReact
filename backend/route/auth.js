import express from "express";
const router = express.Router();

import { signup, login, logout, refreshTokens } from "../controllers/authController.js";
import { protectRoute } from "../middleware/routeProtecter.js";
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshTokens);
router.post("/authorize", protectRoute);


export default router;
