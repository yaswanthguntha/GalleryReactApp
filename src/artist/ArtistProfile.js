import React, { useEffect, useState } from 'react'
import '../customer/customer.css'
import { Link } from 'react-router-dom';
import MyAccount from '../components/MyAccount';
import ChangePassword from '../components/ChangePassword';
import ContactUs from '../components/ContactUs';
import Feedback from '../components/Feedback';
import EditArtistProfile from './EditArtistProfile';

export default function ArtistProfile() 
{
  const [artistData, setArtistData] = useState("");

  useEffect(() => {
    const storedArtistData = localStorage.getItem('artist');
    if (storedArtistData) {
      const parsedArtistData = JSON.parse(storedArtistData);
      setArtistData(parsedArtistData)
    }
  }, []);

  const [render,setRender] = useState(<MyAccount/>);

  const onMyAccount = () => {
    setRender(<MyAccount/>)
  } 

  const onEditProfile = () => {
    setRender(<EditArtistProfile/>)
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

  return (
    <div className="cprofile">
        <div className="cheader">
            <div className="dp"><img className="dpimg" src="" alt=''/></div>
            <div className="cname"><span style={{marginLeft:"3%",color:"#00B3AC",fontWeight:"700",fontSize:"28px",fontFamily:"Days One"}}>{artistData.fullname}</span></div>
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
                    <Link to="/artisthome" className="back" style={{textDecoration:"none",marginLeft:"20px"}}>
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
