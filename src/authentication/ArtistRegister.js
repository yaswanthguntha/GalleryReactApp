import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import config from '../config';

export default function ArtistRegister() {

  const [artistregistrationdata, setArtistRegistrationData] = useState({
    fullname: '',
    gender: '',
    dateofbirth: '',
    email: '',
    contact: '',
    graduation: '',
    artistname: '',
    description: '',
    socialmedialinks: '',
    password: ''
  })

  const [confirm,setConfirm] = useState('');
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [passErr,setPassErr] = useState('');
  const navigate = useNavigate()

  const handleConfirm = (e) => {
    setConfirm(e.target.value);
  }

  const handleChange = (e) => {
    setArtistRegistrationData({...artistregistrationdata, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      const hasMinLength = artistregistrationdata.password.length >= 8;
      const hasUppercase = /[A-Z]/.test(artistregistrationdata.password);
      const hasLowercase = /[a-z]/.test(artistregistrationdata.password);
      const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':",./<>?|\\]/.test(artistregistrationdata.password);
      const hasDigit = /\d/.test(artistregistrationdata.password);
      const hasConfirm = artistregistrationdata.password === confirm;

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
      else {
      const response = await axios.post(`${config.url}/insertartist`,artistregistrationdata)
      if(response.status === 200)
      {
        setArtistRegistrationData({
          fullname: '',
          gender: '',
          dateofbirth: '',
          email: '',
          contact: '',
          graduation: '',
          artistname: '',
          description: '',
          socialmedialinks: '',
          password: ''
        })
        navigate("/artistlogin")
      }
      setMessage(response.data)
      setError('')
    }
    }
    catch(error)
    {
      setError(error.response.data)
      setMessage('')
    }
  }


  return (
    <div className="background">
        <div className="auth-logo">
          <Link style={{color:"#D6EDFF"}} to="/register">Back</Link>
        </div>
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-left">
              <h3 className="head">Artist Register</h3>
              <input className="input" type="text" placeholder="Enter Full Name" id="fullname" value={artistregistrationdata.fullname} onChange={handleChange} required /> <br/>
              <div className="label">
                <label style={{marginTop:"4%"}}>Gender</label>
                <select style={{margin:"0px"}} className="dob input" id="gender" value={artistregistrationdata.gender} onChange={handleChange} required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="label">
                <label style={{marginTop:"4%"}}>Birth Date</label>
                <input style={{margin:"0px",width:"52%"}} className="input" type="date" id="dateofbirth" value={artistregistrationdata.dateofbirth} onChange={handleChange} required/>
              </div>
              <input className="input" type="email" placeholder="Enter Email ID" id="email" value={artistregistrationdata.email} onChange={handleChange} required/> <br/>
              <input className="input" type="number" pattern="[6789][0-9]{9}" placeholder="Enter Contact no." id="contact" value={artistregistrationdata.contact} onChange={handleChange} required/> <br/>
              <div className="label">
                <label style={{marginTop:"4%"}}>Graduation</label>
                <select style={{margin:"0px"}} className="dob input" id="graduation" value={artistregistrationdata.graduation} onChange={handleChange} required>
                  <option value="">Select Here</option>
                  <option value="N/A">N/A</option>
                  <option value="B. Fine Arts">B. Fine Arts</option>
                  <option value="B. Arts">B. Arts</option>
                  <option value="M. Fine Arts">M. Fine Arts</option>
                  <option value="M. Arts">M. Arts</option>
                  <option value="others">Other</option>
                </select>
              </div>
            </div>
            <div className="form-right">
              <input className="input" type="text" defaultValue="N/A" placeholder="Enter Artist Name(if any)" id="artistname" value={artistregistrationdata.artistname} onChange={handleChange} /> <br/>
              <textarea className="area" placeholder="Brief your Biography" id="description" value={artistregistrationdata.description} onChange={handleChange} required/>
              <input className="input" type="text" placeholder="Social Media Links(if any)" id="socialmedialinks" value={artistregistrationdata.socialmedialinks} onChange={handleChange}/> <br/>
              <input className="input" type="password" placeholder="Create Password" id="password" value={artistregistrationdata.password} onChange={handleChange} required/> <br/>
              {
                passErr ? <i style={{color:"red"}}>{passErr}</i> : <i></i>
              }
              <input className="input" type="password" placeholder="Confirm Password" id="confirm" value={confirm} onChange={handleConfirm} required/> <br/>
              {
                message ? <i style={{color:'#D6EDFF'}}>{message}</i> : <i style={{color:'#D6EDFF'}}>{error}</i>
              }
              <button style={{marginBottom:"10px"}} className="btn" type="submit">Register</button>
            </div>
        </form>
    </div>
  )
}
