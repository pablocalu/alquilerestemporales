import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

export default function BookingPage() {

  const { id } = useParams()
  const [booking, setBooking] = useState(null)

  const [redirect, setRedirect] = useState(false)

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

    await axios.put('/cancel', {
      id
    })

      setRedirect(true)
    
  }

  if(!booking){
    return ''
  }

  if(redirect){
    return <Navigate to={'/account/bookings'} />
  }

  return (
    <div>
      {console.log(id)}
      <h1>{booking.place.title}</h1>
      <button onClick={() => handleCancel()}>cancel</button>
    </div>
  )
}
