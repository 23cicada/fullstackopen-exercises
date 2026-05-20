import { FlatList, Pressable } from "react-native"
import RepositoryItem from "@/components/common/RepositoryItem"
import useRepositories from "@/hooks/useRepositories"
import ItemSeparator from "@/components/common/ItemSeparator"
import { RepositoriesQuery } from "@/types"
import { useNavigation } from "@react-navigation/native"

export const RepositoryListContainer = ({
  repositories,
}: {
  repositories?: RepositoriesQuery["repositories"]
}) => {
  const navigation = useNavigation()
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => navigation.navigate("RepositoryView", { id: item.id })}
        >
          <RepositoryItem {...item} />
        </Pressable>
      )}
    />
  )
}

const RepositoryList = () => {
  const { repositories } = useRepositories()

  return <RepositoryListContainer repositories={repositories} />
}

export default RepositoryList
