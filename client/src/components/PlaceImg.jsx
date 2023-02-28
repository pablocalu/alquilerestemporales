import React, { useEffect } from 'react'

export default function PlaceImg({place, index = 0, className = null}) {

  if (!place.addedPhotos1?.length) {
    return '';
  }

  if(!className) {
    className = 'object-cover'
  }

  return (
    <div>
      <img className='object-cover' src={'http://localhost:4000/uploads/' + place.addedPhotos1[index]}/>
    </div>
  )
}
