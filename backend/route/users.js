import express from "express";
const router = express.Router();

import { getUsers, oneUser, postUsers } from "../controllers/userController.js";

router.get("/", getUsers);

router.get("/:id", oneUser);

router.post("/", postUsers);

export default router;
