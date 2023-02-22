import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function PhotosUploader({ addedPhotos1, onChange}) {

    const [photoLink, setPhotoLink] = useState('')

    const addPhotoByLink = async (e) => {
        e.preventDefault()
        const { data:filename } = await axios.post('/upload-by-link', {link: photoLink})
        onChange( prev => {
          return [...prev, filename]
        })
        setPhotoLink('')
      }

  return (
    <>
              <div className="flex gap-2">
              <input type="text" placeholder="Add using a link" value={photoLink} onChange={e => setPhotoLink(e.target.value)}/>
              <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">
                Add&nbsp;photo
              </button>
               </div>
            <div className="gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos1.length > 0 && addedPhotos1.map(link => (
                <div className='h-32 flex' key={link}>
                  <img className='rounded-2xl w-full object-cover' src={`http://localhost:4000/uploads/${link}`} />
                </div>
              ))}
              </div>
    </>
  )
}
