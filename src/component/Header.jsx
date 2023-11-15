import LogoImg from "../assets/logo.jpg"
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import userProgressContext from "../store/userProgressContext";
const Header = ()=>{
  const Cardctx = useContext(CartContext);
  
  const userProgressCtx = useContext(userProgressContext);
  console.log(userProgressCtx);
  const TotalCartItems =  Cardctx.items.reduce((accum,item)=>{
    return accum += item.quantity;
  },0)
  function handleShowCart(){
    userProgressCtx.showCart();
  }
    return(
       <header id = "main-header">
        <div id="title">
        <img src={LogoImg}/>
        <h1>GharKaJayeka</h1>
        </div>
         <nav>
           <Button textOnly onClick={handleShowCart}>Cart({TotalCartItems})</Button>
         </nav>
       </header>
    )
}

export default Header;