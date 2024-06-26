import { urlencoded } from "express";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
    nic: {
        type: String,
        required: true,
        minlength: [13, "nic must be exact 13 characters"],
        maxlength: [13, "nic must be exact 13 characters"],
    },
    dob:{
        type: Date,
        required: [true, "DOB is required"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male","Female"],
    },
    password:{
        type: String,
        required: true,
        minlength: [8, "Password must be at least 8 characters"],
        select : false,
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin","Patient","Doctor"],
    },
    doctorDepartement: {
        type: String,
    },
    docAvatar: {
        public_id: String,
        url: String,
    }
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES
    });
}

export const User = mongoose.model("User", userSchema);
