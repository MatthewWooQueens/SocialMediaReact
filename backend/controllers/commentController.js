import asyncHandler from 'express-async-handler';
import db from "../db/connection.js";
import MUUID from 'uuid-mongodb';

export const getReplies = async (req, res) => {
    const { commentId } = req.body
    try {
        const com = db.collection("comments");
        const result = com.find({ "_id": commentId});
        console.log("Grabbing all replies");
        res.status(200).send(result);
    } catch (error){
        res.status(500).send("Error retrieving replies")
    }
};

export const postReplies = async (req, res) => {
    const body = req.body;
    try{
        const com = db.collection("comments");
        const uuid = MUUID.v4();
        com.updateOne({_id:body.commentId}, 
            { $push: {
                _id: uuid, 
                userId: body.userId,
                replyId: body.commentId,
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
        const uuid = MUUID.v4;
        com.insertOne({
            _id: uuid,
            userId: body.userId,
            postId: body.postId,
            commentText: body.commentText,
            timeOfCmnt: Date.UTC(),
            replies: []
            }
        )
    } catch (error) {
        res.status(500).send("Error adding comment")
    }
}

export const getComment = async(req, res) => {
    const { postId } = req.body;
    try {
        const com = db.collection("comments");
        const result = com.find({ "postId": postId });
        console.log("retrieving comments")
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send("Error getting comments");
    }
}
