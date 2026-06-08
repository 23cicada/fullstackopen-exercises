import { gql } from "@apollo/client"

const AUTHOR_FRAGMENT = gql`
  fragment AuthorFragment on Author {
    name
    born
    id
    bookCount
  }
`

const GENRE_FRAGMENT = gql`
  fragment GenreFragment on Genre {
    name
    id
  }
`

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

const ALL_GENRES = gql`
  query {
    allGenres {
      name
      id
    }
  }
`

const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        ...AuthorFragment
      }
      genres {
        ...GenreFragment
      }
    }
  }
  ${AUTHOR_FRAGMENT}
  ${GENRE_FRAGMENT}
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
        ...AuthorFragment
      }
      genres {
        ...GenreFragment
      }
    }
  }
  ${AUTHOR_FRAGMENT}
  ${GENRE_FRAGMENT}
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const ME = gql`
  query me {
    me {
      favoriteGenre {
        name
      }
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      author {
        ...AuthorFragment
      }
      genres {
        ...GenreFragment
      }
    }
  }
  ${AUTHOR_FRAGMENT}
  ${GENRE_FRAGMENT}
`

export { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, EDIT_AUTHOR, LOGIN, ALL_GENRES, ME }
