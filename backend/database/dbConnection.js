import mongoose from "mongoose";

export const dbConnection = () =>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "HOSPITALMANAGEMENT"
    }).then(()=>{
        console.log("Database connected successfully");
    }).catch((err)=>{
        console.log(`Error in connecting to the database : ${err}`);
    });
}