import { FunctionComponent, HTMLAttributes } from 'react'
import { useElementStateManagingContext } from '@/contexts/element-state-manage-context'
import { SideMenuElementButton } from '../element/side-menu-element-button'
import { Button } from '@/components/shared/Button'

interface SideMenuProps extends HTMLAttributes<HTMLDivElement> {}

export const SideMenu: FunctionComponent<SideMenuProps> = (): JSX.Element => {
  return (
    <aside
      className={
        'flex min-h-screen w-[250px] shrink-0 flex-col gap-3 bg-emerald-400 text-3xl'
      }
    >
      <AlignButtonComponents />
      <AddElementButtonComponents />
      <ElementListAtSideMenu />
    </aside>
  )
}

const AlignButtonComponents = () => {
  const { setGlobalAlignHander, modifyGroupElementAlign } =
    useElementStateManagingContext()

  return (
    <div className="bg-gray-600 p-2">
      <h2 className="text-center text-lg text-gray-50">Align</h2>
      <div className="flex flex-col gap-2 p-3">
        <Button onClick={() => setGlobalAlignHander('vertical')}>
          All Vertically
        </Button>
        <Button onClick={() => setGlobalAlignHander('horizontal')}>
          All Horizontally
        </Button>
        <Button onClick={() => modifyGroupElementAlign('vertical')}>
          Group Vertically
        </Button>
        <Button onClick={() => modifyGroupElementAlign('horizontal')}>
          Group Horizontally
        </Button>
      </div>
    </div>
  )
}

const AddElementButtonComponents = () => {
  const { addNewElement } = useElementStateManagingContext()
  return (
    <div className="bg-gray-600 p-2">
      <h2 className="text-center text-lg text-gray-50">Add</h2>
      <div className="flex flex-col gap-2 p-3">
        <Button onClick={() => addNewElement('div')}>Div</Button>
        <Button onClick={() => addNewElement('span')}>Span</Button>
        <Button onClick={() => addNewElement('p')}>Paragraph</Button>
      </div>
    </div>
  )
}

const ElementListAtSideMenu = () => {
  const { elementList } = useElementStateManagingContext()
  return (
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
  )
}
