import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

const useQueryUsers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers
  })
  return { data, isLoading }
}

export default useQueryUsers
