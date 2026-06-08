import { useBooks, useMe } from "../hooks"
import BooksTable from "./BooksTable"

const Recommend = () => {
  const { me, loading: meLoading } = useMe()
  const favoriteGenre = me?.favoriteGenre?.name
  const { books, loading } = useBooks({
    genre: favoriteGenre,
    skip: !favoriteGenre,
  })

  if (loading || meLoading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      {favoriteGenre ? (
        <>
          <p>
            books in your favorite genre <span>{favoriteGenre}</span>
          </p>
          <BooksTable books={books} />
        </>
      ) : (
        <p>no favorite genre yet</p>
      )}
    </div>
  )
}

export default Recommend
