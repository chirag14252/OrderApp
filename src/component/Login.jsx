import axios from "axios"
import { useNavigate } from "react-router-dom";



const Login=()=>{
    const navigate = useNavigate();
    const submitHndler = async (event)=>{
        event.preventDefault();
        const fd = new FormData(event.target);
        const reqBody = Object.fromEntries(fd.entries());
        const res = await axios.post("http://localhost:3000/login",reqBody);
        if(res){
           
            localStorage.setItem("token",res.data.token);
            
            navigate("/home");
        }
    }
    return(
        <form onSubmit={submitHndler}>
          <label htmlFor="name">Name</label><br />
          <input type="text" name="name"/>
          <label htmlFor="password">Password</label><br/>
           <input type="password" name="password"/>
           <button type="submit">Submit</button>
        </form>

    )
}


export default Login;