"use client"
import Nav from "./components/Nav/Nav";
import { useEffect, useState } from "react";
import { makeRequest } from "./request";
import FeedPost from "./components/FeedPost";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Spinner } from "@nextui-org/react";
import { useQuery } from "react-query";
import { StatusCodes } from "http-status-codes";
import useUserStore from "./store/store";

type User = {
  firstname: string
  lastname: string
  avatar: string
}

type FeedResponse = {
  content: string
  language: string
  user: User
  id: number
  user_id: number
}

type Action = "accepted" | "rejected" | "waiting"

export default function Home() {
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState<FeedResponse[]>([])
  const [action, setAction] = useState<Action>("waiting")


  const setUser = useUserStore((state) => state.setUser)
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await makeRequest("/users/whoAmI", "GET", null, true)
      if (res.statusCode !== StatusCodes.OK) {
        console.error(res.body)
        return null
      }
      return res.body.user
    },
    onSuccess: () => {
      setUser(user)
    }
  })

  const { isLoading, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await makeRequest(`/feed?page=${page}`, "GET", null, true)
      setPage(prev => prev + 1)
      return res.body.posts as FeedResponse[]
    },
    onSuccess: (data) => {
      if (data !== undefined) {
        setPosts((prev) => [...prev, ...data])
      }
    },
    refetchInterval: Infinity
  })

  const { data: matches } = useQuery({
    queryKey: ["matches"],
    queryFn: async () => {
      const res = await makeRequest("/matches", "GET", null, true)
      return res.body.matches.length as number
    },
    refetchInterval: 5000
  })
  useEffect(() => {
    if (posts?.length === 3) {
      refetch()
    }
  }, [posts])

  const changeAction = () => {
    setAction("waiting")
    setPosts((prev) => {
      return prev.slice(1)
    })
  }

  const match = async (user_id_2: number) => {
    const req_body = {
      "user_id_2": user_id_2,
      "user_id_1": 4
    }

    const res = await makeRequest("/matches", "POST", JSON.stringify(req_body), true)
    console.log(res.body)
  }


  return (
    <main className="dark h-screen text-foreground bg-background flex overflow-x-hidden overflow-y-hidden relative min-w-[700px]">
      <Nav content={matches} />
      <div className="h-[100%] w-[100%] lg:w-[85%] flex items-center justify-center">
        {isLoading ? <Spinner color="danger" /> : posts?.length === 0 ? <p className="text-danger">You have seen it all. Get back to coding</p> :
          <div className="flex flex-col w-[100%]">
            <div className="stack flex-grow w-[100%] ">
              {posts?.length > 0 ? posts.map((post, idx) => <FeedPost post={post} key={post.id} isToggled={idx === 0} changeAction={changeAction} action={action} />) : null}
            </div>
            <div className="flex p-5 space-x-8 items-center justify-center  mt-5">
              <TrashIcon
                className="h-10 w-10 brounded-md cursor-pointer hover:text-danger transition-all hover:scale-105 ease-soft-spring"
                onClick={() =>
                  setAction("rejected")
                }
              ></TrashIcon>
              <HeartIcon
                className="h-10 w-10  rounded-md cursor-pointer hover:text-danger transition-all hover:scale-105 ease-soft-spring"
                onClick={() => {
                  setAction("accepted")
                  match(posts[0].user_id)
                }
                }
              ></HeartIcon>
            </div>
          </div>
        }
      </div>
    </main >
  );
}
