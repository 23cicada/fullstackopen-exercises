import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'

const useQueryBlogs = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    staleTime: 1000 * 60 * 5
  })
  return { data, isLoading }
}

export default useQueryBlogs
