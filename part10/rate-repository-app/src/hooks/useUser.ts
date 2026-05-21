import { useQuery } from "@apollo/client/react"
import { ME } from "../graphql/queries"

interface UseUserProps {
  includeReviews?: boolean
}
const useUser = ({ includeReviews = false }: UseUserProps = {}) => {
  const { data, loading, refetch } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews },
  })

  return {
    isSigned: !!data?.me,
    loading,
    reviews: data?.me?.reviews,
    refetch,
  }
}

export default useUser
