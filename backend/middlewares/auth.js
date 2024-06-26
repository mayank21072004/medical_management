import {catchAsyncErrors} from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import {User} from "../models/userSchema.js";
import jwt from "jsonwebtoken";
console.log("I am inside auth middleware");
export const isAdminAuthenticated = catchAsyncErrors(async (req,res,next) =>{
    // console.log("I am inside isAdminAuthenticated middleware");
    const token = req.cookies.adminToken;
    if(!token){
        return next(new ErrorHandler("Admin not authenticated",401));
    }
    // console.log("I am inside token");
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    // console.log("I am inside decoded");
    req.user = await User.findById(decoded.id);
    // console.log("I am inside user");
    if(req.user.role !== "Admin"){
        console.log("I am inside role");
        return next(new ErrorHandler(`Role ${req.user.role} is not authorized to access this resources`,403));

    }
    // console.log("I am inside next");
    next();
});

export const isPatientAuthenticated = catchAsyncErrors(async (req,res,next) =>{
    const token = req.cookies.patientToken;
    if(!token){
        return next(new ErrorHandler("Patient not authenticated",401));
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(req.user.role !== "Patient"){
        return next(new ErrorHandler(`Role ${req.user.role} is not authorized to access this resources`,403));

    }
    next();
});