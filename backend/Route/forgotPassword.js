import express from "express";
import nodemailer from "nodemailer";
import Mailgen from "mailgen"




export const forgotPasswordRoute = express.Router();
  



forgotPasswordRoute.post("/sendMail",(req,res)=>{
  const {email,otp} = req.body;
  if(!email){
    return res.status(400).json({
        message:"pls the mail properly"
    })
  }
  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const isValid = ()=>{
    return emailRegex.test(email);
  }
  if(!isValid){
   return res.status(400).json({
    message:"your mail is not valid,but enter correct email"
   })
  }
  else{
    const transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"chi.chiragbhardwaj@gmail.com",
            pass:"ayxzdpshvydppbxt"
        }
    })
  
    let message = {
        from:"chi.chiragbhardwaj@gmail.com",
        to: email,
        subject : "recovery password reset OTP",
        html: `<p>your OTP : ${otp}</p>`
    }
    transport.sendMail(message);
    return res.status(200).json({
        message:"recovery email sent"
    })
  }
})

forgotPasswordRoute.patch("/updatePassword",(req,res)=>{

})
