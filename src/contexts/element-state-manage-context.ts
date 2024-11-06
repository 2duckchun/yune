import { getRandomHexColorCode } from '@/lib/utils'
import {
  CustomElement,
  CustomElementBase,
  CustomElementBaseTag,
  CustomElementGroup,
  GlobalAlign
} from '@/types/element'
import { createContext, useCallback, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import update from 'immutability-helper'

export const ElementStateStateContext = createContext<ReturnType<
  typeof useElementStateManagingHook
> | null>(null)

export const useElementStateManagingHook = () => {
  const [elementList, setElementList] = useState<
    (CustomElement | CustomElementGroup)[]
  >([
    {
      id: uuidv4(),
      isGroup: false,
      tag: 'div',
      color: getRandomHexColorCode(),
      height: 200,
      width: 200,
      isSelected: false
    },
    {
      id: uuidv4(),
      isGroup: false,
      tag: 'div',
      color: getRandomHexColorCode(),
      height: 200,
      width: 200,
      isSelected: false
    },
    {
      id: uuidv4(),
      isGroup: false,
      tag: 'div',
      color: getRandomHexColorCode(),
      height: 200,
      width: 200,
      isSelected: false
    },
    {
      id: uuidv4(),
      isGroup: false,
      tag: 'div',
      color: getRandomHexColorCode(),
      height: 200,
      width: 200,
      isSelected: false
    }
  ])
  const [globalAlign, setGlobalAlign] = useState<GlobalAlign>('horizontal')

  const moveElement = useCallback((dragIndex: number, hoverIndex: number) => {
    setElementList((prevCards: (CustomElement | CustomElementGroup)[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [
            hoverIndex,
            0,
            prevCards[dragIndex] as CustomElement | CustomElementGroup
          ]
        ]
      })
    )
  }, [])

  const addNewElement = (tag: CustomElementBaseTag) => {
    const element = makeCustomElement(tag)
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
    addNewElement,
    moveElement
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

const makeCustomElement = (tag: CustomElementBaseTag): CustomElementBase => {
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
