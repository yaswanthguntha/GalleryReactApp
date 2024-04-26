import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export default function ArtworkDetails() {
  const [artworks, setArtworks] = useState([]);

  const fetchArtworks = async () => {
    try {
      const response = await axios.get(`${config.url}/viewartworks`);
      setArtworks(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const [size,setSize] = useState('');

  useEffect(() => {
    fetchArtworks();
    const img = document.getElementById('myImage');
    if (img) {
      img.addEventListener('load', function () {
        const width = img.width;
        const height = img.height;
        setSize(width > height ? 'landscape' : 'portrait');
      });
    }
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className='info'>ArtWorks</h1>
      <div align="center">
      <table className='admin-table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Artist</th>
            <th>Dimensions</th>
            <th>Price</th>
            <th>Upload Time</th>
            <th>Availability</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {artworks.length > 0 ? (
            artworks.map((event, index) => (
              <tr key={index}>
                <td>{event.title}</td>
                <td>{event.category}</td>
                <td>{event.artist.fullname}</td>
                <td>{event.dimensions}</td>
                <td>₹{event.price}</td>
                <td>{event.postedtime}</td>
                <td>{event.availability}</td>
                <td>
                {event.file.endsWith('.jpg') || event.file.endsWith('.jpeg') || event.file.endsWith('.png') ? (
                    <img id='myImage' className={size} src={`${config.url}/artimage/${event.file}`} alt="Event" style={{ width: '150px', height: 'auto' }} />
                ) : (
                    <a href={`${config.url}/artimage/${event.file}`} target='_new'>Click Here</a>
                )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" align="center">No events found</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}