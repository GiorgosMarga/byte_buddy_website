'use client'
import React, { useState } from 'react'
import Register from './Register'
import Login from './Login'


export default function AuthPage() {
  const [isRegistered, setIsRegistered] = useState(true)

  const changeAuthState = () => {
    setIsRegistered((prev) => !prev)
  }
  return (
    <div className='flex h-screen w-screen justify-center'>
      <div className='hidden md:flex md:w-[50%] rounded-2xl shadow-xl m-2'>

      </div>
      {isRegistered ? <Login changeAuthState={changeAuthState} /> : <Register changeAuthState={changeAuthState} />}
    </div>
  )
}
