import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import styled from 'styled-components'

const Actions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

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
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'start' }}>
        <Typography variant='h5'>{blog.title}</Typography>
        <a href={blog.url} target="_blank">{blog.url}</a>
        <Typography sx={{ color: 'text.secondary' }}>Added by {blog.author}</Typography>
        <Actions>
          <Typography variant='body1'>Likes {blog.likes}</Typography>
          <Button variant='outlined' onClick={handleLike}>like</Button>
          {user && blog.user.id === user.id && (
            <Button variant='outlined' color="error" onClick={handleRemove}>remove</Button>
          )}
        </Actions>
      </CardContent>
    </Card>
  )
}

export default Blog
