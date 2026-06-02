import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { getLocalUser } from '../utils'

const useUserStore = create(
  devtools((set) => {
    const user = getLocalUser()
    return {
      user,
      actions: {
        setUser: (user) => set({ user })
      }
    }
  })
)

export const useUser = () => useUserStore((state) => state.user)
export const useUserActions = () => useUserStore((state) => state.actions)
