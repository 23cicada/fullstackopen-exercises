import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Login from "./components/Login"
import Recommend from "./components/Recommend"
import { ApolloProvider } from "@apollo/client/react"
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from "@apollo/client"
import { SetContextLink } from "@apollo/client/link/context"
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'
import NewBookDetails from "./components/NewBookDetails"

const authLink = new SetContextLink(({ headers }) => {
  const token = localStorage.getItem("library-user-token")
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const httpLink = new HttpLink({ uri: "http://localhost:4000/" })
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000',
  }),
)

const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink),
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

const App = () => {
  const [page, setPage] = useState("authors")
  const [message, setError] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("library-user-token"))

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem("library-user-token")
    client.resetStore()
  }

  const handleLogin = (token) => {
    setToken(token)
    localStorage.setItem("library-user-token", token)
    setPage("authors")
  }

  const handleError = (error) => {
    setError(error)
    setTimeout(() => {
      setError(null)
    }, 3000)
  }

  return (
    <ApolloProvider client={client}>
      <div>
        {message && <div>{message}</div>}
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          {token ? (
            <>
              <button onClick={() => setPage("add")}>add book</button>
              <button onClick={() => setPage("recommend")}>recommend</button>
              <button onClick={() => handleLogout()}>logout</button>
            </>
          ) : (
            <button onClick={() => setPage("login")}>login</button>
          )}
        </div>
        {page === "authors" && <Authors token={token} />}
        {page === "recommend" && <Recommend />}
        {page === "books" && <Books />}
        {page === "add" && <NewBook />}
        {page === "login" && (
          <Login onError={handleError} onLogin={handleLogin} />
        )}
        <NewBookDetails />
      </div>
    </ApolloProvider>
  )
}

export default App
