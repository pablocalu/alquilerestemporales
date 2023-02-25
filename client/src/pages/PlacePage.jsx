import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function PlacePage() {

  const { id } = useParams()
  const [place, setPlace] = useState()

  useEffect(() => {
    if(!id) return;

    axios.get(`/places/${id}`).then( response => {
      setPlace(response.data)
    })
  }, [id])
  
  if(!place) return <h1>Loading...</h1>

  return (
    <div className='mt-8 bg-gray-100 -mx-8 px-8 py-8'>
      <h1 className='text-3xl'>{place.title}</h1>
      <a className='my-2 block font-semibold underline' target={'_blank'} href={`https://maps.google.com/?q=${place.address}`}>{place.address}</a>
      <div className='relative'>
      <div className='grid gap-2 grid-cols-[2fr_1fr]'>
        <div>
        {place.addedPhotos1?.[0] && (
          <div>
            <img className='aspect-square object-cover' src={'http://localhost:4000/uploads/' + place.addedPhotos1[0]} alt="" />
          </div>
        )}
        </div>    
        <div className='grid'>
        {place.addedPhotos1?.[1] && (
          <img className='aspect-square object-cover' src={'http://localhost:4000/uploads/' + place.addedPhotos1[1]} alt="" />
        )}
        <div className='overflow-hidden'>
                {place.addedPhotos1?.[2] && (
          <img className='aspect-square object-cover relative top-2' src={'http://localhost:4000/uploads/' + place.addedPhotos1[2]} alt="" />
        )}
        </div>
        </div>
      </div>
      </div>
      <button className='absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md'>Show more photos</button>
    </div>
  )
}
