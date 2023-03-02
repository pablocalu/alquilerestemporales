import React, { useEffect } from 'react'
import { Loader } from "@googlemaps/js-api-loader"


export default function GoogleMap({ lattitude, long }) {


  const loader = new Loader({
        apiKey: "AIzaSyDfj-5HvlKQ8Z-zrSE4Pi7F9R5NA7AD_yM",
        version: "weekly",
  });
   
  if(lattitude && long){
    loader.load().then(() => {
          map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: parseFloat(lattitude), lng: parseFloat(long)},
            zoom: 12,
          });
    });
  }

    return (
      <div className='h-32 w-32' id='map'></div>
    )
  
}
