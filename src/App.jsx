import StartPage from "./component/StartPage";
import MainOrderPage from "./component/MainOrderPage.JSX"

import {Routes,Route, Navigate } from "react-router-dom"
import otp from "./component/OTP/otp";
import EnterEmail from "./component/OTP/enterEmail";

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
         return token?<MainOrderPage/>:Navigate({to:"/"})
       }}/> 
       <Route path = "/otp" Component={otp}/>
       <Route path = "/enterEmail" Component={EnterEmail}/>
    </Routes>
  );
}



export default App;
