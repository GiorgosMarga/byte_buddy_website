import React, { useRef, useEffect, useState } from 'react'
import { AnimatePresence, motion, useAnimate, useCycle, useInView } from "framer-motion"
import { ArrowLeftStartOnRectangleIcon, ChatBubbleLeftEllipsisIcon, Cog6ToothIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import NavDivs from './NavDivs'
import NavButton from './NavButton'

const NavDrawer = () => {
    const [open, cycleOpen] = useCycle(false, true);
    const changeCycle = () => {
        cycleOpen()
    }
    const sideVariants = {
        closed: {
            transition: {
                staggerChildren: 0.2,
                staggerDirection: -1
            }
        },
        open: {
            transition: {
                staggerChildren: 0.2,
                staggerDirection: 1
            }
        }
    };
    const itemVariants = {
        closed: {
            opacity: 0
        },
        open: { opacity: 1 }
    };
    return (
        <>
            <NavButton useCycle={changeCycle} open={open} />
            <AnimatePresence>
                {open && <motion.aside
                    initial={{ width: 0 }}
                    animate={{ width: "100%", }}
                    exit={{
                        width: 0,
                        transition: { duration: 0.8, delay: 0.8 }
                    }}
                    className='lg:hidden absolute top-0 left-0 w-[100%] h-[100%] bg-black z-10'>
                    <div className='flex flex-col items-center justify-center w-[100%] h-[100%]'>
                        <motion.div
                            className='flex flex-col items-start justify-center space-y-10'
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={sideVariants}>
                            <NavDivs name="Profile" icon={<UserCircleIcon className='w-8 h-8' />} href='profile' variants={itemVariants} />
                            <NavDivs name="Messages" icon={<ChatBubbleLeftEllipsisIcon className='w-8 h-8' />} href='profile' variants={itemVariants} />
                            <NavDivs name="Settings" icon={<Cog6ToothIcon className='w-8 h-8' />} href='profile' variants={itemVariants} />
                            <NavDivs name="Exit" icon={<ArrowLeftStartOnRectangleIcon className='w-8 h-8' />} href='/login' variants={itemVariants} />
                        </motion.div>
                    </div>
                </motion.aside>}
            </AnimatePresence>
        </>
    )
}

export default NavDrawer