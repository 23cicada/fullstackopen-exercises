import { useQuery } from "@apollo/client/react"
import { ME } from "../graphql/queries"

const useIsSigned = () => {
  const { data, loading } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
  })

  return { isSigned: !!data?.me, loading }
}

export default useIsSigned
