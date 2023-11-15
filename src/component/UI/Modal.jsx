
import { createPortal } from "react-dom";
import { useContext, useEffect, useRef } from "react";
import userProgressContext from "../../store/userProgressContext";

const Modal = ({children,open,className})=>{
  
   const dialog = useRef();
   useEffect(()=>{
   if(open){
   dialog.current.showModal();
   }
   },[open]);
   
    return(
       createPortal(<dialog ref={dialog} className={`modal + ${className}`} open={open}>{children}</dialog>,document.getElementById("modal"))
    )
}


export default Modal;