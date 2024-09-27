import React, { useEffect, useState } from 'react'
import NewPost from './NewPost'
import Post from './Post'
import { makeRequest } from '../request'
import { useQuery } from 'react-query'
import { StatusCodes } from 'http-status-codes'

const Posts = ({ user_id }: { user_id: number | undefined }) => {
    const { data: posts, isLoading, refetch } = useQuery({
        queryKey: ["user_posts"],
        queryFn: async () => {
            const res = await makeRequest(`/posts/${user_id}`, "GET", null, true)
            if (res.statusCode !== StatusCodes.OK) {
                console.log(res.statusCode)
            }
            return res.body.posts as Post[]
        }
    })

    return (
        <div className='grid gap-4 grid-cols-3 grid-rows-* p-10 w-full'>
            {posts?.map((post) => <Post key={post.id} post={post} refetchPosts={() => refetch()} />)}
            <NewPost refetchPosts={() => refetch()} />
        </div>
    )
}

export default Posts