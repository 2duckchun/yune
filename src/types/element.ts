export type CustomElementBaseTag = 'div' | 'p' | 'span'
export type Align = 'horizontal' | 'vertical'
export type GroupAlign = Align
export type GlobalAlign = Align

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
  id: string
  isGroup: true
  isSelected: boolean
  groupAlign: GroupAlign
  childElementList: CustomElement[]
}

export type DraggableCustomElement =
  | (CustomElement & { index: number })
  | (CustomElementGroup & { index: number })

export type SelectedElement = { id: string; isGrouped: boolean }
