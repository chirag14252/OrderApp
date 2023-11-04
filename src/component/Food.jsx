import { useState, useEffect } from "react";
import MealCard from "./Card/MealCard";
const Food = () => {
    const [FoodItem, setFoodItem] = useState([]);
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
       
    }, [])
    return (
        <>
            <ul id="meals">
                {
                    FoodItem?.map((data) => {
                        return (
                           <MealCard data ={data}/>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default Food;