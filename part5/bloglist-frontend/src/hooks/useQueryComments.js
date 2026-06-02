import { useQuery } from '@tanstack/react-query'
import commentService from '../services/comments'

const useQueryComments = (id) => {
  const { data, isLoading } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => commentService.getComments(id),
    enabled: !!id
  })
  return { data, isLoading }
}

export default useQueryComments
