import React, { useEffect, useState } from 'react'
import '../components/components.css'
import axios from 'axios';
import config from './../config';

export default function EditCustomerProfile() {

    const [customerData, setCustomerData] = useState({
        fullname: '',
        gender: '',
        dateofbirth: '',
        email: '',
        contact: ''
    });

    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [initialCustomerData, setInitialCustomerData] = useState("");

    useEffect(() => {
        const storedCustomerData = localStorage.getItem('customer');
        if (storedCustomerData) {
        const parsedCustomerData = JSON.parse(storedCustomerData);
        setCustomerData(parsedCustomerData)
        setInitialCustomerData(parsedCustomerData)
        } //CUSTOMER
      }, []);

    const handleChange = (e) => {
        setCustomerData({...customerData, [e.target.id]: e.target.value})
    }

    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        try 
        {
        const updatedData = {};
        for (const key in customerData) {
            if (customerData[key] !== initialCustomerData[key] && initialCustomerData[key] !== '') {
            updatedData[key] = customerData[key]; 
            }
        }
        if (Object.keys(updatedData).length !== 0) {
            // There are changes
            updatedData.email = customerData.email;
            const response = await axios.put(`${config.url}/updatecustomerprofile`, updatedData);
            setMessage(response.data);
            setError('');
            const res = await axios.get(`${config.url}/customerprofile/${customerData.email}`, updatedData)
            localStorage.setItem("customer",JSON.stringify(res.data))
        } else {
            // No changes
            setMessage("No Changes in your Profile");
            setError("");
        }
        } 
        catch (error) {
        setError(error.response.data);
        setMessage('');
        }
    };

  return (
    <div className='edit'>
        <div className='refer'>Edit Profile</div>
        {
            message ? <i style={{color:'#00B3AC'}}>{message}</i> : <i style={{color:'#00B3AC'}}>{error}</i>
        }
        <form onSubmit={handleSubmit}>
        <table>
            <tr>
                <td><label>Full Name</label></td>
                <td><input id='fullname' onChange={handleChange} className='epi' type='text' placeholder='Enter Full Name' value={customerData.fullname} required/></td>

                <td><label>Date of Birth</label></td>
                <td><input id='dateofbirth' onChange={handleChange} className='epi' type='date' value={customerData.dateofbirth} required/></td>
            </tr>
            <tr>
                <td><label>Email</label></td>
                <td><input id='email' className='epi' type='email' value={customerData.email} disabled required/></td>

                <td><label>Gender</label></td>
                <td><input id='gender' className='epi' type='text' value={customerData.gender} disabled required/></td>
            </tr>
            <tr>
                <td><label>Contact</label></td>
                <td><input id='contact' onChange={handleChange} className='epi' type='number' placeholder='Enter Contact' value={customerData.contact} required/></td>

                <td colSpan="2" align='center'><button className='bttn' type='submit'>Update</button></td>
            </tr>
        </table>
        </form>
    </div>
  )
}
