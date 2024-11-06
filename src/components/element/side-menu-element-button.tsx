import { FunctionComponent, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { CustomElementBaseTag } from '@/types/element'

interface SideMenuElementButtonProps extends HTMLAttributes<HTMLButtonElement> {
  tag: CustomElementBaseTag
}

export const SideMenuElementButton: FunctionComponent<
  SideMenuElementButtonProps
> = ({ className, tag, ...props }): JSX.Element => {
  return (
    <button className={cn('text-sm', className)} {...props}>
      {tag}
    </button>
  )
}
