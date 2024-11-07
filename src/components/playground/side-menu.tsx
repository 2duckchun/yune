import { FunctionComponent, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { useElementStateManagingContext } from '@/contexts/element-state-manage-context'
import { SideMenuElementButton } from '../element/side-menu-element-button'

interface SideMenuProps extends HTMLAttributes<HTMLDivElement> {}

export const SideMenu: FunctionComponent<SideMenuProps> = ({
  className,
  ...props
}): JSX.Element => {
  const { elementList, setGlobalAlignHander, addNewElement } =
    useElementStateManagingContext()
  return (
    <aside
      className={cn(
        'flex min-h-screen w-[250px] shrink-0 flex-col gap-3 bg-emerald-400 text-3xl',
        className
      )}
      {...props}
    >
      <div className="bg-gray-600 p-2">
        <h2 className="text-center text-lg text-gray-50">Align</h2>
        <div className="flex flex-col gap-2 p-3">
          <button
            className="text-sm"
            onClick={() => {
              setGlobalAlignHander('vertical')
            }}
          >
            All Vertically
          </button>
          <button
            className="text-sm"
            onClick={() => {
              setGlobalAlignHander('horizontal')
            }}
          >
            All Horizontally
          </button>
          <button className="text-sm">Group Vertically</button>
          <button className="text-sm">Group Horizontally</button>
        </div>
      </div>
      <div className="bg-gray-600 p-2">
        <h2 className="text-center text-lg text-gray-50">Add</h2>
        <div className="flex flex-col gap-2 p-3">
          <button className="text-sm" onClick={() => addNewElement('div')}>
            Div
          </button>
          <button className="text-sm" onClick={() => addNewElement('span')}>
            Span
          </button>
          <button className="text-sm" onClick={() => addNewElement('p')}>
            Paragraph
          </button>
        </div>
      </div>
      <div className="bg-gray-600 p-2">
        <h2 className="text-center text-lg text-gray-50">List</h2>
        <div className="flex flex-col gap-2 p-3">
          {elementList.map((element, index) => {
            if (element.isGroup) {
              return (
                <SideMenuElementButton
                  index={index}
                  id={element.id}
                  isGrouped
                  tag="group"
                />
              )
            }
            return (
              <SideMenuElementButton
                index={index}
                id={element.id}
                tag={element.tag}
              />
            )
          })}
        </div>
      </div>
    </aside>
  )
}
