import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import useQueryBlogs from '../hooks/useQueryBlogs'

const Blogs = () => {
  const { data: blogs = [], isLoading } = useQueryBlogs()

  return (
    <>
      <Typography variant="h4">blogs</Typography>
      {isLoading && <div>Loading...</div>}
      <ul>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
      </ul>
    </>
  )
}

export default Blogs
