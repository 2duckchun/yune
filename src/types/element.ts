export type CustomElementBaseTag = 'div' | 'p' | 'span'

export interface CustomElementBase {
  id: string
  isGroup: false
  tag: CustomElementBaseTag
  width: number
  height: number
  color: string
  isSelected: boolean
}

export interface CustomDivElement extends CustomElementBase {
  tag: 'div'
}

export interface CustomParagraphElement extends CustomElementBase {
  tag: 'p'
  text?: string
}

export interface CustomSpanElement extends CustomElementBase {
  tag: 'span'
}

export type CustomElement =
  | CustomDivElement
  | CustomParagraphElement
  | CustomSpanElement

export type CustomElementGroup = {
  isGroup: true
  isSelected: boolean
  isVertical: boolean
  children: CustomElement[]
}

export type GlobalAlign = 'horizontal' | 'vertical'

export type DraggableCustomElement =
  | (CustomElement & { index: number })
  | (CustomElementGroup & { index: number })
