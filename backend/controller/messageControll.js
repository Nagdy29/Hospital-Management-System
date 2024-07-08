import { catchAsyncError } from "../middlewares/catchError.js";
import { errorMiddleware } from "../middlewares/error.js";
import { MessageModule } from "../models/messageSchema.js";
//

// send
const sendMessage = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new errorMiddleware("pleasr Fill Form", 400));
  }
  await MessageModule.create({ firstName, lastName, email, phone, message });
  res.status(200).json({
    sucess: true,
    message: "message Send",
  });
});
// all messaage
const allMessage = catchAsyncError(async (req, res) => {
  const mess = await MessageModule.find();
  res.status(200).json({
    succes: true,
    message: "All Doctor",
    mess,
  });
});
export { sendMessage, allMessage };
