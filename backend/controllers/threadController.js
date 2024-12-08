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
                timeOfCmnt: new Date(Date.now()),
                likes:[],
                dislikes:[]}}
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
            likes: [],
            dislikes: []
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
        const user = await users.findOne({_id:result[x].userId},{_id:0,username:1});
        result["username"] = user.username;
        result._id = result["_id"].toString();
        result.userId = result["userId"].toString();
        result.likes = result.likes.length
        console.log('retrieving thread');
        res.status(200).send(result);
    } catch (error){
        console.error(error);
        res.status(500).send("Error retrieving thread");
    }
}

export const getThreads = async (req, res) => {
    const query = req.query;
    const a = {}
    try {
        const com = db.collection("threads");
        const result = await com.find({},{likes:0,dislikes:0}).toArray();
        const users = db.collection("users");
        for(let x=0;x<result.length;x++){
            const user = await users.findOne({_id:result[x].userId},{_id:0,username:1},);
            result[x]["username"] = user.username;
            result[x].userId = result[x]["userId"].toString();
            if (query !== a){
                if (await com.findOne({_id:result[x]._id,likes:MUUID.from(query.id)})){
                    result[x]['liked'] = true
                }else if(await com.findOne({_id:result[x]._id,dislikes:MUUID.from(query.id)})){
                    result[x]['liked'] = false
                }else{
                    result[x]['liked'] = null
                }
            }
            result[x]._id = result[x]["_id"].toString();
            result[x].likes = result[x].likes.length
        }

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
            userId: MUUID.from(body.userId),
            textBody: body.text,
            timeOfThread: new Date(Date.now()),
            likes: [],
            title: body.title,
            dislikes: []});
        res.status(200).send("Creating thread")
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating thread")
    }
}

export const threadlike = async(req,res) => {
    const body = req.body;
    try{
        const com = db.collection("threads");
        if(body.add){
            if (com.findOne({_id:MUUID.from(body.id),likes:MUUID.from(body.userid)})){
                com.updateOne({_id:MUUID.from(body.id)},{$push:{likes:MUUID.from(body.userid)}});
            }
            com.updateOne({_id:MUUID.from(body.id)},{$pull:{dislikes:MUUID.from(body.userid)}});
        }else{
            com.updateOne({_id:MUUID.from(body.id)},{$pull:{likes:MUUID.from(body.userid)}});
        }
        res.status(200).send("Ok")
    } catch (error){
        console.error(error);
        res.status(500).send("Error")
    }
}

export const threadDislike = async(req,res) => {
    const body = req.body;
    try{
        const com = db.collection("threads");
        if(body.add){
            com.updateOne({_id:MUUID.from(body.id)},{$pull:{dislikes:MUUID.from(body.userid)}});
        }else{
            com.updateOne({_id:MUUID.from(body.id)},{$push:{dislikes:MUUID.from(body.userid)}});
            com.updateOne({_id:MUUID.from(body.id)},{$pull:{likes:MUUID.from(body.userid)}});
        }
        res.status(200).send("Ok")
    } catch (error){
        console.error(error);
        res.status(500).send("Error")
    }
}

export const commentlike = async(req,res) => {
    const body = req.body;
    const query = req.query;
    try{
        const com = db.collection("comments");
        com.updateOne({_id:MUUID.from(body.id)},{$pull:{likes:MUUID.from(body.userid)}})
        res.status(200).send("Removed")
    } catch (error){
        console.error(error);
        res.status(500).send("Error");
    }
}

export const checkLike = async(req,res) =>{
    const body = req.body;
    try{
        const com = db.collection("threads");
        com.find({_id:body.id},{likes:body.userid});
        res.status(200).send()
    } catch (error) {
        console.error(error);
        res.status(500).send("Error");
    }
}

