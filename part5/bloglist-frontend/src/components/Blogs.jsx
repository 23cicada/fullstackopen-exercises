import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])
  return (
    <>
      <h2>blogs</h2>
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
