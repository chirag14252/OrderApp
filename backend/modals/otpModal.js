

import mongoose, { Schema } from "mongoose";



const OTPSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    }
},{timestamps:true});



const OTPmodal = mongoose.model("OTP",OTPSchema);

export default OTPmodal;