import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'

const BlogForm = ({ notify }) => {
  const navigate = useNavigate()
  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const { title, author, url } = event.target.elements
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    try {
      await blogService.create(blog)
      notify('Blog created successfully')
      navigate('/')
    } catch (error) {
      notify(error.response.data.error, 'error')
    }
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <h2>create new</h2>
      <div>
        <label>
          Title: <input type="text" name="title" />
        </label>
      </div>
      <div>
        <label>
          Author: <input type="text" name="author" />
        </label>
      </div>
      <div>
        <label>
          Url: <input type="text" name="url" />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
