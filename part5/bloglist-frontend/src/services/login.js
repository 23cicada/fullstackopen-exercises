import api from '.'
const baseUrl = '/api/login'

const login = ({ username, password }) => {
  const request = api.post(baseUrl, { username, password })
  return request.then((response) => response.data)
}

export default { login }
