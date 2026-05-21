import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { format } from "date-fns"
import { Review } from "@/types"

interface ReviewItemProps extends Review {
  children?: React.ReactNode
}
const ReviewItem = ({
  createdAt,
  rating,
  text,
  user,
  children,
}: ReviewItemProps) => {
  return (
    <View className="bg-white p-4">
      <View className="flex-row gap-x-4">
        <View className="h-[35px] w-[35px] items-center justify-center rounded-full border-2 border-brand">
          <Text className="font-bold text-brand">{rating}</Text>
        </View>
        <View className="flex-1">
          <Text variant="subheading">{user.username}</Text>
          <Text variant="primary">
            {format(new Date(createdAt as string), "dd MMM yyyy")}
          </Text>
          {text && <Text variant="secondary">{text}</Text>}
        </View>
      </View>
      {children}
    </View>
  )
}

export default ReviewItem
