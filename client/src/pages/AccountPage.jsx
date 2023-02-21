
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'

export default function AccountPage() {

  const { user, ready, setUser } = useContext(UserContext)
  const [toHomePage, setToHomePage] = useState(null)

  let { subpage } = useParams()
  if(subpage === undefined){
    subpage = 'profile'
  }

  const logout = async () => {
    await axios.post('/logout')
    setToHomePage('/')
    setUser(null)
  }

  if(!ready) {
    return 'Loading..'
  }

  if(ready && !user && !toHomePage) {
    return <Navigate to={'/login'}/>
  }

  const linkClasses = (type = null) => {
    let classes = 'py-2 px-6';
    if(type === subpage){
      classes += ' bg-primary rounded-full text-white'
    }
    return classes
  }

  if(toHomePage){
    return <Navigate to={toHomePage}/>
  }

  return (
    <div>
      <nav className='w-full flex justify-center mt-8 gap-2 mb-8'>
        <Link className={linkClasses('profile')} to={'/account'}>My profile</Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
        <Link className={linkClasses('places')} to={'/account/places'}>My accomodations</Link>
      </nav>
      {
        subpage === 'profile' && (
          <div className='text-center max-w-lg mx-auto'>
            Logged in as {user.name} ({user.email})<br/>
            <button className='primary max-w-sm mt-2' onClick={logout}>Logout</button>
          </div>
        )
      }
    </div>
  )
}
