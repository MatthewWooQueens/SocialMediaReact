import express from "express";
const router = express.Router();

import {getThreads, getOneThread, createThread, getComment, getOneComment, postComment, getReplies, postReply, threadlike, threadremovelike} from "../controllers/threadController.js";

router.get("/", getThreads);
router.post("/", createThread);
router.get("/:id", getOneThread);
router.post("/comments",postComment);
router.get("/:threadid/comments",getComment);
router.get("/:threadid/:commentid", getOneComment);
router.post("/comments/reply", postReply);
router.get("/comments/:commentid/reply/:replyid", getReplies);
router.post("/like/like", threadlike);
router.post("/like/remove", threadremovelike);

export default router;

//module.exports = "class name here";  commonjs
//export default "class name here"; ES
