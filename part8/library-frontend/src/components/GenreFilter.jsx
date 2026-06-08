import { useGenres } from "../hooks"

const GenreFilter = ({ value, onChange }) => {
  const { genres, loading } = useGenres()

  const options = genres.map(({ name }) => name)

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <button onClick={() => onChange(undefined)}>all genres</button>
      {options.map((name) => (
        <button
          key={name}
          onClick={() => {
            onChange(name === value ? undefined : name)
          }}
          style={value === name ? { borderColor: "#91caff" } : undefined}
        >
          {name}
        </button>
      ))}
    </div>
  )
}

export default GenreFilter
