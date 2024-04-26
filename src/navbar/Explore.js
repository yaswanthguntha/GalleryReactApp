import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import config from '../config';

export default function Explore() 
{

  const [arts,setArtworks] = useState([]);

  const fetchArtworks = async () => {
    try {
      if(search.length > 0) {
        const response = await axios.get(`${config.url}/searchbytitle/${search}`);
        setArtworks(response.data);
      }
      else if (category.length > 0) {
        const response = await axios.get(`${config.url}/searchbycategory/${category}`);
        setArtworks(response.data);
      }
      else {
        const response = await axios.get(`${config.url}/explorearts`)
        setArtworks(response.data);
      }
    }
    catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchArtworks();
  });

  const [size,setSize] = useState('');

  useEffect(() => {
    const img = document.getElementById('myImage');
    if (img) {
      img.addEventListener('load', function () {
        const width = img.width;
        const height = img.height;
        setSize(width > height ? 'landscape' : 'portrait');
      });
    }
  }, [arts]);

  const setObject = async (artid) => {
    try {
      const response = await axios.get(`${config.url}/getartobject/${artid}`);
      if(response.data!=null) {
      localStorage.setItem('artwork', JSON.stringify(response.data));
      }
      window.location.reload()
    }
    catch (error) {
      console.error(error.message);
    }
  }

  const [category,setCategory] = useState('');

  const clickAll = () => {
    setCategory('');
  }
  const clickPainting = () => {
    setCategory('Painting');
  }
  const clickPortrait = () => {
    setCategory('Portrait');
  }
  const clickSketch = () => {
    setCategory('Sketch');
  }
  const clickSculpture = () => {
    setCategory('Sculpture');
  }
  const clickPhotography = () => {
    setCategory('Photography');
  }
  const clickDigitalArt = () => {
    setCategory('DigitalArt');
  }

  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div className="explore">
        <div className='cs'>
          <form className='search'>
          <input id='search' value={search} onChange={handleChange} className='search-bar' type='text' placeholder='Name or category' />
          <button className='search-btn' type='submit'>Search</button>
          </form>
          <div className='cata'>
          <span className='head'>Category</span>
          <span onClick={clickAll} className='cats'>All</span>
          <span onClick={clickPainting} className='cats'>Painting</span>
          <span onClick={clickPortrait} className='cats'>Portrait</span>
          <span onClick={clickSketch} className='cats'>Sketch</span>
          <span onClick={clickSculpture} className='cats'>Sculpture</span>
          <span onClick={clickPhotography} className='cats'>Photography</span>
          <span onClick={clickDigitalArt} className='cats'>Digital Art</span>
          </div>
        </div>
        <div className="display">
          {Array.isArray(arts) && arts.length > 0 ? (
            arts.map( (art,index) => (
              <Link to="/displayartwork" onClick={() => setObject(art.artid)} key={index} className="artwork">
                  <div>
                    <div className='imgtag' style={{justifyContent:"center"}} >
                    <img id='myImage' className={size} src={`${config.url}/artimage/${art.file}`} alt="art_image"/>  
                    </div>
                    <p style={{color:"#00A09A",fontSize:"20px",fontWeight:"600"}}>{art.title}</p>
                    <p>{art.artist.fullname}</p>
                    <p style={{fontSize:"18px",fontWeight:"bold"}}>₹ {art.price}</p>
                  </div>
              </Link>
            ) )
          ) : (<i>No Artworks Found</i>)
          }
        </div>
    </div>
  )
}
