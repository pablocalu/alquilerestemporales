import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Link } from 'react-router-dom';

export default function GoogleMap({ lattitude, long, place, id }) {
  const loader = new Loader({
    apiKey: 'notelamuestro',
    version: 'weekly',
  });

  if (lattitude && long) {
    console.log("lattitude")
    let marker;
    loader.load().then(() => {
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: parseFloat(lattitude), lng: parseFloat(long) },
        zoom: 15,
      });
      marker = new google.maps.Marker({
        position: { lat: parseFloat(lattitude), lng: parseFloat(long) },
        map: map,
      });
    });
  }

  return (
    <div className="relative h-screen">
      <div className="grid gap-2 grid-cols-[1fr_2fr] mt-8 h-full">
        <div>
          <Link to={`/place/${id}`}>
            <button>
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
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
            </button>
          </Link>
          <h1>Donde vas a estar?</h1>
          <span>{place.description}</span>
          <h4>Como moverse?</h4>
          <span>en bondi</span>
        </div>
        <div>
          <div className="w-full h-full rounded-3xl" id="map"></div>
        </div>
      </div>
    </div>
  );
}
