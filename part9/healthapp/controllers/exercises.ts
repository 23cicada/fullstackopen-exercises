import { Router, type Request } from "express"
import calculateExercises from "../exerciseCalculator.ts"
import { isNotNumber } from "../utils.ts"
const exercisesRouter = Router()

interface ExerciseRequest extends Request {
  body: { target: number; daily_exercises: number[] }
}

exercisesRouter.post("/", (req: ExerciseRequest, res) => {
  const { target, daily_exercises } = req.body

  if (target === undefined || daily_exercises === undefined) {
    return res.status(400).json({ error: "parameters missing" })
  }

  if (
    isNotNumber(target) ||
    daily_exercises.some((hours: number) => isNotNumber(hours))
  ) {
    return res.status(400).json({ error: "malformatted parameters" })
  }
  const result = calculateExercises(daily_exercises, target)
  return res.json(result)
})

export default exercisesRouter
