import MainOrderPage from "./component/MainOrderPage";
import Register from "./component/Register.jsx";
import Login from "./component/Login.jsx";
import {Routes,Route, Navigate } from "react-router-dom"
function App() {
  return (
    <Routes>
       <Route path="/home" Component={()=>{
        const token = localStorage.getItem("token");
        return token?<MainOrderPage/>:Navigate({to:"/login"});
       }}/>
       <Route path="/login" Component={()=>{
        const token = localStorage.getItem("token");
        return token?Navigate({to:"/login"}):<Login/>
       }}/>
       <Route path="/register" element={<Register/>}/>
    </Routes>
  );
}

export default App;
