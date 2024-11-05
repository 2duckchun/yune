import { createContext, useContext, useState } from 'react'

export const ElementStateStateContext = createContext<ReturnType<
  typeof useElementStateManagingHook
> | null>(null)

export const useElementStateManagingHook = () => {
  const [elementList, setElementList] = useState<number>(0)
  return {
    elementList,
    setElementList
  }
}

export const useElementStateManagingContext = () => {
  const context = useContext(ElementStateStateContext)
  if (!context)
    throw new Error(
      'element state managing context가 제대로 생성되지 않았습니다.'
    )

  return context
}
