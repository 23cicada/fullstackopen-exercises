import { GET_REPOSITORY } from "../graphql/queries"
import { useQuery } from "@apollo/client/react"

const useRepository = ({ repositoryId }: { repositoryId: string }) => {
  const variables = { repositoryId, first: 5 }
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables,
  })

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository?.reviews?.pageInfo?.hasNextPage

    if (canFetchMore) {
      fetchMore({
        variables: {
          ...variables,
          after: data?.repository?.reviews?.pageInfo?.endCursor ?? undefined,
        },
      })
    }
  }

  return { repository: data?.repository, loading, handleFetchMore }
}

export default useRepository
