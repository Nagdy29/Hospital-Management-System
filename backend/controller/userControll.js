import { catchAsyncError } from "../middlewares/catchError.js";
import { errorMiddleware } from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { generetToken } from "../utils/jwtToken.js";
const pationRegister = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !role
  ) {
    return res.status(400).json({ message: "please fill full form" });
  }
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Email exists" });
  }
  const hasPass = await bcrypt.hash(password, 10);

  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password: hasPass,
    gender,
    dob,
    nic,
    role,
  });
  generetToken(user, "user register", 200, res);
});
// log in
const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Check if email and password are provided
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: " user dosent exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "invaild pass" });
    }
    if (role !== user.role) {
      return res.json({ success: false, message: "invaild user" });
    }

    generetToken(user, "user Login Sucess", 200, res);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Errorrrrrrrr" });
  }
};

// admin
const addNewAdmin = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, gender, dob, nic } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic
  ) {
    return next(new errorMiddleware("Please fill all the fieldss", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new errorMiddleware(`${user.role} Already exist`, 400));
  }
  const hasPass = await bcrypt.hash(password, 10);

  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password: hasPass,
    gender,
    dob,
    nic,
    role: "Admin",
  });
  res.status(200).json({
    succes: true,
    message: " Add New Admin ",
  });
});

// all boctor

const allDoctor = catchAsyncError(async (req, res) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    succes: true,
    message: "All Doctor",
    doctors,
  });
});
// user details
const userDetails = catchAsyncError(async (req, res) => {
  const user = req.user;
  res.status(200).json({
    succes: true,
    message: "users",
    user,
  });
});

const logOutAdmin = catchAsyncError((req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
    })
    .json({
      succes: true,
      message: "Admin Logout",
    });
});
const logOutPation = catchAsyncError((req, res, next) => {
  res
    .status(200)
    .cookie("pationToken", "", {
      httpOnly: true,
    })
    .json({
      succes: true,
      message: "petion Logout",
    });
});
// doctor avatar
const addNewDoctor = catchAsyncError(async (req, res, next) => {
  let image_filename = `${req.file.filename}`;

  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    doctorDepartment,
    docAvatar,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !doctorDepartment
  ) {
    return res.json({ message: "full fill form" });
  }
  let user = await User.findOne({ email });
  if (user) {
    return res.json({ message: `${user.role} Already exist` });
  }

  const hasPass = await bcrypt.hash(password, 10);

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password: hasPass,
    gender,
    dob,
    nic,
    doctorDepartment,
    role: "Doctor",
    docAvatar: image_filename,
  });
  res.status(200).json({
    succes: true,
    message: "add doctor",
    doctor,
  });
});
export {
  pationRegister,
  loginUser,
  addNewAdmin,
  allDoctor,
  userDetails,
  logOutAdmin,
  logOutPation,
  addNewDoctor,
};
