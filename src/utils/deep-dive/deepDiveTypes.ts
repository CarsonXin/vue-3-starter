export type IVNodeTagType = string

export type IVNodePropsType = Object & {
  key?: string | number
}

export type IVNodeChildType = any

export type IVNodeChildrenType = IVNodeChildType | IVNodeChildType[]


export interface IVNodeType {
  tag: IVNodeTagType;
  props?: IVNodePropsType;
  children?: IVNodeChildrenType;
  el?: HTMLElement;
  key?: string | number
}
