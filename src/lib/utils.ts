import { CustomElementBase, CustomElementBaseTag } from '@/types/element'
import clsx from 'clsx'
import { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { v4 as uuidv4 } from 'uuid'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomHexColorCode() {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
  return randomColor
}

export const makeCustomElement = (
  tag: CustomElementBaseTag
): CustomElementBase => {
  return {
    id: uuidv4(),
    color: getRandomHexColorCode(),
    tag: tag,
    height: 200,
    width: 200,
    isGroup: false,
    isSelected: false
  }
}
