import { User } from "../models/userSchema.js";
import { catchAsyncError } from "./catchError.js";
import { errorMiddleware } from "./error.js";
import jwt from "jsonwebtoken";
const isAdminAuth = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return next(
      new errorMiddleware("You are not logged in! Please log in to get acces")
    );
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  if (req.user.role !== "Admin") {
    return next(
      new errorMiddleware("You are not authorized to access this route!")
    );
  }
  next();
});

const isPationAuth = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.pationToken;
  if (!token) {
    return next(
      new errorMiddleware("You are not logged in! Please log in to get acces")
    );
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  if (req.user.role !== "Patient") {
    return next(
      new errorMiddleware("You are not authorized to access this route!")
    );
  }
  next();
});

export { isAdminAuth, isPationAuth };
