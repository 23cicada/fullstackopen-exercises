import { useQuery, useMutation } from "@apollo/client/react"
import {
  ALL_AUTHORS,
  ALL_BOOKS,
  ADD_BOOK,
  EDIT_AUTHOR,
  LOGIN,
  ALL_GENRES,
  ME,
} from "../queries"

const useAuthors = () => {
  const { loading, data } = useQuery(ALL_AUTHORS)

  return {
    loading,
    authors: data?.allAuthors ?? [],
  }
}

const useGenres = () => {
  const { loading, data } = useQuery(ALL_GENRES)

  return {
    loading,
    genres: data?.allGenres ?? [],
  }
}

const useBooks = ({ genre, skip = false }) => {
  const { loading, data } = useQuery(ALL_BOOKS, { variables: { genre }, skip })

  return {
    loading,
    books: data?.allBooks ?? [],
  }
}

const useAddBook = () => {
  const [mutate, result] = useMutation(ADD_BOOK, {
    update: (cache) => {
      cache.evict({ fieldName: "allBooks" })
      cache.evict({ fieldName: "allGenres" })
      cache.evict({ fieldName: "allAuthors" })
    },
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

const useLogin = ({ onError, onLogin }) => {
  const [mutate, result] = useMutation(LOGIN)

  const login = async (username, password) => {
    try {
      const { data } = await mutate({ variables: { username, password } })
      onLogin(data.login.value)
    } catch (error) {
      onError(`login failed: ${error.message}`)
    }
  }

  return {
    result,
    login,
  }
}

const useMe = () => {
  const { loading, data } = useQuery(ME)

  return {
    loading,
    me: data?.me ?? null,
  }
}

export {
  useAuthors,
  useBooks,
  useAddBook,
  useEditAuthor,
  useLogin,
  useGenres,
  useMe,
}
