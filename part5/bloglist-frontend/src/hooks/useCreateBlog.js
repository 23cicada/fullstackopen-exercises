import { useNotificationActions } from '../stores'
import { useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import { useQueryClient, useMutation } from '@tanstack/react-query'

const useCreateBlog = () => {
  const { setNotification } = useNotificationActions()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: blogService.create
  })

  const handleCreateBlog = async (blog) => {
    try {
      await mutateAsync(blog)
      setNotification('Blog created successfully')
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      navigate('/')
    } catch (error) {
      setNotification(error.response.data.error, 'error')
    }
  }

  return { handleCreateBlog, isLoading }
}

export default useCreateBlog
