// 比较虚拟DOM节点信息并更新方法
/*
* <div v-for="item in list" :key="item.id"></div>
* */
import { IVNodeType } from "@/utils/deep-dive/deepDiveTypes";
import { mount } from "@/utils/deep-dive/mount";
/**
 * @param oldNode 旧节点信息
 * @param newNode 新节点/快照，将要更新的内容
 * */
export function patch (oldNode: IVNodeType, newNode: IVNodeType) {
  if (oldNode.tag === newNode.tag) {
    // 假如新旧节点的标签相同，逐级比较

    // el为保存当此比较旧节点的挂载元素
    // 并将旧节点的挂载元素分配到新的节点信息中，以便在将来继续比较时使用，即每次比较都会将原来的挂载元素信息传递到未来的新节点信息中
    const el = newNode.el = oldNode.el as HTMLElement

    // console.log('patch el', el)
    // 处理props

    // 保存新旧节点配置信息
    const oldProps = oldNode.props || {}
    const newProps = newNode.props || {}
    for (const key in newProps) {
      const oldValue = oldProps[key]
      const newValue = newProps[key]
      if (newValue !== oldValue) {
        el?.setAttribute(key, newValue)
      }
    }
    // 当新的节点中某个key没有时（如更新或添加）时，移除
    for (const key in oldProps) {
      if (!(key in newProps)) {
        el?.removeAttribute(key)
      }
    }

    // 处理children

    const oldChildren = oldNode.children
    const newChildren = newNode.children
    //  比较新旧子节点
    if (typeof newChildren === "string") {
      if (typeof oldChildren === "string") {
        // 假如新旧节点子元素都是字符串
        if (newChildren !== oldChildren) {
          el.textContent = newChildren
        }
      } else {
        el.textContent = newChildren
      }
    } else {
      if (typeof oldChildren === 'string') {
        // 假如旧节点是个字符串
        el.innerHTML = ''
        newChildren.forEach(child => {
          mount(child, el)
        })
      } else {
        // 假如节点是个数组
        // 寻找公共部分数据
        const commonLen = Math.min(oldChildren.length, newChildren.length)
        // 但这里并不能保证数据的一致性
        // 如属性参数有区别如有些被删除或新增，又或者前后一致却被非必要地修改等
        // 这里是未优化的状态，仅供理解
        for (let i = 0; i < commonLen; i++) {
          patch(oldChildren[i], newChildren[i])
        }

        if (newChildren.length > oldChildren.length) {
          console.log('add el')
          // 当新子节点数量多余旧子节点的长度，则新增多出来的数量
          newChildren.slice(oldChildren.length).forEach(child => {
            // console.log('new child', child)
            mount(child, el)
          })
        } else if (newChildren.length < oldChildren.length) {
          //  否则删除
          console.log('remove el')
          oldChildren.slice(newChildren.length).forEach(child => {
            el.removeChild(child.el)
          })
        } else {
          console.log('same')
          console.log('oldChildren', oldChildren)
          console.log('newChildren', newChildren)
        }
      }
    }

  } else {
    //  直接替换
  }
}
