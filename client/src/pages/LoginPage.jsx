import React from 'react'

export default function LoginPage() {
  return (
    <div>
      <form>
        <input type={'email'} placeholder={'email@valid.com'}/>
        <input type={'password'} placeholder={'Password'}/>
        <button>Login</button>
      </form>
    </div>
  )
}
