import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function EnterEmail() {
  const [email,setEmail] = useState();
  const navigate = useNavigate();
  const onClickHndler = () =>{
    const data = axios.post("http://localhost:3000/forgot-password/sendOTPMail",{email:email});
    if(data){
      navigate("/otp",{state:{email:email}});  
    }
    else{
       alert("email not sent");
    }
    console.log(email);
  }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh", backgroundColor: "#f0f0f0" }}>
        <div style={{ backgroundColor: "#fff", padding: "1rem", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", margin: "auto", maxWidth: "28rem", borderRadius: "1rem" }}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div style={{ fontWeight: "bold", fontSize: "1.5rem" ,fontfamily: 'san-serif'}}>Enter your email</div>
            <div style={{ display: "flex", flexDirection: "row", fontSize: "0.875rem", color: "#808080" }}>
              <p style={{fontfamily: 'san-serif'}}>We have sent a code to your email {"your email"}</p>
            </div>
          </div>
  
          <div>
           
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <input type="email" style={{ padding:"10px",borderradius:"10px"}}placeholder="Type your email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
              </div>
            
                <button style={{marginTop:"10px",padding:"5px"}}onClick={onClickHndler}>Submit</button>
          </div>
        </div>
      </div>
    );
}
