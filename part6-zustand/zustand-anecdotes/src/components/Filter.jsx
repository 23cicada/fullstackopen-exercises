import { useAnecdoteActions } from '../stores'

const Filter = () => {
  const { setFilter } = useAnecdoteActions()

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div style={{ marginBottom: 10 }}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
