import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'

const Blog = ({ user, notify }) => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    blogService.getById(id).then((blog) => setBlog(blog))
  }, [id])

  const handleLike = () => {
    blogService
      .update({ ...blog, likes: blog.likes + 1 })
      .then((updatedBlog) => setBlog(updatedBlog))
  }

  const handleRemove = async () => {
    try {
      await blogService.remove(id)
      notify('Blog removed successfully')
      navigate('/')
    } catch (error) {
      notify(error.response.data.error, 'error')
    }
  }

  if (blog === null) return null

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url} target="_blank">{blog.url}</a>
      <p>likes {blog.likes} {user && <button onClick={handleLike}>like</button>}</p>
      <p>Added by {blog.author}</p>
      {user && blog.user.id === user.id && (
        <button onClick={handleRemove}>remove</button>
      )}
    </div>
  )
}

export default Blog
