import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function BookingPage() {

  const { id } = useParams()
  const [booking, setBooking] = useState(null)

  useEffect(() => {
    if(id){
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({ _id }) => _id === id)
        if(foundBooking){
          setBooking(foundBooking)
        }
      })
    }
  }, [])


  const handleCancel = async () => {

    response = await axios.put('/cancel', {
      place : booking.place,
    })

    console.log(response)
  }

  if(!booking){
    return ''
  }

  return (
    <div>
      {console.log(booking)}
      <h1>{booking.place.title}</h1>
      <button onClick={handleCancel}>cancel</button>
    </div>
  )
}
