import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCount = (value: string | number) => {
  const numberValue = Number(value)

  if (numberValue >= 1000) {
    return `${(numberValue / 1000).toFixed(1)}k`
  }

  return String(numberValue)
}
