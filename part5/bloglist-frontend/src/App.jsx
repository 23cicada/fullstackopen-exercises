
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { Button, Container } from '@mui/material'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import useNotification from './hooks/useNotification'
import useLocalStorage from './hooks/useLocalStorage'
import Logout from './components/Logout'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import './index.css'


const App = () => {
  const { notification, notify } = useNotification()
  const [user, setUser] = useLocalStorage('user')

  return (
    <Container>
      <Router>
        <AppBar position="static" sx={{ mb: 3 }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Blog App
            </Typography>
            <Button component={Link} to="/" color="inherit">Blogs</Button>
            {user ? (
              <>
                <Button component={Link} to="/create" color="inherit">new blog</Button>
                <Logout setUser={setUser} />
              </>
            ) : (
              <Button component={Link} to="/login" color="inherit">Login</Button>
            )}
          </Toolbar>
        </AppBar>
        {notification.message && (
          <Alert variant="filled" severity={notification.type} sx={{ mb: 3 }}>
            {notification.message}
          </Alert>
        )}
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/login" element={<Login setUser={setUser} notify={notify} />} />
          <Route path="/blogs/:id" element={<Blog user={user} notify={notify} />} />
          <Route path="/create" element={<BlogForm notify={notify} />} />
        </Routes>
      </Router>
    </Container>
  )
}

export default App
