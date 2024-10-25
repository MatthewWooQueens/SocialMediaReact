import asyncHandler from 'express-async-handler';
import db from "../db/connection.js";
import MUUID from 'uuid-mongodb';
//MUUID is a commonjs module meaning it can only be imported
//through the defaut export (ie. everything has to be imported)
const users = db.collection("users");

export const getUsers = async (req, res) => {
    try {
        const result = await users.find().toArray();
        res.status(200).send(result);
    } catch (error) {
        console.error(error)
        res.status(500).send("Error retrieving users");
    }
};

export const oneUser = async (req, res) => {
    const id = MUUID.from(req.params.id)
    const threads = db.collection("threads")
    const com = db.collection("comments")
    try {
        let result = await users.findOne({_id: id},{password:0});
        const threadCount = await threads.aggregate([{$match:{userId:id}},{$count:"number_threads"}]).toArray()
        const commentCount = await com.aggregate([{$match:{userId:id}},{$count:"number_comments"}]).toArray()
        const replyCount = await com.aggregate([{$unwind:"$replies"},{$match:{"replies.userId":id}},{$count:"number_replies"}]).toArray()
        console.log(commentCount)
        console.log(threadCount)
        console.log(replyCount)
        result.thread_count = threadCount[0].number_threads
        result.comment_count = commentCount[0].number_comments + replyCount[0].number_replies
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send("Error retrieving user");
    }
};

