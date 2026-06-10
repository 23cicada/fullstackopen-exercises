import { useEffect, useState } from "react"
import service from "./service"
import type { DiaryEntry, NewDiaryEntry } from "./types"
import DiaryForm from "./DiaryForm"

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [error, setError] = useState("")
  useEffect(() => {
    service.getAll().then(data => {
      setDiaries(data)
    })
  }, [])

  const addDiary = (entry: NewDiaryEntry) => {
    service.create(entry)
      .then(created => {
        setDiaries(diaries.concat(created))
        setError("")
      })
      .catch((e: Error) => {
        setError(e.message)
      })
  }

  return (
    <div>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <DiaryForm onCreate={addDiary} />
      <h3>Diary entries</h3>
      {diaries.map(diary => (
        <div key={diary.id}>
          <h4>{diary.date}</h4>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  )
}

export default App
