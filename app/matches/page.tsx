"use client"
import Nav from "../components/Nav/Nav";
import { useQuery } from "react-query";
import { makeRequest } from "../request";
import { StatusCodes } from "http-status-codes";
import Match from "./Match";

export default function Matches() {
    const { data: matches, refetch } = useQuery({
        queryKey: ["matches"],
        queryFn: async () => {
            const res = await makeRequest("/matches", "GET", null, true)
            if (res.statusCode !== StatusCodes.OK) {
                console.error(res.body)
                return
            }
            return res.body.matches as Match[]
        }
    })

    return (
        <main className="flex h-screen w-screen">
            <Nav replace_name="Matches" />
            <div className="flex-grow p-10">

                <div className="flex flex-grow flex-col h-[100%] space-y-2 items-center  rounded-lg overflow-scroll scrollbar-hide">
                    {matches?.map((match) => <Match key={match.id} match={match} refetch={() => refetch()} />)}
                </div>
            </div>
        </main>
    )


}