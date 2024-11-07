import { FunctionComponent, HTMLAttributes, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Align, CustomElement, DraggableCustomElement } from '@/types/element'
import { CustomDivElement } from './custom-div-element'
import { CustomParagraphElement } from './custom-paragraph-element'
import { CustomSpanElement } from './custom-span-element'
import { useElementStateManagingContext } from '@/contexts/element-state-manage-context'
import { useDrag, useDrop } from 'react-dnd'
import { Identifier, XYCoord } from 'dnd-core'
import { DRAG_ITEM_TYPE } from '@/constants/element'

interface CustomElementGroupProps extends HTMLAttributes<HTMLDivElement> {
  id: string
  index: number
  groupAlign: Align
  childElementList: CustomElement[]
}

export const CustomElementGroup: FunctionComponent<CustomElementGroupProps> = ({
  id,
  index,
  className,
  groupAlign,
  childElementList,
  ...props
}): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null)
  const { moveElement, selectedElementList, setSelectElement } =
    useElementStateManagingContext()
  const isSelected = selectedElementList.find((element) => element.id === id)
  const [{ handlerId }, drop] = useDrop<
    DraggableCustomElement,
    void,
    { handlerId: Identifier | null }
  >({
    accept: DRAG_ITEM_TYPE.element,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item: DraggableCustomElement, monitor) {
      if (!ref.current) return

      // 같은 아이템이라면 아무 행동도 일어나지 않음.
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return

      // group의 경우, Drag and Drop으로 element 교환이 잘 일어나지 않는 현상을 제어하기 위해 추가한 코드들임
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
      const hoverThreshold = 100
      if (
        dragIndex < hoverIndex &&
        hoverClientY < hoverMiddleY - hoverThreshold
      ) {
        return
      }
      if (
        dragIndex > hoverIndex &&
        hoverClientY > hoverMiddleY + hoverThreshold
      ) {
        return
      }
      moveElement(dragIndex, hoverIndex)

      /* 리액트에서는 객체의 불변성을 유지해야 하지만
      해당 경우는 index search에 대한 비용을 줄이기 위해
      monitor item의 객체를 직접 변경함. */
      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: DRAG_ITEM_TYPE.element,
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  })

  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={cn(
        'flex h-fit w-fit shrink-0 flex-nowrap',
        'bg-slate-200 p-2',
        groupAlign === 'horizontal' && 'flex-row',
        groupAlign === 'vertical' && 'flex-col',
        className,
        isSelected ? 'border-2 border-red-500' : 'border-0'
      )}
      style={{
        opacity,
        cursor: 'move'
      }}
      onClick={() => setSelectElement({ id, isGrouped: true })}
      data-handler-id={handlerId}
      {...props}
    >
      {childElementList.map((element, index) => {
        if (!element.isGroup) {
          if (element.tag === 'div')
            return (
              <CustomDivElement
                isGrouped={true}
                key={element.id}
                index={index}
                id={element.id}
                className="shrink-0"
                bgColor={element.color}
                height={element.height}
                width={element.width}
              />
            )

          if (element.tag === 'p')
            return (
              <CustomParagraphElement
                isGrouped={true}
                key={element.id}
                index={index}
                id={element.id}
                className="shrink-0"
                bgColor={element.color}
                height={element.height}
                width={element.width}
              />
            )

          if (element.tag === 'span')
            return (
              <CustomSpanElement
                isGrouped={true}
                index={index}
                id={element.id}
                className="shrink-0"
                bgColor={element.color}
                height={element.height}
                width={element.width}
              />
            )
        }
      })}
    </div>
  )
}
