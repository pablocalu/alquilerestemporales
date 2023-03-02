import React, { useEffect } from 'react'
import { Loader } from "@googlemaps/js-api-loader"


export default function GoogleMap({ lattitude, long }) {


  const loader = new Loader({
        apiKey: ,
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
