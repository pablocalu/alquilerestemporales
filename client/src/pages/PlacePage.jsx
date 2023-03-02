import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingWidget from '../components/BookingWidget';
import PlaceGallery from '../components/PlaceGallery';
import GoogleMap from '../components/GoogleMap';
import Geocode from 'react-geocode'

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState();
  const [placeLat, setPlaceLat] = useState('')
  const [placeLong, setPlaceLong] = useState('')

  Geocode.setApiKey("AIzaSyDfj-5HvlKQ8Z-zrSE4Pi7F9R5NA7AD_yM")
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
    <div className="mt-8 bg-gray-100 -mx-8 px-8 pt-8 max-w-4xl self-center">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="flex gap-1 my-3 font-semibold underline"
        target={'_blank'}
        href={`https://maps.google.com/?q=${place.address}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
        {place.address}
      </a>
      <div>
        <GoogleMap lattitude={placeLat} long={placeLong}/>
      </div>
      <PlaceGallery place={place} />
      <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="py-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn} <br />
          Check-out: {place.checkOut} <br />
          Max Guests: {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8  border-t"></div>
      <div>
        <h2 className="font-semibold text-2xl">Extra info</h2>
      </div>
      <div className="mb-4 mt-2 text-sm text-gray-700 leading-4">
        {place.extraInfo}
      </div>
    </div>
  );
}
