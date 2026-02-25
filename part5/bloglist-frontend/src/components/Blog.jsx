import { useState } from 'react'

const Blog = ({ blog, onUpdate, onRemove, showRemoveButton }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    onUpdate({ ...blog, likes: blog.likes + 1 })
  }

  return (
    <div style={blogStyle} data-testid="blog">
      <div>
        {blog.title}
        {blog.author}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
          {showRemoveButton && (
            <button
              onClick={() => {
                window.confirm(`Remove blog ${blog.title} by ${blog.author}?`) && onRemove(blog.id)
              }}
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
