import e from "express";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import {generateToken} from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
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
    // if any one is none
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !role){
        return next(new ErrorHandler("Please fill full form", 400));
    }
    let user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler("User already exists", 400));
    }
    user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role,
    });
    generateToken(user,"User Registered Successfully!",200,res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const {email , password,confirmPassword,role} = req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please enter all fields", 400));
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("Password and confirm Password does not match", 400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 400));
    }
    if(user.role !== role){
        return next(new ErrorHandler("Invalid with this role not found", 400));
    }
    generateToken(user,"User Logged in Successfully!",200,res);
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { 
        firstName, 
        lastName, 
        email,
        phone,
        password,
        gender,
        dob,
        nic,
    } = req.body;
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic){
        return next(new ErrorHandler("Please fill full form", 400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} with this email Already Exists!`, 400));
    }
    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role: "Admin",
    });
    res.status(200).json({
        success: true,
        message: "New Admin Registered Successfully!",
        // admin,
    });
});

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({role: "Doctor"});
    res.status(200).json({
        success: true,
        doctors,
    });
});
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.cookie("adminToken",null,{
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "Admin Logged Out Successfully!",
    });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.cookie("patientToken",null,{
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "Patient Logged Out Successfully!",
    });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Please upload an image", 400));
    }

    const {docAvatar} = req.files;
    const allowedFormats = ["image/png","image/jpeg","image/webp"];
    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File Format Not supported", 400));
    }
    console.log("image uploaded");
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        doctorDepartement,
    } = req.body;
    console.log("usweee uploaded");

    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !doctorDepartement){
        console.log(firstName,lastName,email,phone,password,gender,dob,nic,doctorDepartement);
        return next(new ErrorHandler("Please fill full form", 400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} with this email Already Exists!`, 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.log("Error in uploading image", cloudinaryResponse.error || "unknown error");
    }
    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        doctorDepartement,
        role: "Doctor",
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    });
    res.status(200).json({
        success: true,
        message: "New Doctor Registered Successfully!",
        doctor,
        // doctor,
    });
});




