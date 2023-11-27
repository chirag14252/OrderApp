import { useContext } from "react";
import { currencyFormatter } from "../util/Formatting";
import Modal from "./UI/Modal"
import UserProgressContext from "../store/userProgressContext";
import CartContext from "../store/CartContext";
import Input from "./UI/Input";
import Button from "./UI/Button";
import axiosInst from "../../axiosInst";
import axios from "axios";

const Checkout = ()=>{
    const CartCtx  = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    
    const cartTotal = CartCtx.items.reduce((acc,curr)=>{
        return acc + curr.quantity*curr.price;
        },0);



 const closeHndler = ()=>{
     userProgressCtx.hideCheckout();
 }       
    return(
        <Modal open = {userProgressCtx.progress == 'checkout'}  onClose={closeHndler}>
           <form>
            <h1>CheckOut</h1>
            <p>Total Amount : {currencyFormatter.format(cartTotal)}</p>
            <Input label="Full Name" type = "text" id="full-name"/>
            <Input label="E-mail Address" type ="email" id = "email"/>
            <Input label="Street" type ="text" id = "street"/>
             <div className="control-row">
             <Input label="City" type="text" id="city"/>
             <Input label="Postal Code" type="text" id="postal-code"/> 
             </div>
            <p className="modal-actions">
                <Button type = "button" textOnly onClick={closeHndler}>Close</Button>
                <Button onClick={""}>Submit Order</Button>
            </p>
           </form>
        </Modal>
    )
}

export default Checkout;