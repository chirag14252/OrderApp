
import { createPortal } from "react-dom";
import { useContext, useEffect, useRef } from "react";

const Modal = ({children,open,onClose,className})=>{
  
   const dialog = useRef();
   useEffect(()=>{
   // open is playing a very critical role in opening the modal cart
   
   if(open){
   dialog.current.showModal();
   }
   return()=>dialog.current?.close();
   },[open]);
   
    return(
       createPortal(<dialog ref={dialog} className={`modal + ${className}`} onClose={onClose}>{children}</dialog>,document.getElementById("modal"))
    )
}


export default Modal;