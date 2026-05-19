import { AUTHENTICATE } from "../graphql/mutations"
import { useMutation, useApolloClient } from "@apollo/client/react"
import useAuthStorage from "./useAuthStorage"
import { useNavigation } from "@react-navigation/native"
import { SignInFormValues } from "@/types"

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE)
  const authStorage = useAuthStorage()
  const navigation = useNavigation()
  const apolloClient = useApolloClient()

  const signIn = async ({ username, password }: SignInFormValues) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    })
    if (data?.authenticate) {
      await authStorage.setAccessToken(data.authenticate.accessToken)
      apolloClient.resetStore()
      navigation.navigate("RepositoryList")
    }
  }

  return { signIn, result }
}

export default useSignIn
