import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
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
        doctor_lastName,
        hasvisited,
        address,
    } = req.body;

    if(!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !appointment_date || !department || !doctor_firstName || !doctor_lastName || !address){
        return next(new ErrorHandler("Please fill full form", 400));
    }
    const isConflict = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartement: department,
    })
    if(isConflict.length === 0){
        return next(new ErrorHandler("Doctor not found", 400));
    }
    if(isConflict.length > 1){
        return next(new ErrorHandler("Doctor conflict please contact through email ", 400));
    }
     const doctorId = isConflict[0]._id;
     const patientId = req.user._id;
     const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor:{
            firstName: doctor_firstName,
            lastName: doctor_lastName,
        },
        hasvisited,
        address,
        doctorId,
        patientId,
     });
     res.status(200).json({
            success: true,
            message: "Appointment sent successfully",
            appointment,
        });
});

export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
    const appointments = await Appointment.find();
    res.status(200).json({
        success: true,
        appointments,
    });
});

// export const getMyAppointments = catchAsyncErrors(async (req, res, next) => {
//     const appointments = await Appointment.find({patientId: req.user._id});
//     res.status(200).json({
//         success: true,
//         appointments,
//     });
// });

export const updateAppointmentStatus = catchAsyncErrors(async (req, res, next) => {
    // const appointment = await Appointment.findById(req.params.id);
    // if(!appointment){
    //     return next(new ErrorHandler("Appointment not found", 400));
    // }
    // appointment.status = req.body.status;
    // await appointment.save();
    // res.status(200).json({
    //     success: true,
    //     message: "Appointment status updated successfully",
    //     appointment,
    // });
    const {id} = req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment not found", 404));
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: "Appointment status updated successfully",
        appointment,
    });
});

export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment not found", 404));
    }
    await appointment.deleteOne();
    res.status(200).json({
        success: true,
        message: "Appointment deleted successfully",
    });
});