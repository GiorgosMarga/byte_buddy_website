'use client'
import { Spinner } from '@nextui-org/react'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { makeRequest } from '../request'
import { StatusCodes } from 'http-status-codes'

export default function ActivatePage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const searchParams = useSearchParams()
    useEffect(() => {
        const activateAccount = async () => {
            const token = searchParams.get('token')
            setIsLoading(true)
            setError("")
            const res = await makeRequest(`/users/activate?token=${token}`, "PUT", null, false)
            if (res.statusCode === StatusCodes.OK) {
                setError("Your account has been activated. Soon you will be redirected....")
            } else if (res.statusCode === StatusCodes.UNPROCESSABLE_ENTITY) {
                setError(res.body?.token ?? "There was an error. Please try agin later.")
            }
            setIsLoading(false)
        }
        activateAccount()
    }, [searchParams])



    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col'>
            {isLoading ? <Spinner color='danger' /> : null}
            {error.length === 0 ? <p className='text-lg mt-5 text-danger'>Activating account...</p> : <p className='text-sm text-danger font-semibold'>{error}</p>}
        </div>
    )
}
