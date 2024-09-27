type UserGeolocation = {
    country: string
    city: string
}

type User = {
    id: number
    username: string
    bio: string
    radius: number
    firstName: string
    lastName: string
    geolocation: UserGeolocation
    user_id: number
}

type Post = {
    id: number
    content: string
    tags: string[]
    createdAt?: string
    language: string
}
