import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceCard from '../components/PlaceCard';

export default function IndexPage() {

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places').then((response) => {
      setPlaces(response.data);
    });
  }, [places]);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 && places.map((place) => <PlaceCard place={place} />)}
    </div>
  );
}
