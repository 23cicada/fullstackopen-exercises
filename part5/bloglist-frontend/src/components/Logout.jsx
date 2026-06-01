import { useNavigate } from 'react-router-dom'

const Logout = ({ setUser }) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }
  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  )
}

export default Logout
