import asyncHandler from 'express-async-handler';
import db from "../db/connection.js";
import MUUID from 'uuid-mongodb';

export const getReplies = async (req, res) => {
    const { commentId } = req.body
    try {
        const uuid = MUUID.from(commentId)
        const com = db.collection("comments");
        const result = com.find({ "_id": uuid});
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
        com.updateOne({_id:body.commentId}, 
            { $push: {
                _id: uuid, 
                userId: body.userId,
                commentId: body.commentId,
                commentText: body.text,
                timeOfCmnt: Date.UTC()}
            }
        )
        console.log("Test");
    } catch (error){
        res.status(500).send("Error adding reply")
    }
};

export const postComment = async(req, res) => {
    const body = req.body;
    try {
        const com = db.collection("comments");
        const uuid = MUUID.v4();
        com.insertOne({
            _id: uuid,
            userId: body.userId,
            threadId: body.threadId,
            commentText: body.commentText,
            timeOfCmnt: Date.UTC(),
            replies: [],
            likes: 0
            }
        )
    } catch (error) {
        res.status(500).send("Error adding comment")
    }
}

export const getComment = async(req, res) => {
    const { threadId } = req.body;
    try {
        const com = db.collection("comments");
        const result = com.find({ "threadId": threadId });
        console.log("retrieving comments")
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send("Error getting comments");
    }
}

export const getOneThread = async (req, res) => {
    const {threadId} = req.body
    try {
        const uuid = MUUID.from(threadId)
        const com = db.collection("threads");
        const result = com.find({"_id":uuid});
        console.log('retrieving thread');
        res.status(200).send(result)
    } catch (error){
        console.error(error);
        res.status(500).send("Error retrieving thread");
    }
}

export const getThreads = async (req, res) => {
    try {
        const com = db.collection("threads");
        const result = com.find().toArray();
        console.log("retrieving all threads");
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
            userId: body.userId,
            textBody: body.text,
            timeOfThread: Date.UTC(),
            likes: 0});
        res.status(200).send("Creating thread")
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating thread")
    }
}

