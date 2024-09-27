import { CodeBlock, dracula } from 'react-code-blocks';
import React from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { TableColumn, Tooltip } from '@nextui-org/react';
import { makeRequest } from '../request';
import { StatusCodes } from 'http-status-codes';


type Props = {
    post: Post
    refetchPosts: () => void
}

const Post = ({ post, refetchPosts }: Props) => {

    const deleteHandler = async () => {
        const res = await makeRequest(`/posts/${post.id}`, "DELETE", null, true)
        if (res.statusCode !== StatusCodes.OK) {
            console.error(res)
        } else {
            refetchPosts()
        }
    }

    return (
        <div className='flex flex-col group bg-gray-800 rounded-lg shadow-lg cursor-pointer p-5 hover:scale-105 duration-150 ease-soft-spring transition-all justify-between'>
            <CodeBlock
                text={post.content}
                language={"javascript"}
                theme={dracula}
            />
            <div className='hidden space-x-5 mx-auto group-hover:flex'>
                <Tooltip content="Edit">
                    <PencilIcon className='w-7 h-7 text-danger hover:scale-125 duration-150 ease-soft-spring transition-all' />
                </Tooltip>
                <Tooltip content="Delete">
                    <TrashIcon className='w-7 h-7 text-danger hover:scale-125 duration-150 ease-soft-spring transition-all' onClick={deleteHandler} />
                </Tooltip>
            </div>
        </div>
    )
}

export default Post