import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { messageRouter } from "./router/messageRouter.js";
import { userRouter } from "./router/userRouter.js";
import { appoientRouter } from "./router/appoientmentRouter.js";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();
config({ path: "./config/config.env" });
// image
app.use("/images", express.static("uplodes"));

const corsOptions = {
  origin: "http://localhost:5173", // السماح بهذا الأصل
  origin: "http://localhost:5174", // السماح بهذا الأصل
  origin: "http://localhost:5175", // السماح بهذا الأصل
  credentials: true, // السماح باستخدام الـ credentials
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
app.use("/api/message", messageRouter);
app.use("/api/user", userRouter);
app.use("/api/appoient", appoientRouter);
dbConnection();

//eroor
app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
