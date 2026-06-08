const BooksTable = ({ books }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books.map(({ id, title, author, published }) => (
          <tr key={id}>
            <td>{title}</td>
            <td>{author.name}</td>
            <td>{published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BooksTable
