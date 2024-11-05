import { FunctionComponent, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { useElementStateManagingContext } from '@/contexts/element-state-manage-context'
import { CustomDivElement } from '../element/custom-div-element'
import { CustomParagraphElement } from '../element/custom-paragraph-element'
import { CustomSpanElement } from '../element/custom-span-element'

interface PlaygroundProps extends HTMLAttributes<HTMLDivElement> {}

export const Playground: FunctionComponent<PlaygroundProps> = ({
  className,
  ...props
}): JSX.Element => {
  const { elementList, globalAlign } = useElementStateManagingContext()

  return (
    <section
      className={cn(
        'flex h-full w-full shrink-0 flex-nowrap',
        className,
        globalAlign === 'horizontal' && 'flex-row',
        globalAlign === 'vertical' && 'flex-col'
      )}
      {...props}
    >
      {elementList.map((element) => {
        if (!element.isGroup) {
          if (element.tag === 'div')
            return (
              <CustomDivElement
                className="shrink-0"
                bgColor={element.color}
                height={element.height}
                width={element.width}
              />
            )

          if (element.tag === 'p')
            return (
              <CustomParagraphElement
                className="shrink-0"
                bgColor={element.color}
                height={element.height}
                width={element.width}
              />
            )

          if (element.tag === 'span')
            return (
              <CustomSpanElement
                className="shrink-0"
                bgColor={element.color}
                height={element.height}
                width={element.width}
              />
            )
        }
      })}
    </section>
  )
}
