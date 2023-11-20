import { useContext } from "react";
import { currencyFormatter } from "../util/Formatting";
import Modal from "./UI/Modal"
import UserProgressContext from "../store/userProgressContext";


const Checkout = ()=>{
    const CartCtx  = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    
    const cartTotal = CartCtx.items.reduce((acc,curr)=>{
        return acc + curr.quantity*curr.price;
        },0);
    return(
        <Modal open = {userProgressCtx.progress == 'checkout'}>
           <form>
            <h1>CheckOut</h1>
            <p>Total Amount : {currencyFormatter(cartTotal)}</p>
            <Input label="Full Name" type = "text" id="full-name"/>
            <Input label="E-mail Address" type ="text" id = "email"/>
            <Input label="Street" type ="text" id = "street"/>
              
            

           </form>
        
        
        </Modal>
    )
}