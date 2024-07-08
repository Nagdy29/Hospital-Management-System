import { catchAsyncError } from "../middlewares/catchError.js";
import { Appointment } from "../models/appointmentSchema.js";

export const postAppointment = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,

    address,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !address
  ) {
    return res.json({
      message: "please fill full form",
      succes: false,
    });
  }

  const appoient = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,

    address,
    // patientId: req.user.id,
  });
  res.status(200).json({
    succes: true,
    message: "appoient send sucess",
    appoient,
  });
});

// all allappoient

export const allappoient = catchAsyncError(async (req, res) => {
  const appoient = await Appointment.find();
  res.status(200).json({
    succes: true,
    message: "All Appoient",
    appoient,
  });
});

//  update app

export const updateApp = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const appoient = await Appointment.findById(id);
  if (!appoient) {
    return res.status(404).json({
      succes: false,
      message: "Appoient not found",
    });
  }
  const updatedAppoient = await Appointment.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    succes: true,
    message: "Update Appoient",
    updatedAppoient,
  });
});

//  delete app

export const deleteApp = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const appoient = await Appointment.findById(id);
  if (!appoient) {
    return res.status(404).json({
      succes: false,
      message: "Appoient not found",
    });
  }
  const deleteApp = await Appointment.deleteOne();
  res.status(200).json({
    succes: true,
    message: "delete Appoient",
    deleteApp,
  });
});
