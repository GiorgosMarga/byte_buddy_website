import React, { useEffect, useRef } from 'react'
import { CodeBlock, dracula } from 'react-code-blocks'
import { motion, useAnimate, useInView } from "framer-motion"
import { Avatar } from '@nextui-org/react'
import MyAvatar from './Avatar'
type Post = {
    content: string
    language: string
    user: User
}

type User = {
    firstname: string
    lastname: string
    avatar: string
}

type Props = {
    post: Post
    isToggled: boolean
    action: "accepted" | "rejected" | "waiting"
    changeAction: () => void
}

const FeedPost = ({ post, isToggled, action, changeAction }: Props) => {
    const motionDiv = useRef(null)
    const isInView = useInView(motionDiv)
    const [scope, animate] = useAnimate()
    useEffect(() => {
        const animation = async () => {
            if (isInView) {
                await animate("div", { scale: 1, opacity: 1 }, { duration: 1, damping: 5 })
            }
        }
        animation()
    }, [isInView, animate])


    if (isToggled && action !== "waiting") {
        return (
            <motion.div
                initial={{ opacity: 1, x: 0, rotate: 0 }}
                animate={{ opacity: 0, x: action === "rejected" ? -2 * window.innerWidth : window.innerWidth, rotate: action === "rejected" ? 720 : 0 }}
                transition={{ duration: 0.5 }}
                onAnimationComplete={changeAction}
                className='flex flex-col relative w-fit transition-all min-w-[600px] h-[500px] bg-[#282a36] rounded-xl' >
                <div className='h-[100%] p-1'>
                    <CodeBlock
                        text={post.content}
                        language={post.language}
                        theme={dracula}
                        wrapLongLines
                        codeContainerStyle={{
                            innerHeight: "100%",
                        }}
                    />
                </div>
                <div className='flex space-x-2 absolute bottom-5 left-5  items-center'>
                    <MyAvatar name={post.user.firstname} avatar={post.user.avatar} />
                    <p>@{post.user.firstname} {post.user.lastname}</p>
                </div>
            </motion.div >)
    }
    return (
        <div ref={scope} className='flex justify-center'>
            <motion.div
                ref={motionDiv}
                className={`relative ${isToggled ? "w-fit transition-all min-w-[600px] flex flex-col scale-0 opacity-50" : "w-[600px] hidden"} h-[500px] bg-[#282a36] rounded-xl`}>

                <div className='h-[100%] p-1'>
                    <CodeBlock
                        text={post.content}
                        language={post.language}
                        theme={dracula}
                        wrapLongLines
                        codeContainerStyle={{
                            innerHeight: "100%",
                        }}
                    />
                </div>
                <div className='flex space-x-2 absolute bottom-5 left-5  items-center'>
                    <MyAvatar name={post.user.firstname} avatar={post.user.avatar} />
                    <p>@{post.user.firstname} {post.user.lastname}</p>
                </div>
            </motion.div>
        </div>

    )
}

export default FeedPost