import React from 'react'

export default function PlaceImgTwo({place, index = 0, className = null}) {

  if(!place.addedPhotos2.length) return '';

  if(!className) {
    className = 'object-cover'
  }

  return (
    <div>
      <img className='object-cover' src={'http://localhost:4000/uploads/' + place.addedPhotos2[index]}/>
    </div>
  )
}