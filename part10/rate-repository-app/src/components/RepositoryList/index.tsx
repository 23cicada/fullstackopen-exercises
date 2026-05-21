import { FlatList, Pressable, View } from "react-native"
import RepositoryItem from "@/components/common/RepositoryItem"
import useRepositories from "@/hooks/useRepositories"
import ItemSeparator from "@/components/common/ItemSeparator"
import { RepositoriesQuery, RepositoriesQueryVariables } from "@/types"
import { useNavigation } from "@react-navigation/native"
import OrderSelect from "./OrderSelect"
import { useState } from "react"
import SearchInput from "@/components/common/SearchInput"

interface RepositoryListContainerProps {
  repositories?: RepositoriesQuery["repositories"]
  variables?: RepositoriesQueryVariables
  onVariablesChange?: (variables: RepositoriesQueryVariables) => void
  onEndReached?: () => void
}
export const RepositoryListContainer = ({
  repositories,
  variables,
  onVariablesChange,
  onEndReached,
}: RepositoryListContainerProps) => {
  const [keyword, setKeyword] = useState<string>("")
  const navigation = useNavigation()
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        <View className="mx-4 mt-4">
          <SearchInput
            value={keyword}
            onChangeText={setKeyword}
            returnKeyType="search"
            onSubmitEditing={() =>
              onVariablesChange?.({ ...variables, searchKeyword: keyword })
            }
            onClear={() => {
              setKeyword("")
              onVariablesChange?.({ ...variables, searchKeyword: undefined })
            }}
          />
          <OrderSelect order={variables} onOrderChange={onVariablesChange} />
        </View>
      }
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
  const [variables, setVariables] = useState<RepositoriesQueryVariables>({
    orderDirection: "DESC",
    orderBy: "CREATED_AT",
    first: 5,
  })
  const { repositories, handleFetchMore } = useRepositories(variables)

  return (
    <RepositoryListContainer
      repositories={repositories}
      variables={variables}
      onVariablesChange={setVariables}
      onEndReached={handleFetchMore}
    />
  )
}

export default RepositoryList
