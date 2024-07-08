import express from "express";
import { allMessage, sendMessage } from "../controller/messageControll.js";
import { isAdminAuth } from "../middlewares/auth.js";

const messageRouter = express.Router();

messageRouter.post("/send", sendMessage);
messageRouter.get("/all", isAdminAuth, allMessage);

export { messageRouter };
