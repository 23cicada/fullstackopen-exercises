import { GET_REPOSITORIES } from "../graphql/queries"
import { useQuery } from "@apollo/client/react"
import { RepositoriesQueryVariables } from "@/types"

const useRepositories = (params?: RepositoriesQueryVariables) => {
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: params,
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories?.pageInfo?.hasNextPage

    if (canFetchMore) {
      fetchMore({
        variables: {
          after: data?.repositories?.pageInfo?.endCursor ?? undefined,
          ...params,
        },
      })
    }
  }

  return { repositories: data?.repositories, loading, handleFetchMore }
}

export default useRepositories
