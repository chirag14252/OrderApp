import { createContext, useContext, useState } from "react"


const userprogressContext = createContext(
    {
       progress :'',
       showCart:()=>{},
       hideCart:()=>{},
       showCheckout:()=>{},
       hideCheckout:()=>{}
    }
)




export const userProgressContextProvider = ({children})=>{
   
  const [userProgress,setuserProgress] = useState('');
  
   
  function showCart(){
   setuserProgress('showCart');
  }

  function hideCart(){
   setuserProgress('');
  }
  
  function showCheckout(){
   setuserProgress('checkout');
  }
  function hideCheckout(){
  setuserProgress('');
  }

  const userProgressCtx = {
    progress:userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout
  }
 

return(
    <userprogressContext.Provider value ={userProgressCtx}>
     {children}
    </userprogressContext.Provider>
)
}

export default userprogressContext;