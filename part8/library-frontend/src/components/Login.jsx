import { useState } from "react"
import { useLogin } from "../hooks"

const Login = ({ onError, onLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { login } = useLogin({ onError, onLogin })

  const submit = async (event) => {
    event.preventDefault()
    await login(username, password)
    setUsername("")
    setPassword("")
  }

  return (
    <div>
      <form
        onSubmit={submit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "start",
        }}
      >
        <label>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <label>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
