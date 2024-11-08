import {
  CustomElement,
  CustomElementGroup,
  SelectedElement
} from '@/types/element'
import { v4 as uuidv4 } from 'uuid'
import { useEffect } from 'react'

export const useElementGrouping = ({
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
      keyPressed.has('Control') &&
      (keyPressed.has('G') || keyPressed.has('ㅎ') || keyPressed.has('g'))
    ) {
      // 그룹되지 않은 요소들의 id를 추출
      const selectedUngroupedIds = new Set(
        selectedElementList
          .filter((element) => !element.isGrouped)
          .map((element) => element.id)
      )

      // 빈 그룹 생성을 막기 위해 그룹되지 않은 요소가 없으면 종료
      if (selectedUngroupedIds.size <= 1) {
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
        groupAlign: 'horizontal', // default
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
  }, [
    keyPressed,
    elementList,
    selectedElementList,
    setElementList,
    setSelectedElementList
  ])
}
