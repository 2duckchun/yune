import clsx from 'clsx'
import { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomHexColorCode() {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
  return randomColor
}
