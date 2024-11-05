import { FunctionComponent, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Playground } from '@/components/playground/playground'
import { SideMenu } from '@/components/playground/side-menu'

interface MainProps extends HTMLAttributes<HTMLDivElement> {}

export const Main: FunctionComponent<MainProps> = ({
  className,
  ...props
}): JSX.Element => {
  return (
    <div className={cn('flex h-screen w-full', className)} {...props}>
      <SideMenu />
      <Playground />
    </div>
  )
}
