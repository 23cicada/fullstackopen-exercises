import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { format } from "date-fns"
import { Review } from "@/types"

const ReviewItem = ({ createdAt, rating, text, user }: Review) => {
  return (
    <View className="flex-row gap-x-4 bg-white p-4">
      <View className="border-brand h-[35px] w-[35px] items-center justify-center rounded-full border-2">
        <Text className="text-brand font-bold">{rating}</Text>
      </View>
      <View className="flex-1">
        <Text variant="subheading">{user.username}</Text>
        <Text variant="primary">
          {format(new Date(createdAt as string), "dd MMM yyyy")}
        </Text>
        {text && <Text variant="secondary">{text}</Text>}
      </View>
    </View>
  )
}

export default ReviewItem
