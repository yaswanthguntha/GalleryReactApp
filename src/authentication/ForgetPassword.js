import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../config';

export default function ForgetPassword() {

  const [message,setMessage] = useState('');
  const [email,setemail] = useState('');
  const [status,setstatus] = useState('');
  const [OTP,setOTP] = useState('');
  const [userotp, setuserotp] = useState('');

  const handlemail = (e) => {
    setemail(e.target.value)
  }

  const handleotp = (e) => {
    setuserotp(e.target.value)
  }

  const handlesend = async (e) => {
    try {
      const response = await axios.post(`${config.url}/otpsender`,{email});
      if(response.status === 200) {
        setstatus("sentotp");
        setOTP(response.data);
        setMessage("OTP sent Succesfully");
      }
    }
    catch (error) {

    }
  }  

  const handleverify = () => {
    if(OTP === userotp) {
      setstatus("verified")
    }
  }

  return (
    <div className="auth-page">
        <div className="left">
            <div className="auth-logo">
            <Link to="/customerlogin">Back</Link>
            </div>
            <form align="center" className="forget-form">
                <p className="heading">Change Password</p>
                <i>{message}</i> {/* Display message unconditionally */}

          
                <input
                  id="mail"
                  value={email}
                  onChange={handlemail}
                  className="input"
                  type="email"
                  placeholder="Enter Email ID"
                  required
                />
                <br />
                <button onClick={handlesend} className="btn">
                  {status === "sentotp" ? "Resend OTP" : "Send OTP"}
                </button>

              {status === "sentotp" && (
                <div>
                  <input
                    value={userotp}
                    onChange={handleotp}
                    style={{ margin: "0px" }}
                    className="input"
                    type="number"
                    placeholder="Enter OTP"
                    required
                  />
                  <i style={{ marginBottom: "20px", fontSize: "12px", marginRight: "20px" }}>
                    A 6-digit OTP has sent to your mail
                  </i>
                  <button onClick={handleverify} className="btn">
                    Verify OTP
                  </button>
                </div>
              )}

              {status === "verified" && (
                <div>
                  <input className="input" type="password" placeholder="Enter Password" required />
                  <br />
                  <input className="input" type="password" placeholder="Confirm Password" required />
                  <br />
                  <button className="btn">Change Password</button>
                </div>
              )}
                
                
                
            </form>
        </div>
        <div className="right">
            <img className="welimg" src="./forget.png" alt="image_here"/> <br/><br/>
            <p style={{fontSize:"17px"}} className="welcome">Try to remember your password next time</p>
        </div>
    </div>
  )
}
