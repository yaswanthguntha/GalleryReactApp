import React, { useEffect, useState } from 'react'
import {Routes,Route,Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import PublishArt from './PublishArt';
import ArtistHome from './ArtistHome';
import MyArtworks from './MyArtworks';
import ShowNavBar from './../navbar/ShowNavBar';
import DisplayArtwork from '../navbar/DisplayArtwork';
import ArtistProfile from './ArtistProfile';

export default function ArtistNavBar() {

  const navigate = useNavigate();

  const [artistData, setArtistData] = useState("");

  useEffect(() => {
    const storedArtistData = localStorage.getItem('artist');
    if (storedArtistData) {
      const parsedArtistData = JSON.parse(storedArtistData);
      setArtistData(parsedArtistData)
    }
  }, []);

  const openArtistProfile = () => {
    navigate('/artistprofile')
  }

  const handleClick = () => {
    navigate('/artisthome')
    window.location.reload()
  }

  const handleLogout = () => {
    localStorage.removeItem('isArtistLoggedIn');
    localStorage.removeItem('artist');
    navigate('/artistlogin');
    window.location.reload()
  };

  return (
    <div>
        <ShowNavBar>
        <nav>
            <div className="logo">
                <img src="./logo.png" alt="logo"></img>
                <span className="logo-name">ART ZONE</span>
            </div>
            <div className="nav-block1">
                <Link onClick={handleClick}>Home</Link>
                <Link to="/myartwork">My Artwork</Link>
                <Link to="/publishart">Publish Art</Link>
                <Link onClick={handleLogout}>Logout</Link>
            </div>
            <div onClick={openArtistProfile} className="profile" style={{display:"flex",flexDirection:"row",cursor:"pointer"}}>
                <span style={{margin:"15px",fontSize:"20px",color:"#00A09A"}} >{artistData.fullname}</span>
                <img style={{width:"50px"}} src="./profile.png" alt="profile"/>
            </div>
        </nav>
        </ShowNavBar>

        <Routes>
            <Route path="/artisthome" element={<ArtistHome/>} exact/>
            <Route path="/myartwork" element={<MyArtworks/>} exact/>
            <Route path="/publishart" element={<PublishArt/>} exact/>
            <Route path="/displayartwork" element={<DisplayArtwork/>} exact/>
            <Route path="/artistprofile" element={<ArtistProfile/>} exact/>
        </Routes>
    </div>
  )
}
