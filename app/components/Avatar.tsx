import React from 'react'
import { Avatar } from '@nextui-org/react'
type Props = {
    avatar?: string
    name?: string
}

const MyAvatar = ({ avatar, name }: Props) => {
    if (avatar) {
        return <Avatar src={avatar}></Avatar>
    }
    return <Avatar className='text-lg' name={name}></Avatar>
}

export default MyAvatar