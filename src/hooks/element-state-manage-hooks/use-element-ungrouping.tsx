import {
  CustomElement,
  CustomElementGroup,
  SelectedElement
} from '@/types/element'
import { useEffect } from 'react'

export const useElementUngrouping = ({
  elementList,
  keyPressed,
  selectedElementList,
  setElementList,
  setSelectedElementList
}: {
  keyPressed: Set<string>
  elementList: (CustomElement | CustomElementGroup)[]
  selectedElementList: SelectedElement[]
  setElementList: React.Dispatch<
    React.SetStateAction<(CustomElement | CustomElementGroup)[]>
  >
  setSelectedElementList: React.Dispatch<
    React.SetStateAction<SelectedElement[]>
  >
}) => {
  useEffect(() => {
    if (
      keyPressed.has('Shift') &&
      keyPressed.has('Control') &&
      (keyPressed.has('G') || keyPressed.has('ㅎ'))
    ) {
      // 시간복잡도를 고려하여 Set 자료구조 사용 (2중 for문 지양)
      const selectedGroupedIds = new Set(
        selectedElementList
          .filter((element) => element.isGrouped)
          .map((element) => element.id)
      )

      if (selectedGroupedIds.size === 0) return

      // 선택된 그룹 요소들을 찾고 각각의 childElementList를 얻음
      const groupsToUngroup = elementList.filter((element) =>
        selectedGroupedIds.has(element.id)
      ) as CustomElementGroup[]

      if (groupsToUngroup.length === 0) return // 그룹을 찾지 못한 경우 종료

      // 각각 자식요소들을 가져옴 (평탄화)
      const allChildElements = groupsToUngroup.flatMap(
        (group) => group.childElementList
      )

      // 원래 그룹들을 제거함
      const updatedElementList = elementList.filter(
        (element) => !selectedGroupedIds.has(element.id)
      )
      const newElementList = [...updatedElementList]

      // 자식 요소를 원래 위치에 추가
      allChildElements.forEach((child) => {
        const originalIndex = elementList.findIndex(
          (element) => element.id === child.id
        )
        if (originalIndex === -1) {
          // 원래 위치를 찾지 못한 경우, 리스트의 끝에 추가
          newElementList.push(child)
        } else {
          // 자식 요소가 원래 배열에 있을 경우, 해당 위치에 추가
          newElementList.splice(originalIndex, 0, child)
        }
      })

      // element 업데이트
      setElementList(newElementList)

      // 선택된 요소 리스트에서 그룹된 요소 제거
      setSelectedElementList((prevSelectedList) =>
        prevSelectedList.filter(
          (element) => !selectedGroupedIds.has(element.id)
        )
      )
    }
  }, [
    keyPressed,
    elementList,
    selectedElementList,
    setElementList,
    setSelectedElementList
  ])
}
