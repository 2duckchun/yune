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
import { useKeyboardObserver } from '@/hooks/use-keyboard-observer'

export const ElementStateStateContext = createContext<ReturnType<
  typeof useElementStateManagingHook
> | null>(null)

export const useElementStateManagingHook = () => {
  const { keyPressed } = useKeyboardObserver()
  const [elementList, setElementList] = useState<
    (CustomElement | CustomElementGroup)[]
  >([])
  const [globalAlign, setGlobalAlign] = useState<GlobalAlign>('horizontal')
  const [selectedElementList, setSelectedElementList] = useState<string[]>([])

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

  const setSelectElement = (id: string) => {
    const currentSelectedElementList = [...selectedElementList]
    const isPushedShiftKey = keyPressed.has('Shift')
    // 쉬프트를 누르고 선택할 경우
    if (isPushedShiftKey) {
      setSelectedElementList([...currentSelectedElementList, id])
      return
    }

    // 선택된 엘리먼트 재 선택시
    if (currentSelectedElementList.includes(id)) {
      setSelectedElementList(
        currentSelectedElementList.filter((element) => element !== id)
      )
      return
    }

    // 선택되지 않은 엘리먼트 선택시
    if (currentSelectedElementList.length !== 0) {
      setSelectedElementList([id])
      return
    }
  }

  const setGlobalAlignHander = (direction: GlobalAlign) => {
    setGlobalAlign(direction)
  }

  return {
    elementList,
    globalAlign,
    selectedElementList,
    setElementList,
    setGlobalAlignHander,
    addNewElement,
    moveElement,
    setSelectElement
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
