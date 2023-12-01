import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
export default function () {
  const [timerCount, setTimer] = React.useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);
  const location = useLocation();
  function resendOTP() {
    const email = location.state.email;
    const data = axios.post("http://localhost:3000/forgot-password/sendOTPMail",{email:email});
    if(data){
      console.log("email has been sent");
    }
    else{
      console.log("error");
    }
  }

  function verfiyOTP() {
    // Add your logic for verifying OTP
    return;
  }

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); // each count lasts for a second
    // cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh", backgroundColor: "#f0f0f0" }}>
      <div style={{ backgroundColor: "#fff", padding: "1rem", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", margin: "auto", maxWidth: "28rem", borderRadius: "1rem" }}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ fontWeight: "bold", fontSize: "1.5rem" ,fontfamily: 'san-serif'}}>Email Verification</div>
          <div style={{ display: "flex", flexDirection: "row", fontSize: "0.875rem", color: "#808080" }}>
            <p style={{fontfamily: 'san-serif'}}>We have sent a code to your email {"your email"}</p>
          </div>
        </div>

        <div>
          <form>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "auto", maxWidth: "20rem" ,gap:'10px'}}>
                {Array.from({ length: 4 }, (_, index) => (
                  <div key={index} style={{ width: "4rem", height: "4rem" }}>
                    <input
                      maxLength="1"
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        padding: "0.5rem",
                        outline: "none",
                        borderRadius: "0.5rem",
                        border: "1px solid #ccc",
                        fontSize: "1.125rem",
                        backgroundColor: "#fff",
                        focus: { backgroundColor: "#f0f0f0", ring: "1px solid #007bff" },
                      }}
                      type="text"
                      name=""
                      id=""
                      onChange={(e) => ""}
                    ></input>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <a
                    onClick={verfiyOTP}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      cursor: "pointer",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      border: "none",
                      borderRadius: "0.5rem",
                      outline: "none",
                      padding: "1.25rem",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      fontSize: "0.875rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    Verify Account
                  </a>
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: "500", color: "#808080" }}>
                  <p>Didn't receive code?</p>{" "}
                  <a
                    style={{
                      color: disable ? "gray" : "blue",
                      cursor: disable ? "none" : "pointer",
                      textDecorationLine: disable ? "none" : "underline",
                    }}
                    onClick={resendOTP}
                  >
                    {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}