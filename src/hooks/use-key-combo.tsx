import { useEffect, useState } from 'react'
import { useKeyboardObserver } from './use-keyboard-observer'

export function useKeyCombo(targetKeys: string[]) {
  const { keyPressed } = useKeyboardObserver()
  const [comboPressed, setComboPressed] = useState(false)

  useEffect(() => {
    const isComboPressed = targetKeys.every((key) => keyPressed.has(key))
    setComboPressed(isComboPressed)
  }, [keyPressed, targetKeys])

  return comboPressed
}
