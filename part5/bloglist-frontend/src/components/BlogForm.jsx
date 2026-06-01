import { useState } from 'react'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import styled from 'styled-components'
import Typography from '@mui/material/Typography'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const BlogForm = ({ notify }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const { title, author, url } = event.target.elements
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    setLoading(true)
    try {
      await blogService.create(blog)
      notify('Blog created successfully')
      navigate('/')
    } catch (error) {
      notify(error.response.data.error, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form onSubmit={handleCreateBlog}>
      <Typography variant='h4'>Create new</Typography>
      <TextField label="Title" variant="outlined" name="title" />
      <TextField label="Author" variant="outlined" name="author" />
      <TextField label="Url" variant="outlined" name="url" />
      <Button variant="contained" type="submit" loading={loading}>create</Button>
    </Form>
  )
}

export default BlogForm
