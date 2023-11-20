import { useContext } from "react"
import Modal from "./UI/Modal"
import CartContext from "../store/CartContext"
import { currencyFormatter } from "../util/Formatting"
import Button from "./UI/Button"
import UserProgressContext from "../store/userProgressContext"
import CartItem from "./CartItem"




const Cart = ({payment})=>{    
   
  const CartCtx  = useContext(CartContext);

  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = CartCtx.items.reduce((acc,curr)=>{
  return acc + curr.quantity*curr.price;
  },0)
   //function for closing the cart 
   const CartCloseHndler = ()=> {
    userProgressCtx.hideCart();
   }
  console.log(cartTotal);
   return(
    <Modal className = "cart" open={userProgressCtx.progress === 'showCart'}>
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
          CartCloseHndler();
          payment(cartTotal);
        }}>Go to Checkout</Button>}
      </p>
    </Modal>
   )

}

export default Cart;