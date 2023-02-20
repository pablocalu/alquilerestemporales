import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function RegisterPage() {

const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

  return (
    <div className='mt-4 grow flex items-center justify-around'>
        <div className='mb-32'>
            <h1 className='text-4xl text-center mb-4'>Register</h1>
            <form className='max-w-md mx-auto'>
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
