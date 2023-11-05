import { Children, createContext, useReducer } from "react";


const CartContext = createContext({
    items : [],
    addItem : ()=>{},
    deleteItem :()=>{}
})

const itemReducer = (state,action)=>{
   if(action.type == "Add-item"){
         const exisitingCartItemIndex = state.item.findIndex(
            (item)=>{
               item.id === action.item.id;
            }
         )
         const UpdatedItems = [...state.items];
         if(exisitingCartItemIndex > -1){
            const UpdatedItem = {
                ...state.item[exisitingCartItemIndex],
                quantity : state.item[exisitingCartItemIndex].quantity+1
            }
            UpdatedItems[exisitingCartItemIndex] = UpdatedItem;
         }
         else{
            UpdatedItems.push(
                {
                    ...action.item,
                    quantity:1
                }
            )
         }
         return {...state,items:UpdatedItems}
        }
     if(action.type == "Delete-item"){
        const exisitingCartItemIndex = state.items.findIndex((item)=>{
           return item.id === action.id;
        })
        const exisitingItem = state.items[exisitingCartItemIndex];
        const updatedItems = [...state.items];
        if(exisitingItem.quantity == 1){
            exisitingItem.splice(exisitingCartItemIndex,1);
        }
        else{
            const UpdatedItem = {
                ...allItems,
                quantity : exisitingItem.quantity -1
            }
            updatedItems[exisitingCartItemIndex] = UpdatedItem;
        }
        return {...state,items:updatedItems};
    }
  return state;
  }
 

function CardContextProvider({children}){
    const [cart,dispatchCartAction] = useReducer(itemReducer,{items : []})
    function addItem(item){
        dispatchCartAction({type:"Add-item",item:item})
    }

    function deleteItem(id){
        dispatchCartAction({type:"Delete-item",id:id})
    }
    const createContext = {
        items : cart.items,
        addItem,
        deleteItem
    }
    return <CartContext.Provider value={createContext}>{children}</CartContext.Provider>
}



export default CartContext;