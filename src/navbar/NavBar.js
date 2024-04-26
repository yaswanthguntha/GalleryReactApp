import React from 'react'
import './navbar.css'
import {Routes,Route,Link} from 'react-router-dom'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import CustomerLogin from './../authentication/CustomerLogin'
import ArtistLogin from './../authentication/ArtistLogin'
import Register from './../authentication/Register'
import ForgetPassword from '../authentication/ForgetPassword'
import ArtistRegister from '../authentication/ArtistRegister'
import ShowNavBar from './ShowNavBar'
import Explore from './Explore';
import AdminLogin from '../authentication/AdminLogin'
import DisplayArtwork from './DisplayArtwork'


export default function NavBar({ onAdminLogin, onArtistLogin, onCustomerLogin }) 
{
  return (
    <div>

        <ShowNavBar>
        <nav>
            <div className="logo">
                <img src="./logo.png" alt="logo"></img>
                <span className="logo-name">ART ZONE</span>
            </div>
            <div className="nav-block1">
                <Link to="/">Home</Link>
                <Link to="/explore">Explore</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </div>
            <div className="nav-button">
                <div className="login-button">
                    <Link to="/customerlogin">Login</Link>
                </div>
                <div className="register-button">
                    <Link to="/register">Register</Link>
                </div>
            </div>
        </nav>
        </ShowNavBar>

        <Routes>
            <Route path="/" element={<Home/>} exact/>
            <Route path="/explore" element={<Explore/>} exact/>
            <Route path="/about" element={<About/>} exact/>
            <Route path="/contact" element={<Contact/>} exact/>
            <Route path="/displayartwork" element={<DisplayArtwork/>} exact/>

            <Route path="/customerlogin" element={<CustomerLogin onCustomerLogin={onCustomerLogin}/>} exact/>
            <Route path="/artistlogin" element={<ArtistLogin onArtistLogin={onArtistLogin}/>} exact/>
            <Route path="/adminlogin" element={<AdminLogin onAdminLogin={onAdminLogin}/>} exact/>
            <Route path="/forgetpassword" element={<ForgetPassword/>} exact/>
            <Route path="/register" element={<Register/>} exact/>
            <Route path="/artistregister" element={<ArtistRegister/>} exact/>
        </Routes>

    </div>
  )
}
