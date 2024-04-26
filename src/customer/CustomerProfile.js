import React, { useEffect, useState } from 'react'
import './customer.css'
import { Link, useNavigate } from 'react-router-dom';
import MyAccount from '../components/MyAccount';
import ChangePassword from '../components/ChangePassword';
import ContactUs from '../components/ContactUs';
import Feedback from '../components/Feedback';
import EditCustomerProfile from './EditCustomerProfile';

export default function CustomerProfile() 
{
  const [customerData, setCustomerData] = useState("");

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData)
    }
  }, []);

  const navigate = useNavigate();

  const [render,setRender] = useState(<MyAccount/>);

  const onMyAccount = () => {
    setRender(<MyAccount/>)
  } 

  const onEditProfile = () => {
    setRender(<EditCustomerProfile/>)
  }

  const onChangePassword = () => {
    setRender(<ChangePassword/>)
  } 

  const onContact = () => {
    setRender(<ContactUs/>)
  }

  const onFeedback = () => {
    setRender(<Feedback/>)
  }

  const handleClick = () => {
    navigate('/customerhome')
    window.location.reload()
  }

  return (
    <div className="cprofile">
        <div className="cheader">
            <div className="dp"><img className="dpimg" src="" alt=''/></div>
            <div className="cname"><span style={{marginLeft:"3%",color:"#00B3AC",fontWeight:"700",fontSize:"28px",fontFamily:"Days One"}}>{customerData.fullname}</span></div>
        </div>
        <div className="profile-body">
            <div className="profile-nav">
                <div className='span'>
                    <span onClick={onMyAccount} className='links'>My Account</span>
                    <span onClick={onEditProfile} className='links'>Edit Profile</span>
                    <span onClick={onChangePassword} className='links'>Change Password</span>
                    <span onClick={onContact} className='links'>Contact Us</span>
                    <span onClick={onFeedback} className='links'>Feedback</span>
                </div>
                <div>
                    <Link onClick={handleClick} className="back" style={{textDecoration:"none",marginLeft:"20px"}}>
                        <img style={{width:"25px"}} src="./backarrow.png" alt="back" />
                        <span style={{color:"#00A09A",textAlign:"center"}}>&nbsp;Back to home</span>
                    </Link>
                </div>
            </div>
            <div className='components'>
                {render}
            </div>
        </div>
    </div>
  )
}
