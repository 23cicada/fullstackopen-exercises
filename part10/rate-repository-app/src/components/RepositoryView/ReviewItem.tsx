import { View } from "react-native"
import Text from "../Text"
import { format } from "date-fns"
import { Review } from "@/types"

const ReviewItem = ({ createdAt, rating, text, user }: Review) => {
  return (
    <View className="flex-row gap-x-4 bg-white p-4">
      <View className="h-[35px] w-[35px] items-center justify-center rounded-full border-2 border-primary">
        <Text className="font-bold text-primary">{rating}</Text>
      </View>
      <View className="flex-1">
        <Text type="primary">{user.username}</Text>
        <Text>{format(new Date(createdAt as string), "dd MMM yyyy")}</Text>
        {text && <Text>{text}</Text>}
      </View>
    </View>
  )
}

export default ReviewItem
