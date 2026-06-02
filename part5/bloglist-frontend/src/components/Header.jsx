import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Link } from 'react-router-dom'
import { useUser } from '../stores'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import useLogin from '../hooks/useLogin'

const Header = () => {
  const user = useUser()
  const { handleLogout } = useLogin()
  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Blog App
        </Typography>
        <Button component={Link} to="/" color="inherit">
          Blogs
        </Button>
        {user ? (
          <>
            <Button component={Link} to="/users" color="inherit">
              Users
            </Button>
            <Button component={Link} to="/create" color="inherit">
              new blog
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
