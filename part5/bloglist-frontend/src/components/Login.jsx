import { useState } from 'react'
import loginService from '../services/login'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import styled from 'styled-components'
import Typography from '@mui/material/Typography'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const Login = ({ setUser, notify }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    setLoading(true)
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      navigate('/')
    } catch (error) {
      notify(error.response.data.error, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Typography variant='h4'>Log in to application</Typography>
      <Form onSubmit={handleLogin}>
        <TextField label="Username" variant="standard" name="username" />
        <TextField label="Password" variant="standard" name="password" type="password" />
        <Button variant="contained" loading={loading} type="submit">Login</Button>
      </Form>
    </div>
  )
}

export default Login
