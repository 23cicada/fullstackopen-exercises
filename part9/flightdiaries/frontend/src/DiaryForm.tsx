import { useState } from "react"
import type { NewDiaryEntry, Weather, Visibility } from "./types"

interface DiaryFormProps {
  onCreate: (entry: NewDiaryEntry) => void
}

const weatherOptions: Weather[] = ["sunny", "rainy", "cloudy", "windy", "stormy"]
const visibilityOptions: Visibility[] = ["great", "good", "ok", "poor"]

const DiaryForm = ({ onCreate }: DiaryFormProps) => {
  const [date, setDate] = useState("")
  const [visibility, setVisibility] = useState<Visibility>("great")
  const [weather, setWeather] = useState<Weather>("sunny")
  const [comment, setComment] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onCreate({ date, visibility, weather, comment })
    setDate("")
    setVisibility("great")
    setWeather("sunny")
    setComment("")
  }

  return (
    <div>
      <h3>Add new entry</h3>
      <form onSubmit={handleSubmit}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={event => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility
          {visibilityOptions.map(option => (
            <label key={option}>
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={visibility === option}
                onChange={() => setVisibility(option)}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          weather
          {weatherOptions.map(option => (
            <label key={option}>
              <input
                type="radio"
                name="weather"
                value={option}
                checked={weather === option}
                onChange={() => setWeather(option)}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={event => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default DiaryForm
