import express from "express";
import cartModal from "../modals/cartDetailsModal.js";
import verifyToken from "../middleware/verifyToken.js";




export const orderRoute = express.Router();
orderRoute.use(verifyToken);

orderRoute.use(express.json());


// orderRoute.get("/get-order",(req,res)=>{
//     // console.log(req.user_id);
//     return res.status(200).json({
//         message:"get order is working fine"
//     })

// })


// work to be done
//  user_id
orderRoute.patch("/update-order",(req,res)=>{
  cartModal.findOneAndUpdate({
    userId:req.user_id
  },{
   items:req.body.items
  }).then((data,err)=>{
   if(data){
    return res.status(200).json({
      message:"data updated SuccessFully"
    })
   }
   if(err){
    return res.status(400).json({
      message:"server not updated yet"
    })
   }
  })
})







