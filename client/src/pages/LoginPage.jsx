import axios from 'axios'
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

export default function LoginPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      await axios.post('/login', {email, password})
      alert('login ok')
      setRedirect(true)
    } catch (error) {
      alert('fail', error)
    }
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
        <div className='mb-32'>
            <h1 className='text-4xl text-center mb-4'>Login</h1>
            <form className='max-w-md mx-auto' onSubmit={handleLogin}>
                <input type={'email'} 
                  placeholder={'email@valid.com'} 
                  value='email' 
                  onChange={e => (setEmail(e.target.value))}/>
                <input type={'password'} 
                  placeholder={'Password'} 
                  value='password' 
                  onChange={e => (setPassword(e.target.value))}/>
                <button className='primary'>Login</button>
                <div className='text-center py-2 text-gray-500'>
                    Don't have an account yet? <Link className='underline text-black' to={'/register'}>Register</Link>
                </div>
            </form>
        </div>
    </div>
  )
}
