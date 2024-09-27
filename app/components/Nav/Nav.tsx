import React from 'react'
import NavDivs from './NavDivs'
import { ArrowLeftStartOnRectangleIcon, ChatBubbleLeftEllipsisIcon, Cog6ToothIcon, HeartIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import NavDrawer from './NavDrawer'


const Nav = ({ content, replace_name }: { content?: number | undefined, replace_name?: string | undefined }) => {
    return (
        <>
            <NavDrawer />
            <nav className="h-[95%] min-w-[250px] w-[15%] shadow-2xl lg:flex flex-col pt-[100px] space-y-9 border-r-1 border-danger-300/90 mt-5 hidden ">
                {/* <h1 className='text-center text-danger text-2xl font-extrabold cursor-pointer hover:scale-105 transition-all duration-150'>BYTE_BUDDY</h1> */}
                <div className='flex flex-col space-y-9'>
                    <NavDivs name="Profile" icon={<UserCircleIcon className='w-8 h-8' />} href='profile' replace_name={replace_name} />
                    <NavDivs name="Matches" icon={<HeartIcon className='w-8 h-8' />} href='/matches' content={content} replace_name={replace_name} />
                    <NavDivs name="Messages" icon={<ChatBubbleLeftEllipsisIcon className='w-8 h-8' />} href='profile' replace_name={replace_name} />
                    <NavDivs name="Settings" icon={<Cog6ToothIcon className='w-8 h-8' />} href='profile' replace_name={replace_name} />
                    <NavDivs name="Exit" icon={<ArrowLeftStartOnRectangleIcon className='w-8 h-8' />} href='/login' onClick={() => {
                        localStorage.removeItem("token")
                    }} />
                </div>
            </nav >
        </>
    )
}

export default Nav