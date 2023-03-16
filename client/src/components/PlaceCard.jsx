import React from 'react';
import { Link } from 'react-router-dom';

export default function PlaceCard({ place }) {
  return (

      <Link to={'/place/' + place._id} key={place._id}>
        <div className="bg-gray-500 mb-2 rounded-2xl flex">
          {place.addedPhotos1?.[0] && (
            <img
              className="rounded-2xl object-cover aspect-square"
              src={'http://localhost:4000/uploads/' + place.addedPhotos1?.[0]}
              alt=""
            />
          )}
        </div>
        <h3 className="font-bold">{place.address}</h3>
        <h2 className="text-sm leading-4 text-gray-500">{place.title}</h2>
        <div className="mt-1">
          <span className="font-bold">${place.price} per night </span>
        </div>
      </Link>

  );
}
