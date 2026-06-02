import { useParams } from 'react-router-dom'
import useQueryUser from '../hooks/useQueryUser'
import Typography from '@mui/material/Typography'

const User = () => {
  const { id } = useParams()
  const { data, isLoading } = useQueryUser(id)
  if (isLoading) return <div>Loading...</div>
  return (
    <div>
      <Typography variant="h4">{data?.name}</Typography>
      <Typography variant="h5">added blogs</Typography>
      <ul>
        {data?.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
