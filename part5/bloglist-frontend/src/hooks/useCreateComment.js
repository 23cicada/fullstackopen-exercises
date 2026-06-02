import commentService from '../services/comments'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationActions } from '../stores'

const useCreateComment = () => {
  const { setNotification } = useNotificationActions()
  const queryClient = useQueryClient()
  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: commentService.createComment
  })

  const create = async (id, content) => {
    try {
      await mutateAsync({ id, content })
      queryClient.invalidateQueries({ queryKey: ['comments', id] })
    } catch (error) {
      setNotification(error.response.data.error, 'error')
    }
  }

  return { create, isLoading }
}

export default useCreateComment
