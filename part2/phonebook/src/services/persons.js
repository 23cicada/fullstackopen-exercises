import axios from 'axios'

// Because both the frontend and the backend are at the same address, declare baseUrl as a relative URL.
const baseUrl = '/api/persons'

// Single-responsibility principle
const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject).then(response => response.data)
}

const deletePerson = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

export default { getAll, create, deletePerson, update }
