import express from "express";
import nodemailer from "nodemailer";
import OTPmodal from "../modals/otpModal.js";
import otpGenerator from "otp-generator";



export const forgotPasswordRoute = express.Router();

const sendMail = (otp,email,res) => {
  
}


//only email will be send via req body
//and also work for the resend email
forgotPasswordRoute.post("/sendOTPMail", async (req, res) => {
  const { email } = req.body;
  const otp = "" + otpGenerator.generate(4, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
  if (!email) {
    return res.status(400).json({
      message: "pls the mail properly"
    })
  }
  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const isValid = () => {
    return emailRegex.test(email);
  }
  if (!isValid) {
    return res.status(400).json({
      message: "your mail is not valid,but enter correct email"
    })
  }
  else {
    const data = await OTPmodal.findOne({ email })
    if (data) {
      const updatedata = await OTPmodal.findOneAndUpdate({ email: email }, { otp: otp });
      if (updatedata) {
        const transport = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "chi.chiragbhardwaj@gmail.com",
            pass: "ayxzdpshvydppbxt"
          }
        })
      
        let message = {
          from: "chi.chiragbhardwaj@gmail.com",
          to: email,
          subject: "recovery password reset OTP",
          html: `<p>your OTP : ${otp}</p>`
        }
        transport.sendMail(message);
        return res.status(200).json({
          message: "recovery email sent"
        })
      }
      else{
        return res.status(500).json({
          message:"server side error"
        })
      }
    }
    else {
      const datacreate = await OTPmodal.create({
        email:email,
        otp:otp
      });
      if (datacreate) {
        const transport = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "chi.chiragbhardwaj@gmail.com",
            pass: "ayxzdpshvydppbxt"
          }
        })
      
        let message = {
          from: "chi.chiragbhardwaj@gmail.com",
          to: email,
          subject: "recovery password reset OTP",
          html: `<p>your OTP : ${otp}</p>`
        }
        transport.sendMail(message);
        return res.status(200).json({
          message: "recovery email sent"
        })
      }
    }
  }
})


