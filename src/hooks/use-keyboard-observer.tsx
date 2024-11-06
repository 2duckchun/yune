import { useEffect, useState } from 'react'

export const useKeyboardObserver = () => {
  const [keyPressed, setKeyPressed] = useState<Set<string>>(new Set())

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeyPressed((prevKeys) => new Set(prevKeys.add(event.key)))
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      setKeyPressed((prevKeys) => {
        const newKeys = new Set(prevKeys)
        newKeys.delete(event.key)
        return newKeys
      })
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  })

  return {
    keyPressed
  }
}
