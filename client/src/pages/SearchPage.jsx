import React from 'react'
import PlaceCard from '../components/PlaceCard'
import { useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

export default function SearchPage() {


const { searchResult, user } = useContext(UserContext);

useEffect(() => {
}, []) 


  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {searchResult.length > 0 &&
      searchResult.map((place) => <PlaceCard place={place} />)}
  </div>
  )
}
