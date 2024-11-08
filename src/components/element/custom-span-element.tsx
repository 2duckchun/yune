import { FunctionComponent, HTMLAttributes, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useDrag, useDrop } from 'react-dnd'
import { DraggableCustomElement } from '@/types/element'
import { Identifier } from 'dnd-core'
import { DRAG_ITEM_TYPE } from '@/constants/element'
import { useElementStateManagingContext } from '@/contexts/element-state-manage-context'

interface CustomSpanElementProps extends HTMLAttributes<HTMLSpanElement> {
  width: number
  height: number
  bgColor: string
  id: string
  index: number
  isGrouped?: boolean
}

export const CustomSpanElement: FunctionComponent<CustomSpanElementProps> = ({
  id,
  width,
  height,
  className,
  bgColor,
  index,
  isGrouped = false,
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
    hover(item: DraggableCustomElement) {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return

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

  if (isGrouped) {
    return (
      <span
        style={{
          opacity,
          width: 100,
          height: 100,
          backgroundColor: bgColor
        }}
      >
        Grouped span
      </span>
    )
  }

  return (
    <span
      ref={ref}
      className={cn(
        className,
        isSelected ? 'border-2 border-red-500' : 'border-0'
      )}
      style={{
        opacity,
        width: width,
        height: height,
        backgroundColor: bgColor
      }}
      onClick={() => setSelectElement({ id, isGrouped })}
      data-handler-id={handlerId}
      {...props}
    >
      Span
    </span>
  )
}
