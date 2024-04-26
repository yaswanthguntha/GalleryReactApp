import React, { useEffect, useState } from 'react'
import { Routes,Route,Link,useNavigate } from 'react-router-dom'
import AdminHome from './AdminHome';
import CustomerDetails from './CustomerDetails';
import ArtistDetails from './ArtistDetails';
import ChangePassword from '../components/ChangePassword';
import ArtworkDetails from './ArtworkDetails';
import QueryDetails from './QueryDetails';
import FeedbackDetails from './FeedbackDetails';

export default function AdminNavBar() 
{
    const navigate = useNavigate()

    const [adminData, setAdminData] = useState("");

    useEffect(() => {
        const storedAdminData = localStorage.getItem('admin');
        if (storedAdminData) {
        const parsedAdminData = JSON.parse(storedAdminData);
        setAdminData(parsedAdminData)
        }
    }, []);

    const handleLogout = () => {
      localStorage.removeItem('isAdminLoggedIn');
      localStorage.removeItem('admin');
      navigate('/adminlogin');
      window.location.reload()
    };

  return (
    <div>
        <nav>
            <div className="logo">
                <img src="./logo.png" alt="logo"></img>
                <span className="logo-name">ART ZONE</span>
            </div>
            <div className="nav-block1">
                <Link to="/adminhome">Home</Link>
                <Link onClick={handleLogout}>Logout</Link>
            </div>
            <div className="profile" style={{display:"flex",flexDirection:"row"}}>
                <span style={{margin:"15px",fontSize:"20px",color:"#00A09A"}} >{adminData.username}</span>
                <img style={{width:"50px"}} src="./admin.png" alt="profile"/>
                <div className='profile-content'>
                <Link to="/changepassword">ChangePassword</Link>
                </div>
            </div>
        </nav>

        <Routes>
            <Route path="/adminhome" element={<AdminHome/>} exact/>
            <Route path="/viewcustomers" element={<CustomerDetails/>} exact/> 
            <Route path="/viewartists" element={<ArtistDetails/>} exact/> 
            <Route path="/viewartworks" element={<ArtworkDetails/>} exact/>
            <Route path="/viewqueries" element={<QueryDetails/>} exact/>             
            <Route path="/viewfeedbacks" element={<FeedbackDetails/>} exact/> 
            <Route path="/changepassword" element={<ChangePassword/>} exact/> 
        </Routes>
    </div>
  )
}
