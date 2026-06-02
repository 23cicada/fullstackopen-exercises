import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import styled from 'styled-components'
import Typography from '@mui/material/Typography'
import useLogin from '../hooks/useLogin'
import useField from '../hooks/useField'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const Login = () => {
  const { handleLogin, isPending } = useLogin()
  const username = useField()
  const password = useField()
  const handleSubmit = async (event) => {
    event.preventDefault()
    handleLogin(username.value, password.value)
  }

  return (
    <div>
      <Typography variant="h4">Log in to application</Typography>
      <Form onSubmit={handleSubmit}>
        <TextField label="Username" variant="standard" {...username} />
        <TextField
          label="Password"
          variant="standard"
          type="password"
          {...password}
        />
        <Button variant="contained" loading={isPending} type="submit">
          Login
        </Button>
      </Form>
    </div>
  )
}

export default Login
