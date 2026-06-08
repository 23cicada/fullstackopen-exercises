import { useAuthors, useEditAuthor } from "../hooks"
import { useState } from "react"

const Authors = (props) => {
  const { authors, loading } = useAuthors()
  const { editAuthor } = useEditAuthor()
  const [name, setName] = useState("")
  const [born, setBorn] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    await editAuthor({ variables: { name, setBornTo: Number(born) } })
    setName("")
    setBorn("")
  }

  return (
    <div>
      <h2>authors</h2>
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>born</th>
                <th>books</th>
              </tr>
              {authors.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.born}</td>
                  <td>{a.bookCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {props.token && (
            <>
              <h2>Set birthyear</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  name
                  <select
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                  >
                    <option value="">Select author</option>
                    {authors.map(({ id, name }) => (
                      <option key={id} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  born
                  <input
                    value={born}
                    onChange={({ target }) => setBorn(target.value)}
                  />
                </div>
                <button type="submit">update author</button>
              </form>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Authors
