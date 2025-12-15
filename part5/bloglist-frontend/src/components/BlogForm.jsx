const BlogForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
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
