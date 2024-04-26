import React, { useState, useRef, useEffect } from 'react'
import './artist.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import config from '../config';

export default function PublishArt() {

  const [artistData, setArtistData] = useState("");

  useEffect(() => {
    const storedArtistData = localStorage.getItem('artist');
    if (storedArtistData) {
      const parsedArtistData = JSON.parse(storedArtistData);
      setArtistData(parsedArtistData)
    }
  }, []);

    const [publishdata, setPublishdata] = useState({
        title: '',
        category: '',
        description: '',
        dimensions: '',
        price: '',
        artist: '',
        file: ''
    });

    const fileInputRef = useRef(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate =useNavigate()

    const handleFileChange = (e) => {
        setPublishdata({ ...publishdata, file: e.target.files[0] });
      };

    const handleChange = (e) =>
  {
    setPublishdata({...publishdata, [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try {
        const response = await axios.post(`${config.url}/publishartwork`, {...publishdata, artist: artistData}, {
          headers: {
            'Content-Type': 'multipart/form-data' // Set content type for FormData
          }
        });
      if (response.status === 200) 
      {
        setPublishdata({
            title: '',
            category: '',
            description: '',
            dimensions: '',
            price: '',
            artist: '',
            file: null
        });
        fileInputRef.current.value= '';
        navigate("/myartwork")
      }
      setMessage(response.data);
      setError(''); 
    } 
    catch(error) 
    {
      setError(error.response.data);
      setMessage(''); 
    }
  };

  const handleBack = () => {
    navigate('/artisthome')
    window.location.reload()
  }

  return (
    <div className="main-publish">
        <div className="header">
            <span className="page-head">Publish Art</span>
        </div>
        {
            message ? <i style={{color:'#00B3AC',display:"flex",justifyContent:"center",marginTop:"30px",fontWeight:"600"}}>{message}</i> :
             <i style={{color:'#00B3AC',display:"flex",justifyContent:"center",marginTop:"30px",fontWeight:"600"}}>{error}</i>
        }
        <form encType='multipart/form-data' onSubmit={handleSubmit} className="publish-form">
            <div style={{marginTop:"50px"}} className="left-sub">
                <div className="details">
                    <div className="art-css">
                        <input id="file" ref={fileInputRef} onChange={handleFileChange} type="file" required />
                    </div>
                    
                    <table style={{marginTop:"50px"}} className="dimension">
                      <tbody>
                        <tr>
                            <td><label>Dimensions</label></td>
                        </tr>
                        <tr>
                            <td><input id='dimensions' value={publishdata.dimensions} onChange={handleChange} className="field" type="text" placeholder="eg: height x width" required /></td>
                        </tr>
                      </tbody>
                    </table>
                </div>
                <div>
                    <Link onClick={handleBack} className="back" style={{textDecoration:"none",marginLeft:"20px"}}>
                        <img style={{width:"25px"}} src="./backarrow.png" alt="back" />
                        <span style={{color:"#00A09A",textAlign:"center"}}>&nbsp;Back to home</span>
                    </Link>
                </div>
            </div>
            <div className="right-sub">
                <table className="table-publish">
                  <tbody>
                    <tr>
                        <td><label>Art Title</label></td>
                        <td><input onChange={handleChange} id='title' value={publishdata.title} className="field" type="text" placeholder="Display Name for Artwork" required/></td>
                    </tr>
                    <tr>
                        <td><label>Category</label></td>
                        <td>
                        <select onChange={handleChange} id='category' value={publishdata.category} style={{width:"405px"}} className="field">
                                <option value="">Select Category</option>
                                <option value="Painting">Painting</option>
                                <option value="Portrait">Portrait</option>
                                <option value="Sketch">Sketch</option>
                                <option value="Sculpture">Sculpture</option>
                                <option value="Photography">Photography</option>
                                <option value="DigitalArt">Digital Art</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label>Description</label></td>
                        <td><textarea onChange={handleChange} id='description' value={publishdata.description} className="field-area" placeholder="Describe your Artwork" required/></td>
                    </tr>
                    <tr>
                        <td><label>Price of art</label></td>
                        <td><input onChange={handleChange} id='price' value={publishdata.price} style={{width:"170px"}} className="field" type="number" placeholder="(in rupees)" required/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td style={{paddingTop:"30px",paddingLeft:"215px"}}><button className="btn" type="submit">Publish</button></td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </form>
    </div>
  )
}