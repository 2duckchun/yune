import { FunctionComponent, HTMLAttributes, useRef } from 'react'
import { cn } from '@/lib/utils'
import { CustomElementBaseTag, DraggableCustomElement } from '@/types/element'
import { useDrag, useDrop } from 'react-dnd'
import { Identifier } from 'dnd-core'
import { DRAG_ITEM_TYPE } from '@/constants/element'
import { useElementStateManagingContext } from '@/contexts/element-state-manage-context'

interface SideMenuElementButtonProps extends HTMLAttributes<HTMLButtonElement> {
  id: string
  tag: CustomElementBaseTag | 'group'
  isGrouped?: boolean
  index: number
}

export const SideMenuElementButton: FunctionComponent<
  SideMenuElementButtonProps
> = ({
  id,
  index,
  className,
  tag,
  isGrouped = false,
  ...props
}): JSX.Element => {
  const { selectedElementList, moveElement, setSelectElement } =
    useElementStateManagingContext()
  const isSelected = selectedElementList.find((element) => element.id === id)
  const ref = useRef<HTMLButtonElement>(null)
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

      // 같은 아이템이라면 아무 행동도 일어나지 않음.
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
  return (
    <button
      ref={ref}
      className={cn(
        'text-sm',
        className,
        isSelected ? 'border-2 border-red-500' : 'border-0'
      )}
      style={{
        opacity
      }}
      onClick={() => setSelectElement({ id, isGrouped })}
      data-handler-id={handlerId}
      {...props}
    >
      {tag}
    </button>
  )
}
