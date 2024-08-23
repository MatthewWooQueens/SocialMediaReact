import express from "express";
import cors from "cors";
import { auth } from "express-openid-connect";
import dotenv from 'dotenv';
dotenv.config();

import commentRoute from "./route/comments.js";
import userRoute from "./route/users.js";
import authRoute from "./route/auth.js";

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: '',
    clientID: process.env.CLIENT_ID,
    issuerBaseURL:process.env.ISSUER_BASE_URL
};

const port = process.env.PORT || 3000;
if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
  config.baseURL = `http://localhost:${port}`;
}

const app = express();
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors({origin: true}));
app.use(auth(config));

app.use("/comments", commentRoute);
app.use("/users", userRoute);
app.use("/auth", authRoute);

app.listen(port, () => console.log('Server Running'));
