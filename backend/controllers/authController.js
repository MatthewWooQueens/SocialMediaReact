import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import MUUID from 'uuid-mongodb';
import db from '../db/connection.js';

dotenv.config();

const generateToken = (userID) => {
    console.log("Generating tokens");
    const access_token = jwt.sign({userID},process.env.TOKEN_SECRET, {expiresIn: '1m'});
    const refresh_token = jwt.sign({userID},process.env.TOKEN_SECRET, {expiresIn: '2m'});
    return {access_token, refresh_token};
};

const storeToken = async (userID, refreshToken) => {
    const token = db.collection('tokens');
    const salt = +process.env.SALT;
    const hash = await bcrypt.hash(refreshToken, salt);
    await token.insertOne({
        _id: userID,
        createdAt: new Date(),
        refreshToken: hash});
    
    const test = await token.findOne({_id:userID});
    //console.log(test);
}

const setCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1 * 60 * 1000,
        httpOnly: true
    });

    res.cookie("refreshToken", refreshToken, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 2 * 60 * 1000,
        httpOnly: true
    });
};

export const signup = async (req, res) => {
    try{
        if (
            !(
                req.body.email &&
                req.body.username &&
                req.body.password
            )
        ){
            res.status(400).send("All input is required");
        }
        const users = db.collection('users');
        const oldUser = await users.findOne({email: req.body.email})
        if (oldUser) {
            res.status(400).send("User already exists with that email");
        }
        const uuid = MUUID.v4();
        const salt = +process.env.SALT;
        const hash = await bcrypt.hash(req.body.password, salt);

        const newUser = {_id: uuid,
            username: req.body.username,
            email: req.body.email,
            password: hash}

        await users.insertOne(newUser);

        const { access_token, refresh_token } = generateToken(uuid);
        setCookies(res, access_token, refresh_token);
        await storeToken(uuid, refresh_token);
        
        res.status(200).json(newUser);

    }catch (err){
        console.error(err)
        res.status(400).send("Failed to sign up");
    }
}

export const login = async (req, res) => {
    try {
        if (!(
            req.body.email &&
            req.body.password
        )){
            res.status(400).send("Missing Required Fields");
        }
        const users = db.collection('users');
        const curUser = await users.findOne({email:req.body.email});
        if (!(curUser && (await bcrypt.compare(req.body.password, curUser.password)))){
            res.status(400).send("Incorrect email or password");
        }
        const uuid = MUUID.from(curUser._id);
        const { access_token, refresh_token } = generateToken(uuid);
        setCookies(res, access_token, refresh_token);

        await storeToken(uuid, refresh_token);

        res.status(200).json({ 
            _id: curUser._id,
            username: curUser.username,
            email: curUser.email
        });

    }catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
};

export const logout = async (req, res) => {
    try{
        const tokens = db.collection('tokens');
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            const decoded = jwt.verify(refreshToken, process.env.TOKEN_SECRET);
            tokens.deleteOne({_id: decoded.userID});
        }

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        res.status(200).send("User logged out");
    }catch (err){
        res.status(500).send(err)
    }
}

export const refreshTokens = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            res.status(400).send("No refresh token provided");
        }

        const token = db.collection('tokens');
        const decoded = jwt.verify(refreshToken, process.env.TOKEN_SECRET);
        const hash = await token.findOne({_id: decoded.userID});

        if (!bcrypt.compare(refreshToken, hash)){
            res.status(400).send("Invalid refresh token");
        }

        const accessToken = jwt.sign(decoded.userID, process.env.TOKEN_SECRET, {expiresIn: "1m"});
        res.cookie("accessToken", accessToken, {
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1 * 60 * 1000,
            httpOnly: true
        });

        res.status(200).send("Token refresh success");
    } catch (err) {
        res.status(500).send(err);
    }
}
