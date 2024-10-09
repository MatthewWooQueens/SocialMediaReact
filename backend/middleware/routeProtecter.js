import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../db/connection.js';
import MUUID from "uuid-mongodb";
dotenv.config();

export const protectRoute = async (req, res, next) => {
    try {
        const users = db.collection('users');
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({message:"No access token provided"});
        }
        try {
            console.log(token)
            const decode = jwt.verify(token, process.env.TOKEN_SECRET);
            const userid = MUUID.from(decode.id)
            const user = await users.findOne({_id:userid}, {projection:{password:0}});
            console.log(user);
            if (!user){
                return res.status(401).json({message:"User not found"});
            }

            req.user = user;
            console.log("Passed")
            next();
        } catch (err){
            console.error(err);
            return res.status(401).json({message:"Invalid token"});
        }

    } catch (err) {
        console.error(err);
        return res.status(401).json({message:"Error in routeProtector"})
    }
}
