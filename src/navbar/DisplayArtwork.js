import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './main.css'
import axios from 'axios'
import config from '../config'

export default function DisplayArtwork() 
{
    const [isartist,setisartist] = useState("")
    const [iscustomer,setiscustomer] = useState("")
    const [artist, setartist] = useState('');
    const [back,setback] = useState("")
    const [art, setArt] = useState('');
    const [favorite,setFavorite] = useState({
        role: '',
        art: '',
        user: ''
    })
    const [added,setAdded] = useState('false');
    const navigate = useNavigate()

    useEffect(() => {
            const storedArtData = localStorage.getItem('artwork');
            if (storedArtData) {
            const parsedArtData = JSON.parse(storedArtData);
            setArt(parsedArtData);
            } //ARTWORK
    
            const Artist = localStorage.getItem('artist');
            setisartist(Artist)
            const Customer = localStorage.getItem('customer');
            setiscustomer(Customer)
            isartist ? setback("/artisthome") : iscustomer ? setback("/customerhome") : setback("/explore")
        }, [isartist,iscustomer]);          
        
        const fetchArtist = async () => {
            try {
              const response = await axios.get(`${config.url}/findartist/${art.artist.email}`)
              setartist(response.data);
            }
            catch (error) {
              console.error(error.message);
            }
        }

        useEffect(() => {
            fetchArtist();
          });

        const removeartwork = () => {
            localStorage.removeItem('artwork');
            navigate(back)
            window.location.reload()
        }

        const handleBuy = () => {
            navigate('/processingpayment')
        }

        const handleFavourite = async () => {
            if(isartist) {
                setFavorite({
                    role:'artist',
                    art: localStorage.getItem('artwork'),
                    user: localStorage.getItem('artist')
                })
            }
            if(iscustomer) {
                setFavorite({
                    role:'customer',
                    art: localStorage.getItem('artwork'),
                    user: localStorage.getItem('customer')
                })
            }
            try {
                const response = await axios.post(`${config.url}/addfavorite`,favorite);

                if (response.status === 200) {
                    setFavorite({
                        role: '',
                        art: '',
                        user: ''
                    })
                    setAdded("true")
                }
            }
            catch (error) {

            }
        }

  return (
            <div>
              <div className="displayartwork">
                <div className='left-part'>
                    <div className="details">
                        <div className='image' align="center">
                            <img src={`${config.url}/artimage/${art.file}`} alt="art_image" />
                        </div>  
                        <div className="pricetag">
                            <span>{art.title}</span>
                            {
                                art.availability === "available" ? <span style={{fontSize:"26px"}}>₹ {art.price}</span> : <span style={{fontSize:"26px"}}>Sold Out</span>
                            }
                        </div>  
                        </div>
                    <div>
                    <Link onClick={removeartwork} className="back" style={{textDecoration:"none",marginLeft:"60px"}}>
                        <img style={{width:"25px"}} src="./backarrow.png" alt="back" />
                        <span style={{color:"#00A09A",textAlign:"center"}}>&nbsp;Back to home</span>
                        {/* {window.location.reload()} */}
                    </Link>
                    </div>
                </div>

                <div className="right-part">
                    <div className="artname">
                        <span style={{marginLeft:"3%"}}>{art.title}</span> 
                    </div>
                    <div className="description">
                        <span style={{marginLeft:"3%",fontSize:"18px",fontWeight:"600"}}>Description</span> <br/>
                        <span style={{marginLeft:"3%"}}>{art.description}</span>
                    </div>
                    <div className="dimension">
                        <span style={{marginLeft:"3%",fontSize:"18px",fontWeight:"600"}}>Dimensions</span> <br/>
                        <span style={{marginLeft:"3%"}}>{art.dimensions} (height x width)</span>
                    </div>
                    <div className="artist">
                        <span style={{marginLeft:"3%",fontSize:"18px",fontWeight:"600"}}>Artist &nbsp;: &nbsp;</span>
                        <span >{artist.fullname}</span>
                    </div>
                    <div className="artist">
                        <span style={{marginLeft:"3%",fontSize:"18px",fontWeight:"600"}}>Category &nbsp;: &nbsp;</span>
                        <span >{art.category}</span>
                    </div>
                    <div className="buttons">
                        {
                            added === "false" ? <button className="fav" onClick={handleFavourite}><img style={{width:"30px",marginBottom:"5px"}} src="./favorite.png" alt="back" /> &nbsp; Favorite</button>
                            : <button className="fav"><img style={{width:"30px",marginBottom:"5px"}} src="./favorite.png" alt="back" /> &nbsp; Unfavorite</button>
                        }
                        {
                            art.availability === "available" ? <button className="buy" onClick={handleBuy}>Buy Now</button> : <button className="buy" onClick={handleBuy} disabled>Sold</button>
                        }
                    </div>
                </div>
              </div>
            </div>
  )
}
