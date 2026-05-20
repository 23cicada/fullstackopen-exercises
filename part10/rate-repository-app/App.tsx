import Main from "@/components/Main"
import { ApolloProvider } from "@apollo/client/react"
import createApolloClient from "@/utils/apolloClient"
import AuthStorage from "@/utils/authStorage"
import AuthStorageContext from "@/contexts/AuthStorageContext"
import { PortalHost } from "@rn-primitives/portal"
import "./global.css"

const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage)

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
        <Main />
        <PortalHost />
      </AuthStorageContext.Provider>
    </ApolloProvider>
  )
}
