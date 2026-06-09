import { isNotNumber } from "./utils.ts"

interface BmiValues {
  height: number
  weight: number
}

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) {
    throw new Error("Not enough arguments")
  }
  if (args.length > 4) {
    throw new Error("Too many arguments")
  }
  if (isNotNumber(args[2]) || isNotNumber(args[3])) {
    throw new Error("Provided values were not numbers!")
  }
  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  }
}

const bmiCalculator = (height: number, weight: number): string => {
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)

  if (bmi < 16.0) {
    return "Underweight (severe thinness)"
  } else if (bmi < 17.0) {
    return "Underweight (moderate thinness)"
  } else if (bmi < 18.5) {
    return "Underweight (mild thinness)"
  } else if (bmi < 25.0) {
    return "Normal range"
  } else if (bmi < 30.0) {
    return "Overweight (pre-obese)"
  } else if (bmi < 35.0) {
    return "Obese (class I)"
  } else if (bmi < 40.0) {
    return "Obese (class II)"
  } else {
    return "Obese (class III)"
  }
}

if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = parseBmiArguments(process.argv)
    console.log(bmiCalculator(height, weight))
  } catch (error: unknown) {
    let errorMessage = "Something went wrong."
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message
    }
    console.log(errorMessage)
  }
}

export default bmiCalculator
