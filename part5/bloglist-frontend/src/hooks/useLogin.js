import loginService from '../services/login'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useNotificationActions, useUserActions } from '../stores'
import { saveLocalUser, removeLocalUser } from '../utils'

const useLogin = () => {
  const navigate = useNavigate()
  const { setUser } = useUserActions()
  const { setNotification } = useNotificationActions()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginService.login
  })

  const handleLogin = async (username, password) => {
    try {
      const user = await mutateAsync({ username, password })
      saveLocalUser(user)
      setUser(user)
      navigate('/')
    } catch (error) {
      setNotification(error.response.data.error, 'error')
    }
  }

  const handleLogout = () => {
    removeLocalUser()
    setUser(null)
    navigate('/')
  }

  return { handleLogin, handleLogout, isPending }
}

export default useLogin
