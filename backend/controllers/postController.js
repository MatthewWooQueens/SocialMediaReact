import db from "../db/connection.js";
import MUUID from 'uuid-mongodb';

export const getPost = async (req, res) => {
    const { postID } = req.body;
    com = db.collection('posts');
    try{
        const result = com.find({'_id': postID});
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('Could not retrieve post');
    }
};

export const postPost = async(req, res) => {
    const body = req.body;
    com = db.collection('posts');

    try{

    } catch (err) {
        res.status(500).send("Error creating post");
    }
};
