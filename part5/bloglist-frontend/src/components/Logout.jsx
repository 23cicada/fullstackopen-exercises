import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'

const Logout = ({ setUser }) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }
  return (
    <Button color='inherit' onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default Logout
