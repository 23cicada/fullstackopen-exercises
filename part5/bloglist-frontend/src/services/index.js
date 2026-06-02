import axios from 'axios'
import { getLocalUser } from '../utils'

const api = axios.create()

api.interceptors.request.use(function (config) {
  const user = getLocalUser()
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})

export default api
