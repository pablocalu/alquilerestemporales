import React, { useContext, useEffect, useState, useRef } from 'react';
import { addDays, differenceInCalendarDays } from 'date-fns';
import axios from 'axios'
import { UserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { DateRange } from 'react-date-range';


export default function BookingWidget({ place }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberGuests, setNumberGuests] = useState(1);
  const [redirect, setRedirect] = useState(false)
  const [open, setOpen] = useState(false)
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])

  const refOne = useRef(null)
  const { user } = useContext(UserContext)

  const today = Date.now();
  const todayFormated = new Date(today);
  const timeFormated = todayFormated.toISOString().slice(0, 10)

  useEffect(() => {
    if(user){
      setName(user.name)
    }
    document.addEventListener("click", hideOnClickOutside, true)
  })

  let numberOfNights = 0;
  let bookingPrice = 0;

  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
    bookingPrice = numberOfNights * place.price
  }

  const bookThisPlace = async () => {
    const response = await axios.post('/booking', { checkIn, checkOut, numberGuests, name, phone, place: place._id, price: bookingPrice  })
    const bookingId = response.data._id
    setRedirect(`/account/bookings/${bookingId}`)
  }

  const handleSelect = (dates) => {
    console.log(dates)
    setRange([dates.selection])
  }

  const hideOnClickOutside = (e) => {
    if( refOne.current && !refOne.current.contains(e.target) ) {
      setOpen(false)
    }
  }

  if(redirect){
    return <Navigate to={redirect} />
  }

  return (
    <div>
      <button onClick={ () => setOpen(open => !open) }>Select your date</button>
      <div ref={refOne}>
      { open && 
          <DateRange
          onChange={handleSelect}
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          disabledDates={[new Date('2023-04-04')]}
          ranges={range}
          months={1}
          direction={'horizontal'}
        />
      }
      </div>
      <div className="bg-white shadow p-4 rounded-2xl">
        <h2 className="text-2xl text-center"></h2>
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
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
