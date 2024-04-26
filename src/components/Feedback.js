import React, { useEffect, useState } from 'react'
import './components.css'
import axios from 'axios';
import config from '../config';

export default function Feedback() {

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

      const [feedbackForm, setFeedbackForm] = useState({
        role: '',
        email: '',
        feedback: ''
      });

      if(artistData) {
        feedbackForm.role = "artist";
        feedbackForm.email = artistData.email;
      }
      else if(customerData){
        feedbackForm.role = "customer";
        feedbackForm.email = customerData.email;
      }

      const [message, setMessage] = useState('')
      const [error, setError] = useState('')

      const handleChange = (e) => {
        setFeedbackForm({...feedbackForm, [e.target.id]: e.target.value})
      }

      const handleSubmit = async (e) => {
        e.preventDefault()
        try {

          const response = await axios.post(`${config.url}/feedback`,feedbackForm);

          if(response.status === 200)
          {
            setFeedbackForm({
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
    <div className='feedback'>
        <div className='refer'>Feedback</div>
        {
            message ? <i style={{color:'#00B3AC'}}>{message}</i> : <i style={{color:'#00B3AC'}}>{error}</i>
        }
        <form className='feed-form' onSubmit={handleSubmit}>
        <input id='email' className="cpi" type="email" placeholder="Your Email ID" value={feedbackForm.email} disabled required/> <br/>
        <p>How was your experience with us?</p>
        <textarea id='feedback' className="message" type="text" placeholder="Your Feedback" onChange={handleChange} value={feedbackForm.feedback} required/> <br/>
        <table>
          <tbody>
            <tr><td width="250px" align='center'><button className="bttn" type='submit' style={{marginBottom:"10px"}}>Submit</button></td></tr>
          </tbody>
        </table>
        </form>
    </div>
  )
}
