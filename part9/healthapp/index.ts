import express from "express"
import bmiRouter from "./controllers/bmi.ts"
import exercisesRouter from "./controllers/exercises.ts"

const app = express()

app.use(express.json())

app.use("/bmi", bmiRouter)
app.use("/exercises", exercisesRouter)
app.get("/hello", (_, res) => {
  res.send("Hello Full Stack!")
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
