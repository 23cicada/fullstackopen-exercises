
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

let timerId

const useNotificationStore = create(devtools((set) => ({
  message: "",
  actions: {
    setNotification: (message, timeout = 5000) => {
      clearTimeout(timerId)
      set({ message })
      timerId = setTimeout(() => {
        set({ message: "" })
      }, timeout)
    }
  }
})))

export const useNotification = () => useNotificationStore(state => state.message)
export const useNotificationActions = () => useNotificationStore(state => state.actions)

