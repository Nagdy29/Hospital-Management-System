import express from "express";
import {
  allappoient,
  deleteApp,
  postAppointment,
  updateApp,
} from "../controller/appointmentControll.js";
import { isAdminAuth, isPationAuth } from "../middlewares/auth.js";

const appoientRouter = express.Router();

appoientRouter.post("/post", postAppointment);
appoientRouter.get("/all", isAdminAuth, allappoient);
appoientRouter.put("/update/:id", isAdminAuth, updateApp);
appoientRouter.delete("/delete/:id", isAdminAuth, deleteApp);
export { appoientRouter };
