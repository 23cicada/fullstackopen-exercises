import { View, StyleSheet } from "react-native"
import Text from "./Text"
import { formatCount } from "../utils"

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    columnGap: 10,
  },
})

interface StatItemProps {
  label: string
  value: number
}

const StatItem = ({ label, value }: StatItemProps) => {
  return (
    <View style={styles.container}>
      <Text fontWeight="bold">{formatCount(value)}</Text>
      <Text color="textSecondary">{label}</Text>
    </View>
  )
}

export default StatItem
