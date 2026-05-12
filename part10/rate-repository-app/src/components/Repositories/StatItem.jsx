import { View, StyleSheet } from "react-native";
import Text from "../Text";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    columnGap: 10,
  },
});

const formatCount = (value) => {
  const numberValue = Number(value);

  if (Number.isNaN(numberValue)) {
    return value;
  }

  if (numberValue >= 1000) {
    return `${(numberValue / 1000).toFixed(1)}k`;
  }

  return String(numberValue);
};

const StatItem = ({ label, value }) => {
  return (
    <View style={styles.container}>
      <Text fontWeight="bold">{formatCount(value)}</Text>
      <Text color="textSecondary">{label}</Text>
    </View>
  );
};

export default StatItem;
