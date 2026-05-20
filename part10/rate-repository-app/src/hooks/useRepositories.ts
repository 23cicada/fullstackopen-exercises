import { GET_REPOSITORIES } from "../graphql/queries"
import { useQuery } from "@apollo/client/react"
import { RepositoriesQueryVariables } from "@/types"

const useRepositories = (params?: RepositoriesQueryVariables) => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: params,
  })

  return { repositories: data?.repositories, loading }
}

export default useRepositories
