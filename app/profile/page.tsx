"use client"

import { useEffect, useState } from "react";
import UserBanner from "./UserBanner";
import ProfileSkeleton from "./ProfileSkeleton";
import Posts from "./Posts";
import { makeRequest } from "../request";

export default function Profile() {
    const [user, setUser] = useState<User | undefined>(undefined)
    useEffect(() => {
        const fetchUser = async () => {
            const res = await makeRequest("/user_info", "GET", null, true)
            const user = res.body.user_info as User
            setUser(user)
        }
        fetchUser()
    }, [])
    return <main className="flex w-screen h-screen justify-center items-center">
        <div className="w-[95%] h-[90%] shadow-sm bg-slate-700/10 flex flex-col md:flex-row rounded-3xl shadow-danger-300 overflow-y-scroll scrollbar-hide">
            {user !== undefined ? <UserBanner user={user} /> : <ProfileSkeleton />}
            {user !== undefined ? <Posts user_id={user?.user_id} /> : null}
        </div>
    </main>
}