import { FunctionComponent, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const Button: FunctionComponent<ButtonProps> = ({
  className,
  children,
  ...props
}): JSX.Element => {
  return (
    <button className={cn('text-sm', className)} {...props}>
      {children}
    </button>
  )
}
