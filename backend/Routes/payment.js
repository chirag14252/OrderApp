import dotenv from "dotenv";
import express from "express";
import Razorpay from "razorpay";
import cors from "cors"; 
dotenv.config();

const router = express.Router();
router.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: 'POST, GET, PUT',
    allowedHeaders: '*',
  }));
router.post("/orders",async(req,res)=>{
 try{
    const instance = new Razorpay({
     key_id: process.env.RAZORPAY_KEY_ID,
     key_secret: process.env.RAZORPAY_SECRET,
    });
    const option = {
        amount : 2,
        currency:INR,
        receipt: "receipt_order_74394"
    }

    const order = await instance.orders.create(option);
    if(!order){
        return res.status(500).json({
            message:"some error occured"
        })
    }
    return res.status(200).json({
        message:"payment in process",
        data:order
    }) 
 }
 catch(error){
   return res.status(500).send(error);
 }

})


router.post("/success", async (req, res) => {
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;