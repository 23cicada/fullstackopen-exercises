import { isNotNumber } from "./utils.ts"

interface ExerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface ExerciseValues {
  target: number
  dailyHours: number[]
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) {
    throw new Error("Not enough arguments")
  }

  const numericArgs = args.slice(2)
  if (numericArgs.some((arg) => isNotNumber(arg))) {
    throw new Error("Provided values were not numbers!")
  }

  const [target, ...dailyHours] = numericArgs.map(Number)
  return { target, dailyHours }
}

const calculateExercises = (
  dailyHours: number[],
  target: number,
): ExerciseResult => {
  const periodLength = dailyHours.length
  const trainingDays = dailyHours.filter((hours) => hours > 0).length
  const average =
    periodLength === 0
      ? 0
      : dailyHours.reduce((sum, hours) => sum + hours, 0) / periodLength
  const success = average >= target

  let rating: number
  let ratingDescription: string
  if (average >= target) {
    rating = 3
    ratingDescription = "great job, target reached"
  } else if (average >= target * 0.75) {
    rating = 2
    ratingDescription = "not too bad but could be better"
  } else {
    rating = 1
    ratingDescription = "you should train more"
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, dailyHours } = parseExerciseArguments(process.argv)
    console.log(calculateExercises(dailyHours, target))
  } catch (error: unknown) {
    let errorMessage = "Something went wrong."
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message
    }
    console.log(errorMessage)
  }
}

export default calculateExercises
