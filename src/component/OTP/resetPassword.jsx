import { entries } from "lodash";
import React from "react";
import axios from "axios"
import { useLocation } from "react-router-dom";

export default function Reset() {
  const location = useLocation();

  const containerStyle = {
    backgroundColor: "#f7f7f7",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    minHeight: "100vh",
  };

  const formContainerStyle = {
    width: "30%",
    padding: "24px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const headingStyle = {
    marginBottom: "8px",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
  };

  const inputStyle = {
    backgroundColor: "#f9f9f9",
    border: "1px solid #ccc",
    color: "#333",
    fontSize: "14px",
    borderRadius: "4px",
    padding: "10px",
    width: "100%",
    marginBottom: "16px",
  };

  const checkboxContainerStyle = {
    display: "flex",
    alignItems: "center",
  };

  const checkboxStyle = {
    width: "20px",
    height: "20px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#f9f9f9",
    marginRight: "8px",
  };

  const buttonStyle = {
    width: "100%",
    color: "#fff",
    backgroundColor: "#007bff",
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
  };

  const formHndler = (e)=>{
  e.preventDefault();
  const ObjectData = new FormData(e.target);
  const formData = Object.fromEntries(ObjectData.entries());
  const password = formData.password;
 
  const email = location.state.email;
 console.log(formData);
    if(formData.password === formData.confirmpassword){
       axios.patch("http://localhost:3000/forgot-password/reset",{email,password}).then((res)=>{
       console.log(res);
       })

    }
  }
  return (
    <div style={containerStyle}>
      <section style={formContainerStyle}>
        <div>
          <h2 style={headingStyle}>Change Password</h2>
          <form onSubmit={formHndler}>
            <div>
             
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter New Password"
                style={inputStyle}
                required
              />
            </div>
            <div>
             
              <input
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                placeholder="Confirm Password"
                style={inputStyle}
                required
              />
            </div>
            <button type="submit" style={buttonStyle}>
            Reset password
            </button>
          </form>
         
        </div>
      </section>
    </div>
  );
}
