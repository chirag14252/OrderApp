import Header from "./component/Header";
import Food from "./component/Food";
import {CardContextProvider} from "./store/CartContext.jsx"
import { UserProgressContextProvider } from "./store/userProgressContext";
import { useEffect } from "react";
import Cart from "./component/Cart";
import displayRazor from "./util/paymentGateway.js";
import Checkout from "./component/Checkout.jsx";

function App() {
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

  useEffect(()=>{
  loadscript("http://checkout.razorpay.com/v1/checkout.js")
  },[])
  return (
     <UserProgressContextProvider>
     <CardContextProvider>
      <Header/>
      <Food/>
      <Cart payment={displayRazor}/>
      <Checkout/>
      </CardContextProvider>
     </UserProgressContextProvider>
  );
}

export default App;
