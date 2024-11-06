import { FunctionComponent, HTMLAttributes, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useDrag, useDrop } from 'react-dnd'
import { DraggableCustomElement } from '@/types/element'
import { Identifier } from 'dnd-core'
import { DRAG_ITEM_TYPE } from '@/constants/element'

interface CustomSpanElementProps extends HTMLAttributes<HTMLSpanElement> {
  width: number
  height: number
  bgColor: string
  id: string
  index: number
  moveElement: (dragIndex: number, hoverIndex: number) => void
}

export const CustomSpanElement: FunctionComponent<CustomSpanElementProps> = ({
  id,
  width,
  height,
  className,
  bgColor,
  index,
  moveElement,
  ...props
}): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null)
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
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      moveElement(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
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
    <span
      ref={ref}
      className={cn(className)}
      style={{
        opacity,
        width: width,
        height: height,
        backgroundColor: bgColor
      }}
      data-handler-id={handlerId}
      {...props}
    >
      Span
    </span>
  )
}
