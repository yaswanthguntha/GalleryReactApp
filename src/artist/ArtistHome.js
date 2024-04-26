// import React, { useEffect, useState } from 'react'
import Explore from './../navbar/Explore';

export default function ArtistHome() 
{
  // const [artistData, setArtistData] = useState("");

  // useEffect(() => {
  //   const storedArtistData = localStorage.getItem('artist');
  //   if (storedArtistData) {
  //     const parsedArtistData = JSON.parse(storedArtistData);
  //     setArtistData(parsedArtistData)
  //   }
  // }, []);

  return (
    <div>
      <Explore/>
    </div>
  )
}
