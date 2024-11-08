import { makeCustomElement } from '@/lib/utils'
import {
  CustomElement,
  CustomElementBaseTag,
  CustomElementGroup,
  GlobalAlign,
  GroupAlign,
  SelectedElement
} from '@/types/element'
import { createContext, useCallback, useContext, useState } from 'react'
import { useKeyboardObserver } from '@/hooks/use-keyboard-observer'
import { useElementGrouping } from '@/hooks/element-state-manage-hooks/use-element-grouping'
import { useElementUngrouping } from '@/hooks/element-state-manage-hooks/use-element-ungrouping'

export const ElementStateStateContext = createContext<ReturnType<
  typeof useElementStateManagingHook
> | null>(null)

export const useElementStateManagingHook = () => {
  // 키 감지를 위한 hook
  const { keyPressed } = useKeyboardObserver()

  // 나열된 element를 관리하는 주요 state
  const [elementList, setElementList] = useState<
    (CustomElement | CustomElementGroup)[]
  >([])

  // 전역 정렬 state
  const [globalAlign, setGlobalAlign] = useState<GlobalAlign>('horizontal')

  // 선택된 element를 관리하는 state
  const [selectedElementList, setSelectedElementList] = useState<
    SelectedElement[]
  >([])

  // Shift + G를 눌렀을 때 element들을 그룹핑 해주는 훅
  useElementGrouping({
    elementList,
    keyPressed,
    selectedElementList,
    setElementList,
    setSelectedElementList
  })

  // Ctrl + Shift + G를 눌렀을 때 그룹들을 언그룹핑 해주는 훅
  useElementUngrouping({
    elementList,
    keyPressed,
    selectedElementList,
    setElementList,
    setSelectedElementList
  })

  // 나열된 element를 이동시키는 함수 (Drag & Drop과 연관있음)
  const moveElement = useCallback((dragIndex: number, hoverIndex: number) => {
    setElementList((prevCards: (CustomElement | CustomElementGroup)[]) => {
      const updatedCards = [...prevCards]
      // dragIndex 위치의 요소를 배열에서 삭제하고 변수에 저장
      const [removed] = updatedCards.splice(dragIndex, 1)
      // hoverIndex 위치에 삭제한 요소를 삽입합니다.
      updatedCards.splice(hoverIndex, 0, removed)
      return updatedCards
    })
  }, [])

  // 선택된 그룹의 정렬을 바꿔주는 함수
  const modifyGroupElementAlign = (direction: GroupAlign) => {
    const selectedGroupedIds = new Set(
      selectedElementList
        .filter((element) => element.isGrouped)
        .map((element) => element.id)
    )

    // 선택된 그룹이 없다면 리턴
    if (selectedGroupedIds.size === 0) return

    setElementList((prevElementList) =>
      prevElementList.map((element) => {
        // 그룹 요소인지 확인
        if (element.isGroup && selectedGroupedIds.has(element.id)) {
          return {
            ...element,
            groupAlign: direction // 새로운 정렬 방향으로 업데이트
          }
        }
        return element // 그룹이 아닐 경우 기존 요소 반환
      })
    )
  }

  // 새로운 element를 추가하는 함수
  const addNewElement = (tag: CustomElementBaseTag) => {
    const element = makeCustomElement(tag)
    const currentElementList = [...elementList]
    setElementList([...currentElementList, element])
  }

  // element를 선택하는 함수
  const setSelectElement = ({
    id,
    isGrouped
  }: {
    id: string
    isGrouped: boolean
  }) => {
    const currentSelectedElementList = [...selectedElementList]

    const isPushedShiftKey = keyPressed.has('Shift')
    // 쉬프트를 누르고 선택할 경우
    if (isPushedShiftKey) {
      setSelectedElementList([...currentSelectedElementList, { id, isGrouped }])
      return
    }

    // 선택된 엘리먼트 재 선택시
    if (currentSelectedElementList.find((element) => element.id === id)) {
      setSelectedElementList(
        currentSelectedElementList.filter((element) => element.id !== id)
      )
      return
    }

    // 선택되지 않은 엘리먼트 선택시
    if (currentSelectedElementList.length !== 0) {
      setSelectedElementList([{ id, isGrouped }])
      return
    }

    // 기본 동작
    setSelectedElementList([...currentSelectedElementList, { id, isGrouped }])
  }

  // 전역 정렬을 설정하는 함수
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
    setSelectElement,
    modifyGroupElementAlign
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
