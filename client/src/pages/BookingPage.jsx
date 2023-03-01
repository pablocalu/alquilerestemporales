import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function BookingPage() {

  const { id } = useParams()
  const [booking, setBooking] = useState(null)

  useEffect(() => {
    if(id){
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({id}) => _id === id)
        if(foundBooking){
          setBooking(foundBooking)
        }
      })
    }
  })

  if(!booking){
    return ''
  }

  return (
    <div>
      hola
    </div>
  )
}
