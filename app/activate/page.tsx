'use client'
import { Button, Spinner } from '@nextui-org/react'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function ActivatePage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const searchParams = useSearchParams()
    useEffect(() => {
        const activateAccount = async () => {
            const token = searchParams.get('token')
            setIsLoading(true)
            setError("")
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/users/activate`, {
                method: "PUT",
                body: JSON.stringify({
                    token
                }),
                headers: {
                    "content-type": "application/json",
                },
                mode: "cors"
            })
            if (res.status === 200) {
                setError("Your account has been activated. Soon you will be redirected....")
            }else if (res.status === 422) {
                const body = await res.json()              
                setError(body?.errors?.token ?? "there was an error. Please try later.")
            }
            console.log(res.status )
            setIsLoading(false)
        }
        activateAccount()
    }, [])
        


  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col'>
        {isLoading ? <Spinner color='danger'/> : null}
        {error.length === 0 ? <p className='text-lg mt-5 text-danger'>Activating account...</p> : <p className='text-sm text-danger font-semibold'>{error}</p>}
    </div>
  )
}
