import axios from 'axios'
const baseUrl = '/api/blogs'

axios.interceptors.request.use(function (config) {
  const user = localStorage.getItem('user');
  if (user) {
    config.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }
  return config;
});

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = ({ title, author, url }) => {
  const request = axios.post(baseUrl, { title, author, url })
  return request.then(response => response.data)
}

export default { getAll, create }
