import React, { useState } from 'react'
import PlaceCard from '../components/PlaceCard'
import { useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';

export default function SearchPage() {


const { searchResult } = useContext(UserContext);


  if(!searchResult) return <h1>Loading..</h1>
  
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {console.log(searchResult)}
    {searchResult.length > 0 &&
      searchResult.map((place) => <PlaceCard place={place} />)}
  </div>
  )
}
