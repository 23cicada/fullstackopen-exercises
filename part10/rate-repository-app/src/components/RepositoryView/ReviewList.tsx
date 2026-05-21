import { FlatList } from "react-native"
import ReviewItem from "./ReviewItem"
import ItemSeparator from "@/components/common/ItemSeparator"
import { Reviews } from "@/types"

interface ReviewListProps {
  reviews?: Reviews
  className?: string
  onEndReached?: () => void
}
const ReviewList = ({ reviews, className, onEndReached }: ReviewListProps) => {
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : []

  return (
    <FlatList
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      className={className}
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem {...item} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default ReviewList
