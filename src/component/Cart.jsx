import { useContext } from "react"
import Modal from "./UI/Modal"
import CartContext from "../store/CartContext"
import { currencyFormatter } from "../util/Formatting"
import Button from "./UI/Button"
import userProgressContext from "../store/userProgressContext"
const Cart = ()=>{
  const CartCtx  = useContext(CartContext);
  const userProgressCtx = useContext(userProgressContext);
  const cartTotal = CartCtx.items.reduce((acc,curr)=>{
  return acc+curr;
  },0)
   return(
    <Modal className = "cart" open={userProgressContext.progress === 'showCart'}>
        <h1>Cart</h1>
        <ul>
        {
            CartCtx.items.map((item)=>{
                return <li key={item.id}>{item.name}-{item.quantity}</li>
            })
        }
        </ul>
      <p className="cart-total"> {currencyFormatter.format(cartTotal)} </p>
      <p className="modal-actions">
        <Button textOnly>Close</Button>
        <Button>Go to Checkout</Button>
      </p>
    </Modal>
   )

}

export default Cart;