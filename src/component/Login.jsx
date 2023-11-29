import axios from "axios"
import { useNavigate } from "react-router-dom";
import React from "react";
import "../index.css"

const Login=()=>{
    const navigate = useNavigate();
    // const submitHndler = async (event)=>{
    //     event.preventDefault();
    //     const fd = new FormData(event.target);
    //     const reqBody = Object.fromEntries(fd.entries());
    //     const res = await axios.post("http://localhost:3000/login",reqBody);
    //     if(res){   
    //         localStorage.setItem("token",res.data.token);          
    //         navigate("/home");
    //     }
    // }
    const [state, setState] = React.useState({
        name: "",
        password: ""
      });
      const handleChange = evt => {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
      };
    
      const handleOnSubmit = async(evt) => {
        evt.preventDefault();
        const reqBody = {
            name:state.name,
            password:state.password
        }
        const resp = await axios.post("http://localhost:3000/login",reqBody);
        if(resp){   
                 console.log(resp);
                  localStorage.setItem("token",resp.data.token);          
                  navigate("/home");
          }
      };
    return(
        // <form onSubmit={submitHndler}>
        //   <label htmlFor="name">Name</label><br />
        //   <input type="text" name="name"/>
        //   <label htmlFor="password">Password</label><br/>
        //    <input type="password" name="password"/>
        //    <button type="submit">Submit</button>
        // </form>
        <div className="form-container sign-in-container">
        <form onSubmit={handleOnSubmit}>
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#" className="social">
              <i className="fab fa-google-plus-g" />
            </a>
            <a href="#" className="social">
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
          <span>or use your account</span>
          <input
            type="name"
            placeholder="name"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
          <a href="#">Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>
    )
}


export default Login;