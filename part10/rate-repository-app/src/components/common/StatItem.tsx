import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { formatCount } from "@/utils"

interface StatItemProps {
  label: string
  value: number
}

const StatItem = ({ label, value }: StatItemProps) => {
  return (
    <View className="flex items-center gap-x-2">
      <Text variant="subheading">{formatCount(value)}</Text>
      <Text variant="secondary">{label}</Text>
    </View>
  )
}

export default StatItem
