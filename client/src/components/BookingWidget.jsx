import React, { useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';

export default function BookingWidget({ place }) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberGuests, setNumberGuests] = useState(1);
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  return (
    <div>
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
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
        )}
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <span>
              Book this place {numberOfNights} nights for $
              {numberOfNights * place.price}
            </span>
          </div>
        )}
      </div>
      <button className="primary mb-4 mt-4">Book this place</button>
    </div>
  );
}
