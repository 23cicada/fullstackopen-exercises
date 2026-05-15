import { FlatList } from "react-native";
import ReviewItem from "./ReviewItem";
import ItemSeparator from "../ItemSeparator";
import { Reviews } from "@/types";

const ReviewList = ({ reviews }: { reviews?: Reviews }) => {
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem {...item} />}
      ItemSeparatorComponent={ItemSeparator}
      style={{ marginTop: 10 }}
    />
  );
};

export default ReviewList;
