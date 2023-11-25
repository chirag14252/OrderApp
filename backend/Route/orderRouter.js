import express from "express"
import verifyToken from "../middleware/verifyToken.js";




export const orderRoute = express.Router();
orderRoute.use(verifyToken);




orderRoute.get("/get-order",(req,res)=>{
    // console.log(req.user_id);
    return res.status(200).json({
        message:"get order is working fine"
    })

})




orderRoute.patch("/update-order/:user_id",(req,res)=>{

})




