import asyncHandler from 'express-async-handler';
import db from "../db/connection.js";
import MUUID from 'uuid-mongodb';

export const getReplies = async (req, res) => {
    const { commentId } = req.params;
    try {
        const uuid = MUUID.from(commentId)
        const com = db.collection("comments");
        const result = await com.findOne({ _id: uuid});
        console.log("Grabbing all replies");
        res.status(200).send(result);
    } catch (error){
        res.status(500).send("Error retrieving replies")
    }
};

export const postReply = async (req, res) => {
    const body = req.body;
    try{
        const com = db.collection("comments");
        const uuid = MUUID.v4();
        await com.updateOne({_id:MUUID.from(MUUID.from(body.commentId))}, 
            { $push: {replies: {
                _id: uuid, 
                userId: MUUID.from(body.userId),
                commentText: body.text,
                timeOfCmnt: new Date(Date.now())}}
            }
        )
        console.log("Test");
        res.status(200).send("Reply added");
    } catch (error){
        console.error(error.message);
        res.status(500).send("Error adding reply")
    }
};

export const postComment = async(req, res) => {
    const body = req.body;
    try {
        const com = db.collection("comments");
        const th = db.collection("threads");
        const thread = await th.findOne({_id:MUUID.from(body.threadId)});
        if (!thread){
            res.status(400).send("thread does not exist");
        }
        const uuid = MUUID.v4();
        await com.insertOne({
            _id: uuid,
            userId: MUUID.from(body.userId),
            threadId:MUUID.from(body.threadId),
            commentText: body.commentText,
            timeOfCmnt: new Date(Date.now()),
            replies: [],
            likes: 0
            }
        );
        res.status(200).send("Added comment");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error adding comment");
    }
}

export const getOneComment = async(req, res) => {
    const {threadid, commentid} = req.params;
    try {
        const com = db.collection("comments");
        const result = await com.findOne({_id:MUUID.from(commentid), threadId:MUUID.from(threadid)});
        console.log("retrieving comment");
        res.status(200).send(result);
    } catch (error){
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const getComment = async(req, res) => {
    const { threadid } = req.params;
    try {
        const com = db.collection("comments");
        const uuid = MUUID.from(threadid);
        const result = await com.find({ threadId: uuid }).toArray();
        console.log("retrieving comments");
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send("Error getting comments");
    }
}

export const getOneThread = async (req, res) => {
    const {id} = req.params;
    console.log(id)
    try {
        const uuid = MUUID.from(id);
        const com = db.collection("threads");
        const result = await com.findOne({_id:uuid});
        console.log('retrieving thread');
        res.status(200).send(result);
    } catch (error){
        console.error(error);
        res.status(500).send("Error retrieving thread");
    }
}

export const getThreads = async (req, res) => {
    try {
        const com = db.collection("threads");
        const result = await com.find().toArray();
        
        const users = db.collection("users");
        for(let x=0;x<result.length;x++){
            const user = await users.findOne({_id:result[x].userId},{_id:0,username:1});
            console.log(user);
            result[x]["username"] = user.username;
            result[x]._id = result[x]["_id"].toString();
            result[x].userId = result[x]["userId"].toString();
        }

        console.log("retrieving all threads");
        console.log(result)
        res.status(200).send(result)
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving thread");
    }
}

export const createThread = async (req, res) => {
    const body = req.body;
    try {
        const com = db.collection("threads");
        const uuid = MUUID.v4();
        com.insertOne({_id: uuid, 
            userId: MUUID.from(body.userId),
            textBody: body.text,
            timeOfThread: new Date(Date.now()),
            likes: 0,
            title: body.title});
        res.status(200).send("Creating thread")
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating thread")
    }
}

