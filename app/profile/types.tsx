type UserGeolocation = {
    country: string
    city: string
}

type User = {
    id: number
    username: string
    bio: string
    radius: number
    firstname: string
    lastname: string
    geolocation: UserGeolocation
    user_id: number
    avatar: string
}

type Post = {
    id: number
    content: string
    tags: string[]
    createdAt?: string
    language: string
}
