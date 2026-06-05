import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import { ApolloProvider } from "@apollo/client/react"
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/" }),
  cache: new InMemoryCache(),
})

const App = () => {
  const [page, setPage] = useState("authors")

  return (
    <ApolloProvider client={client}>
      <div>
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("add")}>add book</button>
        </div>

        <Authors show={page === "authors"} />

        <Books show={page === "books"} />

        <NewBook show={page === "add"} />
      </div>
    </ApolloProvider>
  )
}

export default App
