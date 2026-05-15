import Main from "./src/components/Main"
import { StatusBar } from "expo-status-bar"
import { NativeRouter } from "react-router-native"
import { ApolloProvider } from "@apollo/client/react"
import createApolloClient from "./src/utils/apolloClient"
import AuthStorage from "./src/utils/authStorage"
import AuthStorageContext from "./src/contexts/AuthStorageContext"
import "./global.css"

const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage)

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
    </>
  )
}
