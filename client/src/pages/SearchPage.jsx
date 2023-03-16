import React, { useState } from 'react'
import PlaceCard from '../components/PlaceCard'
import { useEffect } from 'react';
import { UserContext } from '../UserContext';
import { useContext } from 'react';

export default function SearchPage() {


const { searchResult, user } = useContext(UserContext);
const [ loadResults, setLoadResults] = useState()

useEffect(() => {
/*   setLoadResults(searchResult)
  if(loadResults){
    return
  } */
}, []) 
 
/* if(!loadPlaces) return <h1>Loading.</h1> */


  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {searchResult.length > 0 &&
      searchResult.map((place) => <PlaceCard place={place} />)}
  </div>
  )
}
