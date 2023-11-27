import axios from "axios";

const axiosInst = ()=>{
    const token = localStorage.getItem("token");
   return axios.create({
    baseURL:"http://localhost:3000",
    headers:{
    'Content-Type': 'application/json',
    "Authorization":"bearer "+ token
    }
   })
}


export default axiosInst;