import {Message} from "../models/messageSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js"
export const sendMessage = catchAsyncErrors(async (req, res,next) => {
    // console.log(req.body);
    // console.log("Message sentinggggg successfully");
     const { firstName, lastName, email, phone, message } = req.body;
        if (!firstName || !lastName || !email || !phone || !message) {
            console.log("All fields are required");
            return next(new ErrorHandler("please fill full form ", 400));
        }
        // console.log("creating message");
        await Message.create({
            firstName,
            lastName,
            email,
            phone,
            message
        });
        // console.log("Message created successfully");
        res.status(200).json({
            sucess: true,
            message: "Message sent successfully"
        });

});

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
    const messages = await Message.find();
    res.status(200).json({
        success: true,
        messages
    });
});