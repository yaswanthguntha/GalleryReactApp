import React, { useEffect, useState } from 'react'
import './components.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from './../config';

export default function ChangePassword() {

  const [adminData, setAdminData] = useState("");
  const [artistData, setArtistData] = useState("");
  const [customerData, setCustomerData] = useState("");

  useEffect(() => {

    const storedAdminData = localStorage.getItem('admin');
      if (storedAdminData) {
        const parsedAdminData = JSON.parse(storedAdminData);
        setAdminData(parsedAdminData);
      }
    
    const storedArtistData = localStorage.getItem('artist');
    if (storedArtistData) {
      const parsedArtistData = JSON.parse(storedArtistData);
      setArtistData(parsedArtistData);
    }
    
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData);
    }
    
  }, []);

  const [changepassdata, setChangepassData] = useState({
    oldpassword: '',
    newpassword: ''
  });
  const [confirm,setConfirm] = useState('');
  const [error, setError] = useState('');
  const [passErr,setPassErr] = useState('');
  const navigate = useNavigate()

  const handleConfirm = (e) => {
      setConfirm(e.target.value);
  }

  const handleChange = (e) =>
  {
    setChangepassData({...changepassdata, [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try {

      const hasMinLength = changepassdata.newpassword.length >= 8;
      const hasUppercase = /[A-Z]/.test(changepassdata.newpassword);
      const hasLowercase = /[a-z]/.test(changepassdata.newpassword);
      const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':",./<>?|\\]/.test(changepassdata.newpassword);
      const hasDigit = /\d/.test(changepassdata.newpassword);
      const hasConfirm = changepassdata.newpassword === confirm;

      const errorMessages = [];
      if (!hasMinLength) {
        errorMessages.push('Password must be at least 8 characters long.');
      }
      if (!hasUppercase) {
        errorMessages.push('Password must contain at least one uppercase letter.');
      }
      if (!hasLowercase) {
        errorMessages.push('Password must contain at least one lowercase letter.');
      }
      if (!hasSymbol) {
        errorMessages.push('Password must contain at least one symbol.');
      }
      if (!hasDigit) {
        errorMessages.push('Password must contain at least one digit.');
      }
      if(!hasConfirm) {
        errorMessages.push("Confirm password and password didn't match!");
      }
      if(errorMessages.length!==0) {
      setPassErr(errorMessages)
      return;
      }

      let endpoint = "";
      let key = "";
      let identifier = "";

      if(adminData){
        endpoint = "changeadminpwd";
        key = "username";
        identifier = adminData.username;
      }
      else if(artistData){
        endpoint = "changeartistpwd";
        key = "email";
        identifier = artistData.email;
      }
      else if(customerData){
        endpoint = "changecustomerpwd";
        key = "email";
        identifier = customerData.email;
      }
      else {
        endpoint = "";
        key = "";
        identifier = "";
      }
      
      const response = await axios.put(`${config.url}/${endpoint}`,{...changepassdata,[key]:identifier});

      if (response.status === 200) 
      {
        setChangepassData({
          oldpassword: '',
          newpassword: ''
        });
        setConfirm('');
        navigate("");
      }
      setError(''); 
    } 
    catch(error) 
    {
      setError(error.response.data);
    }
  };

  
  return (
    <div>
        <div className='refer'>Change Password</div>
        {
            passErr ? <i style={{color:"red"}}>{passErr}</i> : <i>{error}</i>
        }
        <div style={{marginTop:"40px"}}>
          <form onSubmit={handleSubmit}>
            <input id='oldpassword' value={changepassdata.oldpassword} onChange={handleChange} style={{marginBottom:"30px"}} className="cpi" type="password" placeholder="Enter old Password" required/> <br/>
            <input id='newpassword' value={changepassdata.newpassword} onChange={handleChange} className="cpi" type="password" placeholder="Create new Password" required/> <br/>
            <input id='confirm' value={confirm} onChange={handleConfirm} className="cpi" type="password" placeholder="Confirm new Password" required/> <br/>
            <table>
            <tbody>
            <tr><td width="250px" align='center'><button className="bttn" type='submit' style={{marginBottom:"10px"}}>Submit</button></td></tr>
            </tbody>
          </table>
          </form>
        </div>
    </div>
  )
}