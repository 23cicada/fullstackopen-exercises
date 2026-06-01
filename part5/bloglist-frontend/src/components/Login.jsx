
import loginService from '../services/login'
import { useNavigate } from 'react-router-dom'

const Login = ({ setUser, notify }) => {
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      navigate('/')
    } catch (error) {
      notify(error.response.data.error, 'error')
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username: <input type="text" name="username" />
          </label>
        </div>
        <div>
          <label>
            Password: <input type="password" name="password" />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
