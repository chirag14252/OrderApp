import StartPage from "./component/StartPage";
import MainOrderPage from "./component/MainOrderPage.JSX"

import {Routes,Route, Navigate } from "react-router-dom"

function App() {
  return (
    <Routes>
       {/* <Route path="/home" Component={()=>{
        const token = localStorage.getItem("token");
        return token?<MainOrderPage/>:Navigate({to:"/login"});
       }}/>
       <Route path="/login" Component={()=>{
        const token = localStorage.getItem("token");
        return token?Navigate({to:"/login"}):<Login/>
       }}/> */}
       <Route path="/" Component={()=>{
        const token = localStorage.getItem("token");
        return token?Navigate({to:"/home"}):<StartPage/>
       }}/>
       <Route path="/home" Component={()=>{
         const token = localStorage.getItem("token");
         return token?<MainOrderPage/>:Navigate({to:"/startPage"})
       }}/> 
    </Routes>
  );
}

export default App;
