import Main from "./src/components/Main"
import { ApolloProvider } from "@apollo/client/react"
import createApolloClient from "./src/utils/apolloClient"
import AuthStorage from "./src/utils/authStorage"
import AuthStorageContext from "./src/contexts/AuthStorageContext"
import "./global.css"

const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage)

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
        <Main />
      </AuthStorageContext.Provider>
    </ApolloProvider>
  )
}
