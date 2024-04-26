import React, { useState } from 'react'
import './auth.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from './../config';

export default function AdminLogin({ onAdminLogin }) {

    const [adminData, setAdminData] = useState({
        username: '',
        password: ''
      });
      const [message,setMessage] = useState("")
      const [error,setError] = useState("")
    
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        const { id, value } = e.target;
        setAdminData({ ...adminData, [id]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try 
        {
          const response = await axios.post(`${config.url}/checkadminlogin`, adminData);
          if (response.data!=null) 
          {
            onAdminLogin();
            localStorage.setItem('admin', JSON.stringify(response.data));
            navigate("/adminhome");
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
    <div className="admin-page">
      <form align="center" onSubmit={handleSubmit} >
        <div style={{height:"100%",width:"100%",display:"flex",flexWrap:"wrap",alignItems:"center"}} className="form-bg">
            <div className="admin-form">
                <h3 className="heading">Admin Login</h3> <br/>
                {
                  message ? <h4>{message}</h4> : <h4>{error}</h4>
                }
                <input onChange={handleChange} value={adminData.username} id="username" className='input' type="text" placeholder='Enter Username' required/> <br/>
                <input onChange={handleChange} value={adminData.password} id="password" className='input' type="password" placeholder='Enter Password' required/> <br/>
                <button type="submit" className="btn">Login</button>
            </div>
        </div>
      </form>
    </div>
  )
}