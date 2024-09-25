import asyncHandler from 'express-async-handler';
import db from "../db/connection.js";
import MUUID from 'uuid-mongodb';
//MUUID is a commonjs module meaning it can only be imported
//through the defaut export (ie. everything has to be imported)
const com = db.collection("users");

export const getUsers = async (req, res) => {
    try {
        const result = await com.find().toArray();
        res.status(200).send(result);
    } catch (error) {
        console.error(error)
        res.status(500).send("Error retrieving users");
    }
};

export const oneUser = async (req, res) => {
    const id = MUUID.from(req.params.id)

    try {
        let result = await com.findOne({_id: id});
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send("Error retrieving user");
    }
};

export const postUsers = async (req, res) => {
    const body = req.body; 
    try{
        const uuid = MUUID.v4();
        console.log(uuid);
        await com.insertOne({
            _id: uuid,
            username: "Rutyreal",
            email: 'rutyreal@gmail.com',
            password: '12345678'
        });
        res.status(200).send("User Inserted");
    } catch (error) {
        console.error(error)
        res.status(500).send("Error inserting user")
    }
};

