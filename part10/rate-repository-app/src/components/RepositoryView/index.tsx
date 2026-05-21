import useRepository from "@/hooks/useRepository"
import RepositoryItem from "@/components/common/RepositoryItem"
import * as Linking from "expo-linking"
import ReviewList from "./ReviewList"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { StaticScreenProps } from "@react-navigation/native"
import { RootStackParamList } from "@/types"
import { View } from "react-native"

const RepositoryView = ({
  route,
}: StaticScreenProps<RootStackParamList["RepositoryView"]>) => {
  const { repository, handleFetchMore } = useRepository({
    repositoryId: route.params.id,
  })

  if (!repository) return null

  return (
    <View className="flex-1 flex-col">
      <RepositoryItem {...repository} className="border-b border-border">
        <Button
          variant="brand"
          className="mt-4"
          onPress={() => repository?.url && Linking.openURL(repository.url)}
        >
          <Text>Open in GitHub</Text>
        </Button>
      </RepositoryItem>
      <ReviewList
        reviews={repository?.reviews}
        className="pt-2.5"
        onEndReached={handleFetchMore}
      />
    </View>
  )
}

export default RepositoryView
