import { View } from "react-native"
import Text from "./Text"
import { formatCount } from "../utils"

interface StatItemProps {
  label: string
  value: number
}

const StatItem = ({ label, value }: StatItemProps) => {
  return (
    <View className="flex items-center gap-x-2.5">
      <Text type="primary">{formatCount(value)}</Text>
      <Text>{label}</Text>
    </View>
  )
}

export default StatItem
