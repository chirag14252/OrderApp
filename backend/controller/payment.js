import shortid from "shortid";
import razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();



const razorpayInstance = new razorpay({
  key_id: "rzp_test_4Eo3nivh6HgiYl",
  key_secret: "3FVTfpUpdhl024q35LUCzgFW"
});


const payment = async (req,res)=>{
    const payment_capture = 1;
    const amount = req.body.amount;
    const currency = 'INR';
    const option = {
      amount: amount * 100,
      currency: currency,
      receipt: shortid.generate(),
      payment_capture
    };
    try {
      const response = await razorpayInstance.orders.create(option);
      console.log(response);
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount
      })
    }
    catch (error) {
      console.log(error);
    }
}


export default payment;