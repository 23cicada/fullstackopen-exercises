import api from '.'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = api.get(baseUrl)
  return request.then((response) => response.data)
}

const getById = (id) => {
  const request = api.get(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

const create = ({ title, author, url }) => {
  const request = api.post(baseUrl, { title, author, url })
  return request.then((response) => response.data)
}

const update = (blog) => {
  const request = api.put(`${baseUrl}/${blog.id}`, blog)
  return request.then((response) => response.data)
}

const remove = (id) => {
  const request = api.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

const createComment = (id, content) => {
  const request = api.post(`${baseUrl}/${id}/comments`, { content })
  return request.then((response) => response.data)
}

export default { getAll, create, update, remove, getById, createComment }
