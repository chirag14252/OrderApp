import MainOrderPage from "./component/MainOrderPage";
import Register from "./component/Register.jsx";
import Login from "./component/Login.jsx";
import {Routes,Route, Navigate } from "react-router-dom"
function App() {
  return (
    <Routes>
       <Route path = "/MainOrder" Component={
        MainOrderPage
        }/>
       <Route path="*" Component={()=>{localStorage.getItem("token")?Navigate({to:"/MainOrder"}):<Login/>}}/>
       <Route path="/register" Component={Register}/>
    </Routes>
  );
}

export default App;
