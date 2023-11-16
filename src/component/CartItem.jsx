import { currencyFormatter } from "../util/Formatting"


const CartItem = ({item,onIncrease,onDecrease})=>{
    
   return(
     
      <li className="cart-item">
       <p>
       {item.name} -  {item.quantity} x {currencyFormatter.format(item.price)}
       </p>
       <p className="cart-item-actions">
        <button onClick={onIncrease}>+</button>
        <span>{item.quantity}</span>
        <button onClick={onDecrease}>-</button>
       </p>

      </li>
   )

}

export default CartItem;