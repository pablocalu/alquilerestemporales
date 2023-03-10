import React, { useContext, useEffect, useState, useRef } from 'react';
import { addDays, differenceInCalendarDays } from 'date-fns';
import axios from 'axios'
import { UserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { DateRange, DatePicker } from 'react-date-range';
import MultipleDatesPicker from '@ambiot/material-ui-multiple-dates-picker'


export default function BookingWidget({ place }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [numberGuests, setNumberGuests] = useState(1);
  const [redirect, setRedirect] = useState(false)
  const [open, setOpen] = useState(false)
  const [dates, setDates] = useState([])


  const { user } = useContext(UserContext)

  const today = Date.now();
  const todayFormated = new Date(today);
  const timeFormated = todayFormated.toISOString().slice(0, 10)

  let noDates = place.unavailableDates.map( date => (
    new Date(date)
  ))
  
  useEffect(() => {
    if(user){
      setName(user.name)
    }
    console.log('lo q viene del back',place.unavailableDates)
    console.log('no dates', noDates)
    if(dates){

      console.log('esto mando al back', dates)
    }
  })

  let numberOfNights = 0;
  let bookingPrice = 0;

/*   if (range) {
    numberOfNights = differenceInCalendarDays(
      new Date(range[0].endDate),
      new Date(range[0].startDate)
    );
    
    bookingPrice = numberOfNights * place.price
  } */
  
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
{/*       <button onClick={() => setOpen(!open)}>
        Select Dates
      </button> */}
      <MultipleDatesPicker
        open={open}
       disabledDates={noDates} 
        selectedDates={dates ? dates : null}
        onCancel={() => setOpen(false)}
        onSubmit={dates => handleDates(dates)}
        submitButtonText={'Confirm'}
      />
    </div>
{/*           <div className="py-3 px-4">
            <label>Check in:</label>
            <input
              type="date"
              min={timeFormated}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div> */}
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
