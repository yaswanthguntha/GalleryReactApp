import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './auth.css'
import axios from 'axios';
import config from '../config';

export default function CustomerLogin({ onCustomerLogin }) {

  const [customerData, setCustomerData] = useState({
    email: '',
    password: ''
  });
  const [message,setMessage] = useState("")
  const [error,setError] = useState("")

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCustomerData({ ...customerData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
      const response = await axios.post(`${config.url}/checkcustomerlogin`, customerData);
      if (response.data!=null) 
      {
        onCustomerLogin();
        localStorage.setItem('customer', JSON.stringify(response.data));
        navigate("/customerhome");
      } 
      else 
      {
        setMessage("Login Failed")
        setError("")
      }
    } 
    catch (error) 
    {
      setMessage("")
      setError(error.message)
    }
  };

  return (
    <div className="auth-page">
      <div className="left">
        <div className="auth-logo">
        <Link to="/"><img src="./logo.png" alt="logo"></img></Link>
        </div>
        <form align="center" className="login-form" onSubmit={handleSubmit}>
          <p className="heading">Customer Login</p>
          {
            message ? <h4 style={{margin:"0px 50px"}}>{message}</h4> : <h4>{error}</h4>
          }
          <div className="shift-login">
            <Link to="/customerlogin">Customer</Link>
            <Link to="/artistlogin">Artist</Link>
            <div className="animation start-customer"></div>
          </div>
          <input id="email" value={customerData.email} onChange={handleChange} className="input" type="email" placeholder="Enter Email ID" required/> <br/>
          <input id="password" value={customerData.password} onChange={handleChange} style={{marginBottom:"0px"}} className="input" type="password" placeholder="Enter Password" required/> <br/>
          <Link style={{marginBottom:"20px"}}  className="forget" to="/forgetpassword">Forget Password?</Link>
          <button type="submit" className="btn">Login</button>
        </form>
        <p className="new">New User? <Link to="/register">Create account</Link></p>
      </div>
      <div className="right">
        <img className="welimg" src="./loginpageimg.jpg" alt="image_here" /> <br/>
        <p className="welcome">Welcome</p>
        <p className="quote">The soul should always stand ajar,<br/> ready to welcome the ecstatic experience.</p>
      </div>
    </div>
  )
}