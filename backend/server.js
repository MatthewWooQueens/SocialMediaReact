import express from "express";
import cors from "cors";
import { auth } from "express-openid-connect";
import dotenv from 'dotenv';
dotenv.config();

import commentRoute from "./route/comments.js";
import authRoute from "./route/auth.js";

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: 'http://localhost:3000',
    clientID: process.env.CLIENT_ID,
    issuerBaseURL:process.env.ISSUER_BASE_URL
};

const port = process.env.PORT || 3000;
if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
  config.baseURL = `http://localhost:${port}`;
}

const app = express();
app.use(express.json({limit: '10Mb'}));
app.use(express.urlencoded({extended: true}))
app.use(cors({origin: true}));
app.use(auth(config));

app.use("/comments", commentRoute);
app.use("/authenticate", authRoute);

app.listen(port, () => console.log('Server Running'));
