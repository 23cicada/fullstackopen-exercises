import { CREATE_REVIEW } from "../graphql/mutations"
import { useMutation } from "@apollo/client/react"
import { useNavigate } from "react-router-native"
import { ReviewFormValues } from "@/types"

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW)
  const navigate = useNavigate()

  const createReview = async ({
    rating,
    review,
    name,
    ownerName,
  }: ReviewFormValues) => {
    const { data } = await mutate({
      variables: {
        review: {
          rating: Number(rating),
          text: review,
          repositoryName: name,
          ownerName,
        },
      },
    })
    if (data?.createReview) {
      navigate(`/repository/${data.createReview.repositoryId}`)
    }
  }

  return { createReview, result }
}

export default useReview
