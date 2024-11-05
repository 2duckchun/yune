import { getRandomHexColorCode } from '@/lib/utils'
import {
  CustomElement,
  CustomElementBase,
  CustomElementBaseTag,
  CustomElementGroup,
  GlobalAlign
} from '@/types/element'
import { createContext, useContext, useState } from 'react'

export const ElementStateStateContext = createContext<ReturnType<
  typeof useElementStateManagingHook
> | null>(null)

export const useElementStateManagingHook = () => {
  const [elementList, setElementList] = useState<
    (CustomElement | CustomElementGroup)[]
  >([
    {
      isGroup: false,
      tag: 'div',
      color: getRandomHexColorCode(),
      height: 200,
      width: 200,
      isSelected: false
    },
    {
      isGroup: false,
      tag: 'span',
      color: getRandomHexColorCode(),
      height: 200,
      width: 200,
      isSelected: false
    },
    {
      isGroup: false,
      tag: 'p',
      color: getRandomHexColorCode(),
      height: 200,
      width: 200,
      isSelected: false
    }
  ])
  const [globalAlign, setGlobalAlign] = useState<GlobalAlign>('horizontal')

  const addNewElement = (tag: CustomElementBaseTag) => {
    const element: CustomElementBase = {
      color: getRandomHexColorCode(),
      tag: tag,
      height: 200,
      width: 200,
      isGroup: false,
      isSelected: false
    }

    const currentElementList = [...elementList]
    setElementList([...currentElementList, element])
  }

  const setGlobalAlignHander = (direction: GlobalAlign) => {
    setGlobalAlign(direction)
  }

  return {
    elementList,
    globalAlign,
    setElementList,
    setGlobalAlignHander,
    addNewElement
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
