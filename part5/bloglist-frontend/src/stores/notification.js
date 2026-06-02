import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { useShallow } from 'zustand/react/shallow'

let timerId

const useNotificationStore = create(
  devtools((set) => ({
    message: '',
    type: '',
    actions: {
      setNotification: (message, type = 'success', timeout = 5000) => {
        clearTimeout(timerId)
        set({ message, type })
        timerId = setTimeout(() => {
          set({ message: '', type: '' })
        }, timeout)
      }
    }
  }))
)

const useNotification = () =>
  useNotificationStore(useShallow(({ message, type }) => ({ message, type })))

const useNotificationActions = () =>
  useNotificationStore((state) => state.actions)

export { useNotification, useNotificationActions }
