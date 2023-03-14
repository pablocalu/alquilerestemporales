import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { UserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import MultipleDatesPicker from '@ambiot/material-ui-multiple-dates-picker'


export default function BookingWidget({ place }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [numberGuests, setNumberGuests] = useState(1);
  const [redirect, setRedirect] = useState(false)
  const [open, setOpen] = useState(false)
  const [dates, setDates] = useState([])


  const { user } = useContext(UserContext)

  let noDates = place.booking.map( date => (
    date.dates.map( date1 => (
      new Date(date1)
    ))
  ))
  
  useEffect(() => {
    if(user){
      setName(user.name)
    }
  })

  let numberOfNights = 0;
  let bookingPrice = 0;

  
  numberOfNights =  dates.length
  bookingPrice = numberOfNights * place.price

  const handleDates = (dates) => {
    setDates(dates)
    setOpen(false)
  }

  const bookThisPlace = async () => {
    const response = await axios.post('/booking', {dates, numberGuests, name, phone, place: place._id, price: bookingPrice  })
    const bookingId = response.data._id
    setRedirect(`/account/bookings/${bookingId}`)
  }





  if(redirect){
    return <Navigate to={redirect} />
  }

  return (
    <div>

      <div className="bg-white shadow p-4 rounded-2xl">
        <h2 className="text-2xl text-center"></h2>
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
        <button onClick={ () => setOpen(open => !open) }>Select your date</button>
        <div>
      <MultipleDatesPicker
        open={open}
       disabledDates={noDates.flat()} 
        selectedDates={dates ? dates : null}
        onCancel={() => setOpen(false)}
        onSubmit={dates => handleDates(dates)}
        submitButtonText={'Confirm'}
      />
    </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input
            value={numberGuests}
            onChange={(e) => setNumberGuests(e.target.value)}
            type="number"
            min={1}
            max={place.maxGuests}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <span>
              Book this place {numberOfNights} nights for $
              {bookingPrice}
            </span>
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className="primary mb-4 mt-4">Book this place</button>
    </div>
  );
}
