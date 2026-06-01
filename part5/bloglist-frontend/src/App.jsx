
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import useNotification from './hooks/useNotification'
import useLocalStorage from './hooks/useLocalStorage'
import Logout from './components/Logout'
import './index.css'

const App = () => {
  const { notification, notify } = useNotification()
  const [user, setUser] = useLocalStorage('user')

  return (
    <Router>
      {notification.message && (
        <div className='notification' style={{ color: notification.type === 'error' ? 'red' : 'green' }}>
          {notification.message}
        </div>
      )}
      <div style={{ display: 'flex', gap: 10 }}>
        <Link to="/">Blogs</Link>
        {user ? (
          <>
            <Link to="/create">new blog</Link>
            <Logout setUser={setUser} />
          </>
        ) : <Link to="/login">Login</Link>}
      </div>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/login" element={<Login setUser={setUser} notify={notify} />} />
        <Route path="/blogs/:id" element={<Blog user={user} notify={notify} />} />
        <Route path="/create" element={<BlogForm notify={notify} />} />
      </Routes>
    </Router>
  )
}

export default App
