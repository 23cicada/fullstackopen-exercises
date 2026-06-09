import { Router } from "express"
import bmiCalculator from "../bmiCalculator.ts"
import { isNotNumber } from "../utils.ts"

const bmiRouter = Router()

bmiRouter.get("/", (req, res) => {
  const { weight: rawWeight, height: rawHeight } = req.query
  const weight = Number(rawWeight)
  const height = Number(rawHeight)
  if (isNotNumber(weight) || isNotNumber(height)) {
    return res.status(400).json({ error: "malformatted parameters" })
  }
  const bmi = bmiCalculator(height, weight)
  return res.json({ weight, height, bmi })
})

export default bmiRouter
