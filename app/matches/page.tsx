"use client"
import Nav from "../components/Nav/Nav";
import { useQuery } from "react-query";
import { makeRequest } from "../request";
import { StatusCodes } from "http-status-codes";
import Match from "./Match";
import { Spinner } from "@nextui-org/react";

export default function Matches() {
    const { data: matches, refetch, isFetching } = useQuery({
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
            <div className="flex-grow flex p-10 items-center justify-center ">
                {isFetching && <Spinner color="danger" />}
                {!isFetching ? matches?.length !== 0 ? <div className="flex flex-grow flex-col h-[100%] space-y-2 items-center  rounded-lg overflow-scroll scrollbar-hide">
                    {matches?.map((match) => <Match key={match.id} match={match} refetch={() => refetch()} />)}
                </div> : <p className="text-danger text-xl font-bold">You have no matches yet.</p> : null}
            </div>
        </main>
    )


}