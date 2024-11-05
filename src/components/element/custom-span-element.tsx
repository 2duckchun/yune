import { FunctionComponent, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CustomSpanElementProps extends HTMLAttributes<HTMLSpanElement> {
  width: number
  height: number
  bgColor: string
}

export const CustomSpanElement: FunctionComponent<CustomSpanElementProps> = ({
  className,
  width,
  height,
  bgColor,
  ...props
}): JSX.Element => {
  return (
    <span
      className={cn(className)}
      style={{
        width: width,
        height: height,
        backgroundColor: bgColor
      }}
      {...props}
    >
      Span
    </span>
  )
}
