import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import styled from 'styled-components'
import useUpdateBlog from '../hooks/useUpdateBlog'
import useDeleteBlog from '../hooks/useDeleteBlog'
import { useUser } from '../stores'
import useQueryBlog from '../hooks/useQueryBlog'

const Actions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const Blog = () => {
  const user = useUser()
  const { id } = useParams()
  const { data: blog, isLoading } = useQueryBlog(id)
  const { handleLike, isLoading: updateLoading } = useUpdateBlog()
  const { handleDelete, isLoading: deleteLoading } = useDeleteBlog()

  if (isLoading) return <div>Loading...</div>

  return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          alignItems: 'start'
        }}
      >
        <Typography variant="h5">{blog.title}</Typography>
        <a href={blog.url} target="_blank">
          {blog.url}
        </a>
        <Typography sx={{ color: 'text.secondary' }}>
          Added by {blog.author}
        </Typography>
        <Actions>
          <Typography variant="body1">Likes {blog.likes}</Typography>
          <Button
            loading={updateLoading}
            variant="outlined"
            onClick={() => handleLike(blog)}
          >
            like
          </Button>
          {user && blog.user.id === user.id && (
            <Button
              loading={deleteLoading}
              variant="outlined"
              color="error"
              onClick={() => handleDelete(blog.id)}
            >
              remove
            </Button>
          )}
        </Actions>
      </CardContent>
    </Card>
  )
}

export default Blog
