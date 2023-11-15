import { useContext } from 'react';
import {currencyFormatter} from '../../util/Formatting.js'
import Button from '../UI/Button.jsx';
import CartContext from '../../store/CartContext.jsx'

const MealCard = ({data})=>{
    const CartCtx = useContext(CartContext);
     const addItem = ()=>{
       CartCtx.addItem(data);
     }
    return(
        <li id={data.id} className="meal-item">
        <article>
            <img src={`http://localhost:3000/${data.image}`} alt={data.name} />
            <div>
            <h3>{data.name}</h3>
            <p className="meal-item-price">{currencyFormatter.format(data.price)}</p>
            <p className="meal-item-description">
                {data.description}
            </p>
            </div>
            <p className="meal-item-actions">
            <Button onClick={addItem}>Add to Cart</Button>
            </p>
           
        </article>
    </li>
    )
}

export default MealCard;