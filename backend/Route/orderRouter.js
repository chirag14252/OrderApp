import express from "express"


export const orderRoute = express.Router();





orderRoute.get("/get-order",(req,res)=>{
    return res.status(200).json({
        message:"get order is working fine"
    })

})


orderRoute.post("/add-order",(req,res)=>{



    
});




orderRoute.patch("/update-order/:user_id",(req,res)=>{

})


orderRoute.delete("/delete-order/:user_id",(req,res)=>{
    
})


