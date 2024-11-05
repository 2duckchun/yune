interface CustomElementBase {
  tag: 'div' | 'p' | 'span'
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

export type CustomElementList = (
  | CustomDivElement
  | CustomParagraphElement
  | CustomSpanElement
)[]

export type CustomElementGroup = {
  isSelected: boolean
  isVertical: boolean
  children: CustomElementList
}

export type CustomElementGlobal = {
  isVertical: boolean
}
