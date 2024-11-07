import { toSvg } from 'html-to-image'
import { FunctionComponent, HTMLAttributes, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useElementStateManagingContext } from '@/contexts/element-state-manage-context'
import { CustomDivElement } from '../element/custom-div-element'
import { CustomParagraphElement } from '../element/custom-paragraph-element'
import { CustomSpanElement } from '../element/custom-span-element'
import { CustomElementGroup } from '../element/custom-element-group'
import { Button } from '../shared/Button'

interface PlaygroundProps extends HTMLAttributes<HTMLDivElement> {}

export const Playground: FunctionComponent<
  PlaygroundProps
> = (): JSX.Element => {
  const { elementList, globalAlign } = useElementStateManagingContext()
  const playgroundRef = useRef(null)
  const downloadSvg = () => {
    if (playgroundRef.current === null) return

    toSvg(playgroundRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.href = dataUrl
        link.download = 'downloaded-image.svg'
        link.click()
      })
      .catch((error) => {
        console.error('SVG 변환 오류:', error)
      })
  }
  return (
    <div className="flex w-screen flex-col bg-slate-200">
      <Button
        className="w-[200px] border-2 border-fuchsia-500"
        onClick={downloadSvg}
      >
        Download to SVG
      </Button>
      <section
        ref={playgroundRef}
        className={cn(
          'flex h-full w-full shrink-0 flex-wrap',
          globalAlign === 'horizontal' && 'flex-row',
          globalAlign === 'vertical' && 'flex-col'
        )}
      >
        {elementList.map((element, index) => {
          if (element.isGroup) {
            return (
              <CustomElementGroup
                key={element.id}
                index={index}
                childElementList={element.childElementList}
                id={element.id}
                groupAlign={element.groupAlign}
              />
            )
          }

          if (element.tag === 'div')
            return (
              <CustomDivElement
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
                index={index}
                key={element.id}
                id={element.id}
                className="shrink-0"
                bgColor={element.color}
                height={element.height}
                width={element.width}
              />
            )
        })}
      </section>
    </div>
  )
}
