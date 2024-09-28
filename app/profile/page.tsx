"use client"

import UserBanner from "./UserBanner";
import Posts from "./Posts";
import { useQuery } from "react-query";
import { makeRequest } from "../request";
import { StatusCodes } from "http-status-codes";
import { Spinner } from "@nextui-org/react";

export default function Profile() {
    const { data: user, isFetching } = useQuery({
        queryKey: ["user_profile"],
        queryFn: async () => {
            const res = await makeRequest("/users/whoAmI", "GET", null, true)
            if (res.statusCode !== StatusCodes.OK) {
                console.error(res.body)
                return null
            }
            return res.body.user
        },
    })
    return <main className="flex w-screen h-screen justify-center items-center">
        <div className="w-[95%] h-[90%] shadow-sm bg-slate-700/10 flex flex-col md:flex-row rounded-3xl shadow-danger-300 overflow-y-scroll scrollbar-hide">
            <UserBanner />
            {isFetching ? <div className="flex w-[100%] h-[100%] justify-center"><Spinner color="danger" /></div> : <Posts user_id={user?.id} />}
        </div>
    </main>
}