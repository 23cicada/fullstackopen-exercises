import { useBooks } from "../hooks"
import { useState } from "react"
import GenreFilter from "./GenreFilter"
import BooksTable from "./BooksTable"

const Books = () => {
  const [genre, setGenre] = useState()
  const { books, loading } = useBooks({ genre })

  return (
    <div>
      <h2>books</h2>
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          {genre && <p>in genre {genre}</p>}

          <BooksTable books={books} />
          <GenreFilter value={genre} onChange={setGenre} />
        </>
      )}
    </div>
  )
}

export default Books
