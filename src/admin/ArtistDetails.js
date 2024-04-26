import React, { useState,useEffect } from 'react'
import axios from 'axios';
import config from '../config';

export default function ArtistDetails() 
{
    const [artists, setArtists] = useState([]);

    const fetchArtists = async () => {
        try {
            const response = await axios.get(`${config.url}/viewartists`);
            setArtists(response.data);
        }
        catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
      fetchArtists();
    }, []);

    const deleteArtist = async (email) => {
        try {
            await axios.delete(`${config.url}/deleteartist/${email}`);
            fetchArtists();
        }
        catch (error) {
            console.error(error.message);
        }
    }
    

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className="info">Artists</h1>
      <div align="center">
      <table className="admin-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Graduation</th>
              <th>Artist Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(artists) && artists.length > 0 ? (
              artists.map((artist, index) => (
                <tr key={index}>
                  <td>{artist.fullname}</td>
                  <td>{artist.gender}</td>
                  <td>{artist.dateofbirth}</td>
                  <td>{artist.email}</td>
                  <td>{artist.contact}</td>
                  <td>{artist.graduation}</td>
                  <td>{artist.artistname}</td>
                  <td>
                    <button onClick={() => deleteArtist(artist.email)} className='button'><img className="delete" src="./delete.png" alt="delete" /></button>
                  </td>
                </tr>
              ))
              ) : (
                <tr>
                  <td colSpan="8">Data Not Found</td>
                </tr>
              )}
          </tbody>
        </table>
        </div>
    </div>
  )
}
