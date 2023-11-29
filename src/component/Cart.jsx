import { useContext } from "react"
import Modal from "./UI/Modal"
import CartContext from "../store/CartContext"
import { currencyFormatter } from "../util/Formatting"
import Button from "./UI/Button"
import UserProgressContext from "../store/userProgressContext"
import CartItem from "./CartItem"




const Cart = ()=>{    
   
  const CartCtx  = useContext(CartContext);

  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = CartCtx.items.reduce((acc,curr)=>{
  return acc + curr.quantity*curr.price;
  },0)
   //function for opening the checkout
   const CheckoutHndler = () =>{
     userProgressCtx.showCheckout();
   }
   const CartCloseHndler = ()=>{
    userProgressCtx.hideCart();
   }
  
   return(
    <Modal className = "cart" open={userProgressCtx.progress === 'showCart'} onClose={userProgressCtx.progress === 'showCart'?CartCloseHndler:null}>
        <h1>Cart</h1>
        <ul>
        {
            CartCtx.items.map((item)=>{
                return <CartItem item={item} onIncrease={()=>{CartCtx.addItem(item)}} onDecrease ={()=>{CartCtx.deleteItem(item.id)}}></CartItem>
            })
        }
        </ul>
      <p className="cart-total"> {currencyFormatter.format(cartTotal)} </p>
      <p className="modal-actions">
        <Button textOnly onClick={CartCloseHndler}>Close</Button>
        {(CartCtx.items.length > 0) && <Button onClick={()=>{
         CheckoutHndler();
        }}>Go to Checkout</Button>}
      </p>
    </Modal>
   )

}

export default Cart;