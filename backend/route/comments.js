import express from "express";
const router = express.Router();

import {getReplies, postComment} from "../controllers/commentController.js";

router.get("/", getReplies);

router.post("/", postComment);

export default router;

//module.exports = "class name here";  commonjs
//export default "class name here"; ES
