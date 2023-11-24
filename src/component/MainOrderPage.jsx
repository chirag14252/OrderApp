import Header from "./Header.jsx"
import Food from "./Food.jsx"
import {CardContextProvider} from "../store/CartContext.jsx"
import { UserProgressContextProvider } from "../store/userProgressContext.jsx";
import Cart from "./Cart.jsx"
import displayRazor from "../util/paymentGateway.js"
import Checkout from "./Checkout.jsx";
import { useEffect } from "react";


const loadscript = (src)=>{
    return new Promise((resolve)=>{
      const script = document.createElement("script");
      script.src = src;
      script.onload = ()=>{
        resolve(true);
      }
      script.onerror = ()=>{
        resolve(false);
      }

      document.body.appendChild(script);
    })

  }


const MainOrderPage = ()=>{

  useEffect(()=>{
    //payment script to be loaded on document programmtically.
  loadscript("http://checkout.razorpay.com/v1/checkout.js") 
  },[])
  
    return(
      <UserProgressContextProvider>
      <CardContextProvider>
      <Header/>
      <Food/>
      <Cart payment={displayRazor}/>
      <Checkout/>
      </CardContextProvider>
     </UserProgressContextProvider>  
    )
}


export default MainOrderPage;