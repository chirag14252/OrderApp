import { useState, useEffect, useContext } from "react";
import MealCard from "./Card/MealCard";
import CartContext from "../store/CartContext";
import axiosInst from "../../axiosInst";
import CartItem from "./CartItem";
const Food = () => {
    const [FoodItem, setFoodItem] = useState([]);
    const  CartCtx = useContext(CartContext);
    //fetch at page Load
    const callApi = async () => {
        const response = fetch("http://localhost:3000/meals").then((res) => {
            return res.json();
        })
        const data = await response;
        setFoodItem(data)
    }
  

    useEffect(() => {
       callApi();
       CartCtx.setCall();
    },[])
     
    
    return (
        <>
            <ul id="meals">
                {
                    FoodItem?.map((data,idx) => {
                        return (
                           <MealCard data ={data} key={idx}/>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default Food;