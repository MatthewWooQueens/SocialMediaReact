import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../db/connection.js';
dotenv.config();

export const protectRoute = async (req, res, next) => {
    try {
        const users = db.collection('users');
        const token = req.cookie.accessToken;
        if (!token) {
            res.status(400).send("No access token provided");
        }
        try {
            const decode = jwt.verify(token, process.env.TOKEN_SECRET);
            const user = users.findOne({_id:decode.userID}, {password: 0});
            console.log(user);
            if (!user){
                res.status(400).send("User not found");
            }

            req.user = user;
            next();
        } catch (err){
            console.error(err);
            res.status(400).send("Invalid token");
        }

    } catch (err) {
        console.error("Error in routeProtector");
        res.status(500).send(err)
    }
}
