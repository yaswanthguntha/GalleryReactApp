import React, { useEffect, useState } from 'react'
import '../components/components.css'
import axios from 'axios'
import config from './../config';

export default function EditArtistProfile() {

    const [artistData, setArtistData] = useState({
        fullname: '',
        gender: '',
        dateofbirth: '',
        email: '',
        contact: '',
        graduation: '',
        artistname: '',
        description: '',
        socialmedialinks: ''
    })

    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [initialArtistData, setInitialArtistData] = useState("");

    useEffect(() => {
        const storedArtistData = localStorage.getItem('artist');
        if (storedArtistData) {
        const parsedArtistData = JSON.parse(storedArtistData);
        setArtistData(parsedArtistData)
        setInitialArtistData(parsedArtistData)
        } //ARTIST
      }, []);

      const handleChange = (e) => {
          setArtistData({...artistData, [e.target.id]: e.target.value})
      }

    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        try 
        {
        const updatedData = {};
        for (const key in artistData) {
            if (artistData[key] !== initialArtistData[key] && initialArtistData[key] !== '') {
            updatedData[key] = artistData[key]; 
            }
        }
        if (Object.keys(updatedData).length !== 0) {
            // There are changes
            updatedData.email = artistData.email;
            const response = await axios.put(`${config.url}/updateartistprofile`, updatedData);
            setMessage(response.data);
            setError('');
            const res = await axios.get(`${config.url}/artistprofile/${artistData.email}`, updatedData)
            localStorage.setItem("artist",JSON.stringify(res.data))
        } else {
            // No changes
            setMessage("No Changes in your Profile");
            setError("");
        }
        } 
        catch (error) {
        setError(error.response.data);
        setMessage('');
        }
    };

  return (
    <div className='edit'>
        <div className='refer'>Edit Profile</div>
        {
            message ? <i style={{color:'#00B3AC'}}>{message}</i> : <i style={{color:'#00B3AC'}}>{error}</i>
        }
        <form onSubmit={handleSubmit}>
        <table>
            <tbody>
            <tr>
                <td><label>Full Name</label></td>
                <td><input id='fullname' onChange={handleChange} className='epi' type='text' placeholder='Enter Full Name' value={artistData.fullname} required/></td>

                <td><label>Date of Birth</label></td>
                <td><input id='dateofbirth' onChange={handleChange} className='epi' type='date' value={artistData.dateofbirth} required/></td>
            </tr>
            <tr>
                <td><label>Email</label></td>
                <td><input id='email'  className='epi' type='email' value={artistData.email} disabled required/></td>

                <td><label>Gender</label></td>
                <td><input id='gender' className='epi' type='text' value={artistData.gender} disabled required/></td>
            </tr>
            <tr>
                <td><label>Contact</label></td>
                <td><input id='contact' onChange={handleChange} className='epi' type='number' placeholder='Enter Contact' value={artistData.contact} required/></td>

                <td><label>Graduation</label></td>
                <td>
                <select id='graduation' onChange={handleChange} className='epi' value={artistData.graduation} required>
                  <option value="">Select Here</option>
                  <option value="N/A">N/A</option>
                  <option value="B. Fine Arts">B. Fine Arts</option>
                  <option value="B. Arts">B. Arts</option>
                  <option value="M. Fine Arts">M. Fine Arts</option>
                  <option value="M. Arts">M. Arts</option>
                  <option value="others">Other</option>
                </select>
                </td>
            </tr>
            <tr>
                <td><label>Artist Name</label></td>
                <td><input id='artistname' onChange={handleChange} className="epi" type="text" placeholder="Enter Artist Name(if any)" value={artistData.artistname} /></td>

                <td><label>Description</label></td>
                <td><textarea id='description' onChange={handleChange} className="ai" placeholder="Brief your Biography" value={artistData.description} required/></td>
            </tr>
            <tr>
                <td><label>Social Media</label></td>
                <td><input id='socialmedialinks' onChange={handleChange} className="epi" type="text" placeholder="Provide Links(if any)" value={artistData.socialmedialinks}/></td>

                <td colSpan="2" align='center'><button className='bttn' type='submit'>Update</button></td>
            </tr>
            </tbody>
        </table>
        </form>
    </div>
  )
}
