import { CREATE_REVIEW } from "../graphql/mutations"
import { useMutation } from "@apollo/client/react"
import { useNavigation } from "@react-navigation/native"
import { ReviewFormValues } from "@/types"

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW)
  const navigation = useNavigation()

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
      navigation.navigate("RepositoryView", {
        id: data.createReview.repositoryId,
      })
    }
  }

  return { createReview, result }
}

export default useReview
