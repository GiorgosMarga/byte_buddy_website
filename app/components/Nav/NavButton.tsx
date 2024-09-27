import { Bars4Icon, CursorArrowRaysIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { time } from 'console'
import { useInView, motion, useAnimate } from 'framer-motion'
import React, { useRef, useEffect, useState } from 'react'

type Props = {
    useCycle: () => void
    open: boolean
}
const NavButton = ({ useCycle, open }: Props) => {
    const [scope, animate] = useAnimate()
    const [changeIcon, setChangeIcon] = useState(false)
    const [isInitialAnimation, setIsInitialAnimation] = useState(true)
    const motionDiv = useRef(null)
    const isInView = useInView(motionDiv)


    useEffect(() => {
        const animation = async () => {

            if (isInView && isInitialAnimation) {
                await animate("div", { x: 0, scale: 1, opacity: 1 })
                setIsInitialAnimation(false)
            }
            else if (isInView && open) {
                await animate("div", { rotate: 360, x: window.innerWidth - 80 }, { delay: 0.3, duration: 0.5, onComplete: () => setChangeIcon(true) })
            } else if (isInView && !open) {
                await animate("div", { x: 0, rotate: 180 }, { delay: 0.8, duration: 0.4, onComplete: () => setChangeIcon(false) })
            }
            else {
                await animate("div", { x: 0, scale: 0, opacity: 0 }, { duration: 0 })
                setIsInitialAnimation(true)
            }
        }
        animation()
    }, [isInView, animate, open, isInitialAnimation])

    return (
        <div ref={scope}>
            <motion.div
                ref={motionDiv}
                className={`flex lg:hidden absolute top-5 left-5 cursor-pointer z-20`}
                onClick={useCycle}
                onAnimationComplete={() => console.log("Ended")}
            >
                {!open ? (!changeIcon ? <Bars4Icon className='w-10 h-10 text-danger-400' /> : <XCircleIcon className='w-10 h-10 text-danger-400' />) : changeIcon ? <XCircleIcon className='w-10 h-10 text-danger-400' /> : <Bars4Icon className='w-10 h-10 text-danger-400' />}

            </motion.div>
        </div >
    )
}

export default NavButton