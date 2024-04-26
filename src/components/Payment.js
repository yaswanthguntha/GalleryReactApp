import React, { useEffect, useState } from 'react';
import Razorpay from 'razorpay-checkout';
import { useNavigate } from 'react-router-dom';
import './components.css'
import axios from 'axios';
import config from '../config';

const Payment = () => {
    const [customer, setCustomer] = useState("");
    const [art, setArt] = useState('');
    const [address,setaddress] = useState('');
    const navigate = useNavigate();
    const [order,setOrder] = useState({
        artwork:'',
        user:'',
        address:''
    })

    useEffect(() => {
    
            const storedCustomerData = localStorage.getItem('customer');
            if (storedCustomerData) {
            const parsedCustomerData = JSON.parse(storedCustomerData);
            setCustomer(parsedCustomerData)
            } //CUSTOMER

            const storedArtData = localStorage.getItem('artwork');
            if (storedArtData) {
            const parsedArtData = JSON.parse(storedArtData);
            setArt(parsedArtData);
            } //ARTWORK
      }, [])

    const handlePayment = () => {
            const options = {
                key: "rzp_test_rt02HZsuR5f69V",
                amount: art.price*100,
                currency: "INR",
                name: "Gallery App",
                handler: function(response) {
                    handleSubmit();
                    alert(`Payment of Rs.${art.price}/- is Successful and order placed`); 
                    
                },
                prefill: {
                    name: customer.fullname,
                    email: customer.email,
                    contact: customer.contact
                },
                notes: {
                    address: "Razorpay Corporate office"
                },
                theme: {
                    color: "#00B3AC"
                }
            };
            const pay = new window.Razorpay(options);
            pay.open();
        
    };

    const handlechange = (e) => {
        setaddress(e.target.value)
    }

    const handleSubmit = async (e) => {
        try {

          const response = await axios.post(`${config.url}/placeorder`,{...order,artwork:art,user:customer});

          if(response.status === 200)
          {
            return;
          }
        }
        catch(error)
        {

        }
    }
    
    const handlecancel = () => {
        navigate('/displayartwork')
    }

    return (
        <div>
            <div className='confirmation'>
            <div className='image' align="center" >
                <img style={{width:"300px", height:"auto"}} src={`${config.url}/artimage/${art.file}`} alt="art_image" />
            </div> 
            <div>
                <div className="artname">
                    <span style={{marginLeft:"3%"}}>{art.title}</span> 
                </div>
                <textarea style={{marginLeft:"25px",width:"400px"}} id='address' className="ai" type="text" placeholder="Your Address" onChange={handlechange} value={address} required/> <br/>
                <div className="artname">
                    <span style={{marginLeft:"3%"}}>Price : {art.price}</span> 
                </div>
                <button className='pay' onClick={handlePayment}>Pay Now</button>
                <button className='cancel' onClick={handlecancel}>Cancel</button>
            </div>
            </div>
        </div>
    );
};

export default Payment;