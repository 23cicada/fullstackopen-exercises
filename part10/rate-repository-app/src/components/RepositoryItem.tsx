import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import StatItem from "./StatItem";
import { RepositoryQuery, RepositoriesQuery } from "@/types";

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  container: {
    padding: 16,
    backgroundColor: theme.colors.white,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: 20,
    marginBottom: 20,
  },
  infoTextContainer: {
    flex: 1,
    display: "flex",
    alignItems: "flex-start",
    rowGap: 6,
    marginTop: 4,
  },
  statsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  languageTag: {
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
});

type RepositoryEntity =
  | NonNullable<RepositoryQuery["repository"]>
  | NonNullable<RepositoriesQuery["repositories"]>["edges"][number]["node"];

type RepositoryItemProps = RepositoryEntity & { children?: React.ReactNode };

const RepositoryItem = (props: RepositoryItemProps) => {
  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
    children,
  } = props;
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.infoContainer}>
        <Image style={styles.avatar} source={{ uri: ownerAvatarUrl ?? "" }} />
        <View style={styles.infoTextContainer}>
          <Text fontWeight="bold">{fullName}</Text>
          <Text color="textSecondary">{description}</Text>
          <Text style={styles.languageTag}>{language}</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <StatItem label="Stars" value={stargazersCount ?? 0} />
        <StatItem label="Forks" value={forksCount ?? 0} />
        <StatItem label="Reviews" value={reviewCount} />
        <StatItem label="Rating" value={ratingAverage} />
      </View>
      {children}
    </View>
  );
};

export default RepositoryItem;
