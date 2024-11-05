import {
  ElementStateStateContext,
  useElementStateManagingHook
} from '@/contexts/element-state-manage-context'
import { ReactNode } from 'react'

export const ElementStateMagagingContextProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const data = useElementStateManagingHook()
  return (
    <ElementStateStateContext.Provider value={data}>
      {children}
    </ElementStateStateContext.Provider>
  )
}
