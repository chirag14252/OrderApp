

import mongoose, { Schema } from "mongoose";


const user = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true});


const userModal = mongoose.model("userDetails",user);
export default userModal;