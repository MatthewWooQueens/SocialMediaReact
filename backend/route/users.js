import express from "express";
const router = express.Router();

import { getUsers, postUsers } from "../controllers/userController.js";

router.get("/", getUsers);

router.post("/", postUsers);

export default router;
