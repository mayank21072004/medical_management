import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters"]
    },
    lastName: {
        type:String,
        required: true,
        minlength: [3, "Last name must be at least 3 characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    phone: {
        type: String,
        required: true,
        minlength: [11, "Phone number must be exact 11 characters"],
        maxlength: [11, "Phone number must be exact 11 characters"],
    },
    message: {
        type: String,
        required: true,
        minlength: [10, "Message must be at least 10 characters"]
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now()
    // }
});

export const Message = mongoose.model("Message", messageSchema);