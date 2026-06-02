import api from '.'
const baseUrl = '/api/users'

const getUsers = () => {
  const request = api.get(baseUrl)
  return request.then((response) => response.data)
}

const getUserById = (id) => {
  const request = api.get(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

export default { getUsers, getUserById }
