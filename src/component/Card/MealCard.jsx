import {currencyFormatter} from '../../util/Formatting.js'

const MealCard = ({data})=>{
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
            <button className="button">Add to Cart</button>
            </p>
           
        </article>
    </li>
    )
}

export default MealCard;