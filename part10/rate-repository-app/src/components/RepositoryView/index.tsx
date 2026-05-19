import useRepository from "../../hooks/useRepository"
import RepositoryItem from "../RepositoryItem"
import * as Linking from "expo-linking"
import ReviewList from "./ReviewList"
import Button from "../Button"
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
          className="mt-4"
          onPress={() => repository?.url && Linking.openURL(repository.url)}
        >
          Open in GitHub
        </Button>
      </RepositoryItem>
      <ReviewList reviews={repository?.reviews} />
    </>
  )
}

export default RepositoryView
