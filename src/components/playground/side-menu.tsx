import { FunctionComponent, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SideMenuProps extends HTMLAttributes<HTMLDivElement> {}

export const SideMenu: FunctionComponent<SideMenuProps> = ({
  className,
  ...props
}): JSX.Element => {
  return (
    <aside
      className={cn(
        'flex h-full w-[250px] flex-col gap-3 bg-emerald-400 text-3xl',
        className
      )}
      {...props}
    >
      <div className="bg-gray-600 p-2">
        <h2 className="text-center text-lg text-gray-50">Align</h2>
        <div className="flex flex-col gap-2 p-3">
          <button className="text-sm">All Vertically</button>
          <button className="text-sm">All Horizontally</button>
          <button className="text-sm">Group Vertically</button>
          <button className="text-sm">Group Horizontally</button>
        </div>
      </div>
      <div className="bg-gray-600 p-2">
        <h2 className="text-center text-lg text-gray-50">Add</h2>
        <div className="flex flex-col gap-2 p-3">
          <button className="text-sm">Div</button>
          <button className="text-sm">Span</button>
          <button className="text-sm">Paragraph</button>
        </div>
      </div>
    </aside>
  )
}
