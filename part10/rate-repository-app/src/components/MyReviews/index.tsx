import { FlatList, View, Alert } from "react-native"
import ReviewItem from "../RepositoryView/ReviewItem"
import ItemSeparator from "@/components/common/ItemSeparator"
import useUser from "@/hooks/useUser"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useNavigation } from "@react-navigation/native"
import useDeleteReview from "@/hooks/useDeleteReview"

const MyReviews = () => {
  const { reviews, refetch } = useUser({ includeReviews: true })
  const navigation = useNavigation()
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : []
  const { deleteReview } = useDeleteReview({ refetch })

  const handleDeleteReview = (id: string) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review",
      [
        {
          text: "CANCEL",
          style: "cancel",
        },
        {
          text: "DELETE",
          onPress: async () => await deleteReview(id),
        },
      ],
    )
  }
  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <ReviewItem {...item}>
          <View className="mt-4 flex-row gap-4">
            <Button
              variant="brand"
              className="flex-1"
              size="lg"
              onPress={() =>
                navigation.navigate("RepositoryView", { id: item.repositoryId })
              }
            >
              <Text>View repository</Text>
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              size="lg"
              onPress={() => handleDeleteReview(item.id)}
            >
              <Text>Delete review</Text>
            </Button>
          </View>
        </ReviewItem>
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default MyReviews
