import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

const useQueryUser = (id) => {
  const { data, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getUserById(id),
    enabled: !!id
  })
  return { data, isLoading }
}

export default useQueryUser
