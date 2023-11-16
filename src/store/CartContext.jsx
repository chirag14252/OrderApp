import { Children, createContext, useReducer } from "react";
const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    deleteItem: (id) => { }
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
        console.log(state.items);
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
    const createContext = {
        items: cart.items,
        addItem,
        deleteItem
    }

    
    return <CartContext.Provider value={createContext}>{children}</CartContext.Provider>
}

export default CartContext;


