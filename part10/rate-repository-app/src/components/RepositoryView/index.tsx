import useRepository from "@/hooks/useRepository"
import RepositoryItem from "@/components/common/RepositoryItem"
import * as Linking from "expo-linking"
import ReviewList from "./ReviewList"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { StaticScreenProps } from "@react-navigation/native"
import { RootStackParamList } from "@/types"

const RepositoryView = ({
  route,
}: StaticScreenProps<RootStackParamList["RepositoryView"]>) => {
  const { repository } = useRepository({ repositoryId: route.params.id })

  if (!repository) return null

  return (
    <>
      <RepositoryItem {...repository}>
        <Button
          variant="brand"
          className="mt-4"
          onPress={() => repository?.url && Linking.openURL(repository.url)}
        >
          <Text>Open in GitHub</Text>
        </Button>
      </RepositoryItem>
      <ReviewList reviews={repository?.reviews} />
    </>
  )
}

export default RepositoryView
