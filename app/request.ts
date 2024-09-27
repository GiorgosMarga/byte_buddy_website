import { StatusCodes } from "http-status-codes"
import { navigate } from "./actions"

type Methods = "GET" | "PUT" | "DELETE" | "POST"



export const makeRequest = async (path:string,method:Methods,body: any, includeAuth: boolean) => {
    if(includeAuth && localStorage.getItem("token") === null) {
        await navigate("/login")
    }
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}${path}`, {
            method,
            headers: {
                "content-type": "application/json",
                "authorization": includeAuth ? `Bearer ${localStorage.getItem("token")}` : ""
            },
            mode: "cors",
            body
        })
        if(res.status === StatusCodes.FORBIDDEN) {
            await navigate("/login")
            return {
                statusCode: StatusCodes.FORBIDDEN,
                body: {}
            }
        }
        const body_json = await res.json()
        return {
            statusCode: res.status,
            body: body_json
        }
    } catch (error) {
        return {
            statusCode: StatusCodes.BAD_REQUEST,
            body: error
         }
    }
}