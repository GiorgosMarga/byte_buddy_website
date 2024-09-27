import React from 'react'
import { Avatar } from '@nextui-org/react'
type Props = {
    avatar?: string
    name?: string
    className?: string
}

const MyAvatar = ({ avatar, name, className }: Props) => {
    if (avatar) {
        return <Avatar className={className} src={avatar}></Avatar>
    }
    return <Avatar className={`text-lg ${className}`} name={name}></Avatar>
}

export default MyAvatar