import { useContext } from "react";
 
export default async function displayRazor(cartAmount){
 
//  post request to the nodeJS server
const reqbody = {
  amount: cartAmount
}

 const data = await fetch("http://localhost:3000/razorpay", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    amount: cartAmount
  })
}).then((res)=>{
   return res.json();
});
 //option

 const option = {
  key:"rzp_test_4Eo3nivh6HgiYl",
  currency:data.currency,
  amount:data.amount,
  description:"order for ghar ka jayeka",
  handler:(res)=>{
   alert("order_id" + res.razorpay_order_id);
   alert("payment_id" + res.razorpay_payment_id);
  },
  prefill:{
    name:"Chirag",
    email:"chi.chirag@gmail.com",
    contact:"8543999604"
  }
 }

 const paymentObject = new window.Razorpay(option);

  paymentObject.open();

}