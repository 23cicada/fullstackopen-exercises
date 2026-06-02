import { lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'
import Alert from '@mui/material/Alert'
import { ErrorBoundary, getErrorMessage } from 'react-error-boundary'
import { useNotification } from './stores'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from './components/Header'

const queryClient = new QueryClient()

const Blogs = lazy(() => import('./components/Blogs'))
const Login = lazy(() => import('./components/Login'))
const Blog = lazy(() => import('./components/Blog'))
const BlogForm = lazy(() => import('./components/BlogForm'))
const Users = lazy(() => import('./components/Users'))
const User = lazy(() => import('./components/User'))

const App = () => {
  const notification = useNotification()

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Router>
          <Header />
          {notification.message && (
            <Alert variant="filled" severity={notification.type} sx={{ mb: 3 }}>
              {notification.message}
            </Alert>
          )}
          <ErrorBoundary
            fallbackRender={({ error }) => (
              <div>
                <p>Something went wrong:</p>
                <pre>{getErrorMessage(error)}</pre>
              </div>
            )}
          >
            <Routes>
              <Route path="/" element={<Blogs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/blogs/:id" element={<Blog />} />
              <Route path="/create" element={<BlogForm />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="*" element={<div>404 - Page not found</div>} />
            </Routes>
          </ErrorBoundary>
        </Router>
      </Container>
    </QueryClientProvider>
  )
}

export default App
