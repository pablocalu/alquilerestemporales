import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Toastify from 'toastify-js'

export default function RegisterPage() {

const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const registerUser = async (e) => {
    e.preventDefault()

    try {
        await axios.post('/register',{
            name,
            email,
            password
        })
        setName('')
        setEmail('')
        setPassword('')
        Toastify({
            text: 'User succesfully created. Please Login.',
            duration: 3000,
            close: true,
            gravity: top,
            newWindow: true,
            stopOnFocus: true,
            position: 'center',
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
              },
        }).showToast()
    } catch (error) {
        setName('')
        setEmail('')
        setPassword('')
        Toastify({
            text: 'Registration fail. Try again',
            duration: 3000,
            close: true,
            gravity: top,
            newWindow: true,
            stopOnFocus: true,
            position: 'center',
            style: {
                background: "linear-gradient(to right, #ff0000 , #ff5a3b)",
              },
        }).showToast()
    }
    

}

  return (
    <div className='mt-4 grow flex items-center justify-around'>
        <div className='mb-32'>
            <h1 className='text-4xl text-center mb-4'>Register</h1>
            <form className='max-w-md mx-auto' onSubmit={registerUser}>
                <input 
                    type={'text'} 
                    placeholder={'Name'} 
                    value={name} 
                    onChange={(e)=> (setName(e.target.value))}/>
                <input 
                    type={'email'} 
                    placeholder={'email@valid.com'}
                    value={email} 
                    onChange={(e)=> (setEmail(e.target.value))}
                />
                <input 
                    type={'password'} 
                    placeholder={'Password'}
                    value={password} 
                    onChange={(e)=> (setPassword(e.target.value))}
                />
                <button className='primary'>Register</button>
                <div className='text-center py-2 text-gray-500'>
                    Already a member? <Link className='underline text-black' to={'/login'}>Login</Link>
                </div>
            </form>
        </div>
    </div>
  )
}
