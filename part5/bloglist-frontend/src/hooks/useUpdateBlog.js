import blogService from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useUpdateBlog = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: blogService.update
  })

  const handleLike = async (blog) => {
    await mutateAsync({ ...blog, likes: blog.likes + 1 })
    queryClient.invalidateQueries({ queryKey: ['blog', blog.id] })
  }

  return { handleLike, isLoading }
}

export default useUpdateBlog
