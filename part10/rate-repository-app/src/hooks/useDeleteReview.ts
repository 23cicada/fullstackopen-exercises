import { useMutation } from "@apollo/client/react"
import { DELETE_REVIEW } from "@/graphql/mutations"

const useDeleteReview = ({ refetch }: { refetch: () => void }) => {
  const [mutate, result] = useMutation(DELETE_REVIEW)

  const deleteReview = async (id: string) => {
    await mutate({
      variables: {
        deleteReviewId: id,
      },
    })
    refetch()
  }

  return {
    deleteReview,
    result,
  }
}

export default useDeleteReview
