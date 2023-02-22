import React from 'react'
import { useState } from 'react'
import Perks from '../Perks'
import PhotosUploader from '../components/PhotosUploader'
import PhotosUploader2 from '../components/PhotosUploader2'
import AccountNav from '../AccountNav'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

export default function PlacesFormPage() {

    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos1, setAddedPhotos1] = useState([])
    const [addedPhotos2, setAddedPhotos2] = useState([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    const [redirect, setRedirect] = useState(false)

    function inputHeader(text) {
        return (
          <h2 className="text-2xl mt-4">{text}</h2>
        );
      }
      function inputDescription(text) {
        return (
          <p className="text-gray-500 text-sm">{text}</p>
        );
      }
      function preInput(header,description) {
        return (
          <>
            {inputHeader(header)}
            {inputDescription(description)}
          </>
        );
      }

      const addNewPlace =async (e) => {
        e.preventDefault()
        const placeData = {title,
           address,
             addedPhotos2,
              description,
               perks,
                checkIn,
                checkOut,
                 extraInfo,
                  maxGuests}
        try {
            await axios.post('/places', placeData)
            alert('salio todo bien perrito')
            setRedirect(true)
        } catch (error) {
            alert('ups se rompio algo')
            console.log(error)
        }
      }


      if(redirect){
        return <Navigate to={'/account/places'}/>
      }

  return (
        <div>
        <AccountNav/>
          <form onSubmit={addNewPlace}>
            {preInput('Title', 'Title should be short and attractive')}
            <input type="text" placeholder="title" value={title} onChange={e => setTitle(e.target.value)}/>
            {preInput('Address', 'The Address')}
            <input type="text" placeholder="address" value={address} onChange={e => setAddress(e.target.value)} />
            {preInput('Photos', 'Put some photos')}
              <PhotosUploader addedPhotos1={addedPhotos1} onChange={setAddedPhotos1}/>
              <PhotosUploader2 addedPhotos2={addedPhotos2} onChange={setAddedPhotos2}/>
            {preInput('Description', 'Fancy description')}
            <textarea value={description} onChange={e => setDescription(e.target.value)} />
            {preInput('Perks', 'Perks you have')}
            <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
              <Perks selected={perks} onChange={setPerks}/>
            </div>
            {preInput('Extra Info', 'Some Extra Info')}
            <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />
            {preInput('Check In, Out, Max Guests', 'That shit')}
            <div className='grid gap-2 sm:grid-cols-3'>
              <div>
                <h3 className="mt-2 mb-2">Check In</h3>
                <input type="text" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
              </div>
              <div>
                <h3 className="mt-2 mb-2">Check Out</h3>
                <input type="text" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
              </div>
              <div>
                <h3 className="mt-2 mb-2">Guests</h3>
                <input type="number" value={maxGuests} onChange={e => setMaxGuests(e.target.value)} />
              </div>
            </div>
            <div>
              <button className='primary my-4'>Save</button>
            </div>
          </form>
        </div>

  )
}
