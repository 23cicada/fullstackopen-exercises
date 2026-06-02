import axios from 'axios'
import { getLocalUser } from '../utils'
const baseUrl = '/api/blogs'

axios.interceptors.request.use(function (config) {
  const user = getLocalUser()
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

const create = ({ title, author, url }) => {
  console.log({ title, author, url })
  const request = axios.post(baseUrl, { title, author, url })
  return request.then((response) => response.data)
}

const update = (blog) => {
  const request = axios.put(`${baseUrl}/${blog.id}`, blog)
  return request.then((response) => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

export default { getAll, create, update, remove, getById }
