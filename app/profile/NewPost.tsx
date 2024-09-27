import { PlusCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import PostModal from './PostModal';
import { useDisclosure } from '@nextui-org/react';

type Props = {
    refetchPosts: () => void;
}

const NewPost = ({ refetchPosts }: Props) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <div onClick={onOpen} className='flex flex-col items-center justify-center bg-gray-800 rounded-lg shadow-lg cursor-pointer hover:scale-105 duration-150 ease-soft-spring transition-all'>
                <PlusCircleIcon className='w-[110px] h-[110px] text-danger-300'></PlusCircleIcon>
            </div>
            <PostModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} refetchPosts={refetchPosts} />
        </>
    )
}

export default NewPost