import express from "express";
import {
  addNewAdmin,
  addNewDoctor,
  allDoctor,
  logOutAdmin,
  logOutPation,
  loginUser,
  pationRegister,
  userDetails,
} from "../controller/userControll.js";
import { isAdminAuth, isPationAuth } from "../middlewares/auth.js";
import multer from "multer";

const userRouter = express.Router();
//image
const storage = multer.diskStorage({
  destination: "uplodes",

  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
userRouter.post("/patien/register", pationRegister);
userRouter.post("/login", loginUser);
userRouter.post("/admin/add", isAdminAuth, addNewAdmin);
userRouter.get("/doctor", allDoctor);
userRouter.get("/admin/me", isAdminAuth, userDetails);
userRouter.get("/admin/logout", isAdminAuth, logOutAdmin);
userRouter.get("/patient/me", userDetails);
userRouter.get("/patient/logout", isPationAuth, logOutPation);
userRouter.post(
  "/doctor/addBoc",
  upload.single("image"),

  addNewDoctor
);

export { userRouter };
