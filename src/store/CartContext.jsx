import { Children, createContext, useContext, useEffect, useReducer } from "react";
import debounce from 'lodash/debounce.js'
import axiosInst from "../../axiosInst";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    deleteItem: (id) => { },
    updateCall:()=>{},
    setCall:()=>{}
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
    if(action.type == "set-item"){
       return {...state,items:action.items}
    }
    return state;
}


export function CardContextProvider({ children }) {
    
    const [cart, dispatchCartAction] = useReducer(itemReducer, { items: [] })
    const cartCtx = useContext(CartContext);
    function addItem(item) {
        dispatchCartAction({ type: "Add-item", item: item });
      console.log(item);
    }

    function deleteItem(id) {
        dispatchCartAction({ type: "Delete-item", id: id });
    }
   
    const updateCall = debounce(() => {
        axiosInst().patch('/order-details/update-order', { items: cart.items }).then((res) => {
            console.log('data updated');
        });
      
    }, 500); // Adjust the debounce delay as needed
     
    const setCall = async ()=>{
     const order = await axiosInst().get("/order-details/get-order");
     dispatchCartAction({type:"set-item",items:order.data.cart.items});
    //  dispatchCartAction({type:"set-item",items:order.data.cart.items});
    }

   
    const createContext = {
        items: cart.items,
        addItem,
        deleteItem,
        updateCall,
        setCall
    }

    
    return <CartContext.Provider value={createContext}>{children}</CartContext.Provider>
}

export default CartContext;


