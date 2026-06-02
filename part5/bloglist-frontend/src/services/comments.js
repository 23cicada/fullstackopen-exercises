import api from '.'
const baseUrl = '/api/comments'

const getComments = (id) => {
  const request = api.get(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

const createComment = ({ id, content }) => {
  const request = api.post(`${baseUrl}/${id}`, { content })
  return request.then((response) => response.data)
}

export default { getComments, createComment }
