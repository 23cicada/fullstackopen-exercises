import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'

const useQueryBlog = (id) => {
  const { data, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogService.getById(id),
    enabled: !!id
  })
  return { data, isLoading }
}

export default useQueryBlog
