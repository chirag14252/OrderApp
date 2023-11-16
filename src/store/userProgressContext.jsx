import { createContext, useState } from "react"


const UserProgressContext = createContext(
    {
       progress:'',
       showCart:()=>{},
       hideCart:()=>{},
       showCheckout:()=>{},
       hideCheckout:()=>{}
    }
)


export function UserProgressContextProvider({children}){
   
  const [userProgress,setuserProgress] = useState(null);
   
   
  function showCart(){
   setuserProgress('showCart');
  }

  function hideCart(){
   setuserProgress(null);
  }
  
  function showCheckout(){
   setuserProgress('checkout');
  }
  function hideCheckout(){
  setuserProgress(null);
  }

  const userProgressCtx = {
    progress:userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout
  }
 

return(
    <UserProgressContext.Provider value ={userProgressCtx}>
     {children}
    </UserProgressContext.Provider>
)
}

export default UserProgressContext;