import React, { useEffect } from 'react'
import { useState } from 'react'
import Perks from '../Perks'
import PhotosUploader from '../components/PhotosUploader'
import PhotosUploader2 from '../components/PhotosUploader2'
import AccountNav from '../AccountNav'
import axios from 'axios'
import { Navigate, useParams } from 'react-router-dom'

export default function PlacesFormPage() {

    const { id } = useParams()
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

    useEffect(() => {
        if(!id){
            return
        }
        axios.get('/places/'+id).then(
          response => {
            const { data } = response
            setTitle(data.title)
            setAddress(data.address)
/*             setAddedPhotos1(data.addedPhotos1)
            setAddedPhotos2(data.addedPhotos2) */
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests)
          }
        )
    }, [id])

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

      const savePlace =async (e) => {
        e.preventDefault()
        const placeData = {title,
              address,
              addedPhotos1,
              addedPhotos2,
              description,
              perks,
              checkIn,
              checkOut,
              extraInfo,
              maxGuests}
        if(id){
         try {
             await axios.put('/places', {
              id,
              ...placeData
             })
             alert('salio todo bien perrito')
             setRedirect(true)
         } catch (error) {
             alert('ups se rompio algo')
             console.log(error)
         }
        } else {
         try {
             await axios.post('/places', placeData)
             alert('salio todo bien perrito')
             setRedirect(true)
         } catch (error) {
             alert('ups se rompio algo')
             console.log(error)
         }
        }
      }


      if(redirect){
        return <Navigate to={'/account/places'}/>
      }

  return (
        <div>
        <AccountNav/>
          <form onSubmit={savePlace}>
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
