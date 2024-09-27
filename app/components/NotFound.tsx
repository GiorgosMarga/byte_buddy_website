import { Button } from '@nextui-org/react'
import React from 'react'

const NotFound = ({ message }: { message: string }) => {
    return (
        <div className='flex items-center justify-center text-2xl text-danger-300'>
            <p>{message}</p>
            <Button className='bg-danger'>Home</Button>
        </div>
    )
}

export default NotFound