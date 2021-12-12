import { IVNodeChildrenType, IVNodePropsType, IVNodeTagType, IVNodeType } from "@/utils/deep-dive/deepDiveTypes";

// 渲染函数
export const h = (tag: IVNodeTagType, props?: IVNodePropsType, children?: IVNodeChildrenType): IVNodeType => {
  return {
    tag,
    props,
    children
  }
}
