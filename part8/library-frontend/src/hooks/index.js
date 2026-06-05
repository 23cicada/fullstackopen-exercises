import { useQuery, useMutation } from "@apollo/client/react"
import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, EDIT_AUTHOR } from "../queries"

const useAuthors = () => {
  const { loading, data } = useQuery(ALL_AUTHORS)

  return {
    loading,
    authors: data?.allAuthors ?? [],
  }
}

const useBooks = () => {
  const { loading, data } = useQuery(ALL_BOOKS)

  return {
    loading,
    books: data?.allBooks ?? [],
  }
}

const useAddBook = () => {
  const [mutate, result] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  })

  return {
    addBook: mutate,
    result,
  }
}

const useEditAuthor = () => {
  const [mutate, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  return {
    editAuthor: mutate,
    result,
  }
}

export { useAuthors, useBooks, useAddBook, useEditAuthor }
