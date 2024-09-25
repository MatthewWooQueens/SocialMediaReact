import express from "express";
const router = express.Router();

import {getThreads, getOneThread, createThread, getComment, postComment, getReplies, postReply} from "../controllers/threadController.js";

router.get("/", getThreads);
router.post("/", createThread);
router.get("/:id", getOneThread);
router.post("/comments",postComment);
router.get("/:threadid/comments/:commentid",getComment);
router.post("/comments/reply", postReply);
router.get("/comments/:commentid/reply/:replyid", getReplies);

export default router;

//module.exports = "class name here";  commonjs
//export default "class name here"; ES
