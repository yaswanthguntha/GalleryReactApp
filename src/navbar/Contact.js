import axios from 'axios';
import React, { useState } from 'react'
import config from './../config';

export default function Contact() 
{

  const [contactData,setContactData] = useState({
    role: '',
    name: '',
    email: '',
    message:''
  });

  contactData.role = "visitor";
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setContactData({...contactData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      const response = await axios.post(`${config.url}/contactus`,contactData);

      if(response.status === 200)
      {
        setContactData({
          name: '',
          email: '',
          message: ''
        })
      }
      setMessage(response.data)
      setError('')
    }
    catch(error)
    {
      setError(error.response.data)
      setMessage('')
    }
  }

  return (
    <div className="contact">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3 className="head">Contact Us</h3>
          {
            message ? <i style={{color:'#00B3AC'}}>{message}</i> : <i style={{color:'#00B3AC'}}>{error}</i>
          }
          <input id='name' value={contactData.name} onChange={handleChange} className="input" type="text" placeholder="Your Name" required/> <br/>
          <input id='email' value={contactData.email} onChange={handleChange} className="input" type="email" placeholder="Your Email ID" required/> <br/>
          <textarea id='message' value={contactData.message} onChange={handleChange} className="message" type="text" placeholder="Your Message" required/> <br/>
          <button className="btn" type='submit' style={{marginBottom:"10px"}}>Submit</button>
        </form>
    </div>
  )
}
