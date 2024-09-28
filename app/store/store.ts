import { create } from 'zustand'

type User = {
  id: number
  username: string
}
type State = {
    user: User | null
}

type Action = {
  setUser:(newUser: User) => void
}

const useUserStore = create<State & Action>((set) => ({
  user: null,
  setUser: (newUser) => set({user:newUser}),
  deleteUser: () => set({user:null})
}))

export default useUserStore