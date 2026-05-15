import { View, StyleSheet } from "react-native";
import Text from "../Text";
import theme from "../../theme";
import { format } from "date-fns";
import { Review } from "@/types";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 16,
    flexDirection: "row",
    columnGap: 16,
  },
  rating: {
    width: 35,
    height: 35,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
});

const ReviewItem = ({ createdAt, rating, text, user }: Review) => {
  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text color="primary" fontWeight="bold">
          {rating}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text fontWeight="bold">{user.username}</Text>
        <Text>{format(new Date(createdAt as string), "dd MMM yyyy")}</Text>
        {text && <Text>{text}</Text>}
      </View>
    </View>
  );
};

export default ReviewItem;
