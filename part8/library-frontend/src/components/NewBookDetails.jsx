import { useBookAdded } from "../hooks"

const NewBookDetails = () => {
  useBookAdded(({ title, author }) => {
    window.alert(`${title} by ${author.name} added`)
  })
  return null
}

export default NewBookDetails
