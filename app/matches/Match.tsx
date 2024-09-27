import { HeartIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '@nextui-org/react'
import React from 'react'
import { makeRequest } from '../request'
import { StatusCodes } from 'http-status-codes'
import { feColorMatrix } from 'framer-motion/client'


type Props = {
    match: Match
    refetch: () => void
}
const Match = ({ match, refetch }: Props) => {


    const deleteHandler = async () => {
        const res = await makeRequest(`/matches/${match.id}`, "DELETE", null, true)
        if (res.statusCode !== StatusCodes.OK) {
            console.error(res.statusCode)
            return
        }
        refetch()
    }

    const onUpdateMatchHandler = async (status: string) => {
        const body = { status }
        const res = await makeRequest(`/matches/${match.id}`, "PUT", JSON.stringify(body), true)
        if (res.statusCode !== StatusCodes.OK) {
            console.error(res.statusCode)
            return
        }
        refetch()
    }


    return (
        <div className="flex bg-stone-950/80 px-5 py-2 rounded-lg shadow-2xl w-[500px] justify-between items-center">
            <div className="flex space-x-2 items-center ">
                <div className="bg-red-500 w-12 h-12 rounded-full" />
                <p className="text-md font-light">@{match.firstname} {match.lastname}</p>
                <p>{match.status}</p>
            </div>
            <div className="flex space-x-2">
                <Tooltip content="Reject">
                    <XMarkIcon className="w-8 h-8 text-danger button-animation" onClick={() => onUpdateMatchHandler("rejected")}></XMarkIcon>
                </Tooltip>
                <Tooltip content="Match">
                    <HeartIcon className="w-8 h-8 text-danger button-animation" onClick={() => onUpdateMatchHandler("accepted")}></HeartIcon>
                </Tooltip>
                <Tooltip content="Delete" >
                    <TrashIcon className="w-8 h-8 text-danger/50 button-animation hover:text-danger" onClick={deleteHandler}></TrashIcon>
                </Tooltip>
            </div>
        </div>
    )
}

export default Match