import LogoImg from "../assets/logo.jpg"
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import UserProgressContext from "../store/userProgressContext";
import { useNavigate } from "react-router-dom";
const Header = ()=>{
  const Cardctx  = useContext(CartContext);
  const navigate = useNavigate();
  const userProgressCtx = useContext(UserProgressContext);
  
  const TotalCartItems =  Cardctx.items.reduce((accum,item)=>{
    return accum += item.quantity;
  },0)

  function handleShowCart(){
    userProgressCtx.showCart();
    console.log(userProgressCtx.progress);
  }
  function tokenRemover(){
   localStorage.removeItem("token")
    navigate("/")
  }
    return(
       <header id = "main-header">
        <div id="title">
        <img src={LogoImg}/>
        <h1>GharKaJayeka</h1>
        </div>
         <nav>
           <Button textOnly onClick={handleShowCart}>Cart({TotalCartItems})</Button>
           <Button textOnly onClick={tokenRemover}>Logout</Button>
         </nav>
       </header>
    )
}

export default Header;