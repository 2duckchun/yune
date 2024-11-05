import { FunctionComponent, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { useElementStateManagingContext } from '@/contexts/element-state-manage-context'

interface PlaygroundProps extends HTMLAttributes<HTMLDivElement> {}

export const Playground: FunctionComponent<PlaygroundProps> = ({
  className,
  ...props
}): JSX.Element => {
  const { elementList } = useElementStateManagingContext()

  return (
    <section className={cn('h-full w-full', className)} {...props}>
      Playground
      {elementList}
      <button onClick={() => {}}>test button</button>
    </section>
  )
}
