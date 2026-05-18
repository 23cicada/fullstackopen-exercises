import { View, Image } from "react-native"
import Text from "./Text"
import StatItem from "./StatItem"
import { RepositoryQuery, RepositoriesQuery } from "@/types"

type RepositoryEntity =
  | NonNullable<RepositoryQuery["repository"]>
  | NonNullable<RepositoriesQuery["repositories"]>["edges"][number]["node"]

type RepositoryItemProps = RepositoryEntity & { children?: React.ReactNode }

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
  } = props
  return (
    <View className="bg-white p-4" testID="repositoryItem">
      <View className="mb-5 flex-row gap-x-5">
        <Image
          className="h-[50px] w-[50px] rounded-md"
          source={{ uri: ownerAvatarUrl ?? "" }}
        />
        <View className="flex-1 items-start gap-y-2">
          <Text type="primary" className="w-full">
            {fullName}
          </Text>
          <Text type="secondary">{description}</Text>
          <Text type="tag">{language}</Text>
        </View>
      </View>
      <View className="flex-row justify-around">
        <StatItem label="Stars" value={stargazersCount ?? 0} />
        <StatItem label="Forks" value={forksCount ?? 0} />
        <StatItem label="Reviews" value={reviewCount} />
        <StatItem label="Rating" value={ratingAverage} />
      </View>
      {children}
    </View>
  )
}

export default RepositoryItem
