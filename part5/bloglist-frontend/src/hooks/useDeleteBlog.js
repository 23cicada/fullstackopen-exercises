import blogService from '../services/blogs'
import { useNotificationActions } from '../stores'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useDeleteBlog = () => {
  const navigate = useNavigate()
  const { setNotification } = useNotificationActions()
  const queryClient = useQueryClient()
  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: blogService.remove
  })

  const handleDelete = async (id) => {
    try {
      await mutateAsync(id)
      setNotification('Blog removed successfully')
      navigate('/')
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    } catch (error) {
      setNotification(error.response.data.error, 'error')
    }
  }

  return { handleDelete, isLoading }
}

export default useDeleteBlog
