import { gql } from "@apollo/client"

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
        born
        id
        bookCount
      }
      genres {
        name
        id
      }
      id
    }
  }
`

const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author {
        name
        born
        id
        bookCount
      }
      genres {
        name
        id
      }
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, EDIT_AUTHOR }
