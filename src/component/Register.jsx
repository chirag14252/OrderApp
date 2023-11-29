import axios from "axios"

import React from "react";

const Register = ()=>{
  const [state, setState] = React.useState({
    name: "",
    email: "",
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
      name: state.name,
      email:state.email,
      password:state.password
    }
    const resp = await axios.post("http://localhost:3000/register",reqBody);
    alert(resp.data.message);
  };
  
//      const submitHndler = async (e)=>{
// e.preventDefault();
//  const fd = new FormData(e.target);
//  const reqBody = Object.fromEntries(fd.entries());
//  const resp = await axios.post("http://localhost:3000/register",reqBody);
//  console.log(resp);
// }
 

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
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
        <span>or use your email for registration</span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
    //  <form onSubmit={submitHndler}>
    //    <label htmlFor="name">Name:</label>
    //    <input type="text" id="name" name="name"/>
    //    <label htmlFor="email">Email:</label>
    //    <input type="email" id="email" name="email"/>
    //    <label htmlFor="password">Password:</label>
    //    <input type="text" id="password" name="password"/>
    //    <button type="submit">Submit</button>
    //   </form>
  );

}

export default Register;