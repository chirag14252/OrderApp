import { Children, createContext, useEffect, useReducer } from "react";
import debounce from 'lodash/debounce.js'
import axiosInst from "../../axiosInst";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    deleteItem: (id) => { },
    updateCall:()=>{},
    setItem:()=>{}
})

const itemReducer = (state, action) => {
    if (action.type == "Add-item") {
       
        const exisitingCartItemIndex = state.items.findIndex(
            (item) => {
                return item.id == action.item.id;
            }
        )
        
        const UpdatedItems = [...state.items];
        if (exisitingCartItemIndex > -1) {
            const UpdatedItem = {
                ...state.items[exisitingCartItemIndex],
                quantity: state.items[exisitingCartItemIndex].quantity + 1
            }
            UpdatedItems[exisitingCartItemIndex] = UpdatedItem;
        }
        else {
            UpdatedItems.push(
                {
                    ...action.item,
                    quantity: 1
                }
            )
        }
        
        return { ...state, items: UpdatedItems }
    }
    if (action.type == "Delete-item") {
         
        const exisitingCartItemIndex = state.items.findIndex((item) => {
            return item.id === action.id;
        })
      
        const exisitingItem = state.items[exisitingCartItemIndex];

        const updatedItems = [...state.items];
        if (exisitingItem.quantity == 1) {
            updatedItems.splice(exisitingCartItemIndex, 1);
            
        }
        else {
            const UpdatedItem = {
                ...exisitingItem,
                quantity: exisitingItem.quantity - 1
            }
            updatedItems[exisitingCartItemIndex] = UpdatedItem;
        }
        return { ...state, items: updatedItems };
    }
    if(action.item == "set-item"){
       return {...state,items:action.item}
    }
    return state;
}


export function CardContextProvider({ children }) {
    
    const [cart, dispatchCartAction] = useReducer(itemReducer, { items: [] })
   
    function addItem(item) {
        dispatchCartAction({ type: "Add-item", item: item })
    }

    function deleteItem(id) {
        dispatchCartAction({ type: "Delete-item", id: id })
    }
    const setItem = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axiosInst().get("/order-details/get-order");
                console.log("data fetched");
                dispatchCartAction({ type: "set-item", items: res.data.cart.items });
                resolve(); // Resolve the promise after updating the items
            } catch (error) {
                console.error('Error fetching data:', error);
                reject(error);
            }
        });
    };
    const updateCall = debounce(() => {
        axiosInst().patch('/order-details/update-order', { items: cart.items }).then((res) => {
            console.log('data updated');
        });
    }, 500); // Adjust the debounce delay as needed
   

   
    const createContext = {
        items: cart.items,
        addItem,
        deleteItem,
        updateCall,
        setItem
    }

    
    return <CartContext.Provider value={createContext}>{children}</CartContext.Provider>
}

export default CartContext;


