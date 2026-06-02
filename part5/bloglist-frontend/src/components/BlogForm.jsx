import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import styled from 'styled-components'
import Typography from '@mui/material/Typography'
import useCreateBlog from '../hooks/useCreateBlog'
import useField from '../hooks/useField'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const BlogForm = () => {
  const { handleCreateBlog, isLoading } = useCreateBlog()
  const title = useField()
  const author = useField()
  const url = useField()

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault()
        const blog = {
          title: title.value,
          author: author.value,
          url: url.value
        }
        handleCreateBlog(blog)
      }}
    >
      <Typography variant="h4">Create new</Typography>
      <TextField label="Title" variant="outlined" {...title} />
      <TextField label="Author" variant="outlined" {...author} />
      <TextField label="Url" variant="outlined" {...url} />
      <Button variant="contained" type="submit" loading={isLoading}>
        create
      </Button>
    </Form>
  )
}

export default BlogForm
