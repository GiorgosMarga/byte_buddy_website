import React from 'react'
import { motion, Variants } from "framer-motion"
import { Badge } from '@nextui-org/react';
import { HomeIcon } from '@heroicons/react/24/outline';
type Props = {
    name: string;
    icon: React.ReactNode
    href: string
    variants?: Variants
    content?: number | undefined
    onClick?: () => void
    replace_name?: string
}

const NavDivs = ({ name, icon, href, variants, content, onClick, replace_name }: Props) => {
    if (replace_name === name) {
        return (
            <motion.a href={"/"} variants={variants} className="flex items-center justify-start pl-10 space-x-4 cursor-pointer transition-all ease-in duration-150 hover:scale-105 hover:text-danger-300 ">
                <HomeIcon className='w-8 h-8' />
                <p className="text-xl">{"Home"}</p>
            </motion.a>
        )
    }
    return (
        <motion.a href={href} variants={variants} onClick={onClick} className="flex items-center justify-start pl-10 space-x-4 cursor-pointer transition-all ease-in duration-150 hover:scale-105 hover:text-danger-300 ">
            {icon}
            <Badge content={content} color='danger' className='-right-3'>
                <p className="text-xl">{name}</p>
            </Badge>
        </motion.a>
    )
}

export default NavDivs