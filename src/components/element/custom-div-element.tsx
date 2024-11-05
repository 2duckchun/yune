import { FunctionComponent, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CustomDivElementProps extends HTMLAttributes<HTMLDivElement> {
  width: number
  height: number
  bgColor: string
}

export const CustomDivElement: FunctionComponent<CustomDivElementProps> = ({
  width,
  height,
  className,
  bgColor,
  ...props
}): JSX.Element => {
  return (
    <div
      className={cn(className)}
      style={{
        width: width,
        height: height,
        backgroundColor: bgColor
      }}
      {...props}
    >
      Div
    </div>
  )
}
