import express from "express";
const router = express.Router();

import { getUsers, oneUser} from "../controllers/userController.js";

router.get("/", getUsers);

router.get("/:id", oneUser);

export default router;
