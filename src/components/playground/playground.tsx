import { FunctionComponent, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface PlaygroundProps extends HTMLAttributes<HTMLDivElement> {}

export const Playground: FunctionComponent<PlaygroundProps> = ({
  className,
  ...props
}): JSX.Element => {
  return (
    <section className={cn('h-full w-full', className)} {...props}>
      Playground
    </section>
  )
}
