import { getRandomHexColorCode } from '@/lib/utils'
import {
  CustomElement,
  CustomElementBase,
  CustomElementBaseTag,
  CustomElementGroup,
  GlobalAlign,
  GroupAlign,
  SelectedElement
} from '@/types/element'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
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
  >([
    {
      id: uuidv4(),
      isGroup: true,
      isSelected: false,
      groupAlign: 'horizontal',
      childElementList: [
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
      ]
    }
  ])
  const [globalAlign, setGlobalAlign] = useState<GlobalAlign>('horizontal')
  const [selectedElementList, setSelectedElementList] = useState<
    SelectedElement[]
  >([])

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

  const modifyGroupElementAlign = (direction: GroupAlign) => {
    const selectedGroupedIds = new Set(
      selectedElementList
        .filter((element) => element.isGrouped)
        .map((element) => element.id)
    )

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

  useEffect(() => {
    if (keyPressed.has('Shift') && keyPressed.has('G')) {
      // 그룹되지 않은 요소들의 id를 추출
      const selectedUngroupedIds = new Set(
        selectedElementList
          .filter((element) => !element.isGrouped)
          .map((element) => element.id)
      )

      // 빈 그룹 생성을 막기 위해 그룹되지 않은 요소가 없으면 종료
      if (selectedUngroupedIds.size === 0) {
        return
      }

      // elementList에서 그룹되지 않은 선택된 요소 제거
      const updatedElementList = elementList.filter(
        (element) => !selectedUngroupedIds.has(element.id)
      )

      // 그룹으로 묶을 요소들 생성
      const groupedElement = {
        id: uuidv4(),
        isGroup: true,
        isSelected: false,
        groupAlign: globalAlign,
        childElementList: elementList.filter((element) =>
          selectedUngroupedIds.has(element.id)
        )
      } as CustomElementGroup

      // 새로운 그룹을 기존 elementList의 마지막에 추가
      setElementList([...updatedElementList, groupedElement])

      // 그룹이 아닌 선택된 요소들 리스트에서 제거
      setSelectedElementList((prevSelectedList) =>
        prevSelectedList.filter((element) => element.isGrouped)
      )
    }
  }, [keyPressed, elementList, selectedElementList, globalAlign])

  const addNewElement = (tag: CustomElementBaseTag) => {
    const element = makeCustomElement(tag)
    const currentElementList = [...elementList]
    setElementList([...currentElementList, element])
  }

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
