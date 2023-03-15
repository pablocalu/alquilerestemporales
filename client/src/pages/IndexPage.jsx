import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../UserContext'

export default function IndexPage() {

  const { searchResult } = useContext(UserContext)
  const [places, setPlaces] = useState([])

  

  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data)
    })
  }, [places])

  if(searchResult.length > 0){
    return (
      <div className='mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {
        searchResult.length > 0 && searchResult.map(place => (
          <Link to={'/place/'+place._id} key={place._id}>
            <div className='bg-gray-500 mb-2 rounded-2xl flex'>
              {place.addedPhotos1?.[0] && (
                <img className='rounded-2xl object-cover aspect-square' src={'http://localhost:4000/uploads/'+place.addedPhotos1?.[0]} alt="" />
              )}
            </div>
              <h3 className='font-bold'>{place.address}</h3>
              <h2 className='text-sm leading-4 text-gray-500'>{place.title}</h2>
              <div className='mt-1'>
                <span className='font-bold'>${place.price} per night </span>
              </div>
          </Link>
        ))
      }
    </div>
    )
  } 

    return (
      <div className='mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {
          places.length > 0 && places.map(place => (
            <Link to={'/place/'+place._id} key={place._id}>
              <div className='bg-gray-500 mb-2 rounded-2xl flex'>
                {place.addedPhotos1?.[0] && (
                  <img className='rounded-2xl object-cover aspect-square' src={'http://localhost:4000/uploads/'+place.addedPhotos1?.[0]} alt="" />
                )}
              </div>
                <h3 className='font-bold'>{place.address}</h3>
                <h2 className='text-sm leading-4 text-gray-500'>{place.title}</h2>
                <div className='mt-1'>
                  <span className='font-bold'>${place.price} per night </span>
                </div>
            </Link>
          ))
        }
      </div>
) 
  


}
