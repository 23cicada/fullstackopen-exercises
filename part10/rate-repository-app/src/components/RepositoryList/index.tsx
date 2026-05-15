import { FlatList } from "react-native"
import RepositoryItem from "../RepositoryItem"
import useRepositories from "../../hooks/useRepositories"
import { Link } from "react-router-native"
import ItemSeparator from "../ItemSeparator"
import { RepositoriesQuery } from "@/types"

export const RepositoryListContainer = ({
  repositories,
}: {
  repositories?: RepositoriesQuery["repositories"]
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Link to={`/repository/${item.id}`}>
          <RepositoryItem {...item} />
        </Link>
      )}
    />
  )
}

const RepositoryList = () => {
  const { repositories } = useRepositories()

  return <RepositoryListContainer repositories={repositories} />
}

export default RepositoryList
