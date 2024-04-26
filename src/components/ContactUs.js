import React, { useEffect, useState } from 'react'
import './components.css'
import axios from 'axios';
import config from '../config';

export default function ContactUs() {

    const [artistData, setArtistData] = useState("");
    const [customerData, setCustomerData] = useState("");

    useEffect(() => {

        const storedArtistData = localStorage.getItem('artist');
        if (storedArtistData) {
        const parsedArtistData = JSON.parse(storedArtistData);
        setArtistData(parsedArtistData)
        } //ARTIST

        const storedCustomerData = localStorage.getItem('customer');
        if (storedCustomerData) {
        const parsedCustomerData = JSON.parse(storedCustomerData);
        setCustomerData(parsedCustomerData)
        } //CUSTOMER

      }, []);

      const [contactData,setContactData] = useState({
        role: '',
        name: '',
        email: '',
        message:''
      });

      if(artistData) {
        contactData.role = "artist";
        contactData.email = artistData.email;
      }
      else if(customerData){
        contactData.role = "customer";
        contactData.email = customerData.email;
      }

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
    <div>
        <div className='refer'>Contact us</div>
        {
            message ? <i style={{color:'#00B3AC'}}>{message}</i> : <i style={{color:'#00B3AC'}}>{error}</i>
        }
        <form className="contact-us" onSubmit={handleSubmit}>
          <input id='name' className="cpi" type="text" placeholder="Your Name" value={contactData.name} onChange={handleChange} required/> <br/>
          <input id='email' className="cpi" type="email" placeholder="Your Email ID" value={contactData.email} disabled required/> <br/>
          <textarea id='message' className="message" type="text" placeholder="Your Message" value={contactData.message} onChange={handleChange} required/> <br/>
          <table>
            <tr><td width="250px" align='center'><button className="bttn" style={{marginBottom:"10px"}}>Submit</button></td></tr>
          </table>
        </form>
    </div>
  )
}
