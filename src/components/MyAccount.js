import React, { useEffect, useState } from 'react'
import './components.css'

export default function MyAccount() {

    const [isartist,setisartist] = useState("")

    useEffect(() => {
        const Artist = localStorage.getItem('artist');
        setisartist(Artist)
      }, [isartist]);

  return (
    <div>
        <div className='refer'>My Account</div>
        <div className='com-body'>
            <div className='bg'>
                <img src='./order-light.png' alt=''/>
                <span>Orders</span>
            </div>
            <div className='bg'>
                <img src='./favourite-light.png' alt=''/>
                <span>Favorites</span>
            </div>
            <div className='bg'>
                <img src='./address.png' alt=''/>
                <span>Address</span>
            </div>
            {
                isartist ? <div className='bg'>
                            <img src='./artwork-light.png' alt=''/>
                            <span>Artworks</span>
                           </div>
                         : <div></div>
            }
        </div>
    </div>
  )
}
