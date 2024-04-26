import React, { useState,useEffect } from 'react'
import {useLocation} from 'react-router-dom'

export default function ShowNavBar({children}) 
{

    const location = useLocation();

    const [showNavBar, setShowNavBar] = useState('')

    useEffect(() => {
      if(location.pathname === '/customerlogin' || 
      location.pathname === '/register' || 
      location.pathname === '/forgetpassword' || 
      location.pathname === '/artistregister' || 
      location.pathname === '/artistlogin' || 
      location.pathname === '/adminlogin' || 
      location.pathname === '/adminhome' ||
      location.pathname === '/publishart' ||
      location.pathname === '/displayartwork'||
      location.pathname === '/customerprofile' ||
      location.pathname === '/artistprofile' ||
      location.pathname === '/processingpayment') 
      {
        setShowNavBar(false)
      }    
      else {
        setShowNavBar(true)
      }
    }, [location])
    

  return (
    <div>{showNavBar && children}</div>
  )
}
