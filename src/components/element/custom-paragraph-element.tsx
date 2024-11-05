import { FunctionComponent, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CustomParagraphElementProps
  extends HTMLAttributes<HTMLParagraphElement> {
  width: number
  height: number
  bgColor: string
}

export const CustomParagraphElement: FunctionComponent<
  CustomParagraphElementProps
> = ({ width, height, className, bgColor, ...props }): JSX.Element => {
  return (
    <p
      className={cn(className)}
      style={{
        width: width,
        height: height,
        backgroundColor: bgColor
      }}
      {...props}
    >
      paragraph
    </p>
  )
}
