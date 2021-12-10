import { IVNodeChildrenType, IVNodePropsType, IVNodeTagType, IVNodeType } from "./deepDiveTypes";

export const h = (tag: IVNodeTagType, props?: IVNodePropsType, children?: IVNodeChildrenType): IVNodeType => {
  return {
    tag,
    props,
    children
  }
}

