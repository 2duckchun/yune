import { useEffect, useState } from 'react'

export function useTitle(initialTitle: string) {
  const [title, setTitle] = useState(initialTitle)
  const updateTitle = () => {
    const htmlTitle = document.querySelector('title')!
    htmlTitle.innerText = title
  }

  useEffect(updateTitle, [title])
  return setTitle
}
