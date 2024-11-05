import { FunctionComponent, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Playground } from '@/components/playground/playground'
import { SideMenu } from '@/components/playground/side-menu'
import { ElementStateMagagingContextProvider } from '@/providers/use-element-state-managing-context'

interface MainProps extends HTMLAttributes<HTMLDivElement> {}

export const Main: FunctionComponent<MainProps> = ({
  className,
  ...props
}): JSX.Element => {
  return (
    <ElementStateMagagingContextProvider>
      <div className={cn('flex h-screen w-full', className)} {...props}>
        <SideMenu />
        <Playground />
      </div>
    </ElementStateMagagingContextProvider>
  )
}
