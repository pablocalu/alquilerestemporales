import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import GoogleMap from '../components/GoogleMap';
import Geocode from 'react-geocode'

export default function MapPage() {

  const { id } = useParams();
  const [place, setPlace] = useState();
  const [placeLat, setPlaceLat] = useState('')
  const [placeLong, setPlaceLong] = useState('')

  Geocode.setApiKey()
  Geocode.setLanguage('en')
  Geocode.setRegion('ar')
  Geocode.setLocationType("ROOFTOP");

  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });  
  }, [id]);

  useEffect(() => {
    if(!place) return;
    Geocode.fromAddress(place?.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setPlaceLat(lat)
        setPlaceLong(lng)
      },
      (error) => {
        throw error
      }
    );
  },[place])

  if (!place) return <h1>Loading...</h1>; 

  return (
    <div>
      <GoogleMap lattitude={placeLat} long={placeLong} place={place} id={id} />
    </div>
  )
}
