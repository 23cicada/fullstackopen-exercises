import { useState, useRef } from 'react'

const useNotification = () => {
  const setTimeoutId = useRef(null)
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  })

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    clearTimeout(setTimeoutId.current)
    setTimeoutId.current = setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 3000)
  }

  return { notification, notify }
}

export default useNotification
