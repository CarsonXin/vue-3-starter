// mount 挂载函数
import { IVNodeType } from '@/utils/deep-dive/deepDiveTypes'

export function mount(vNode: IVNodeType, container: HTMLElement) {
  // 存储相应的实际DOM元素到vNode本身
  const el = vNode.el = document.createElement(vNode.tag)

  // 当有props配置时，将每个配置设置到元素内
  if (vNode.props !== undefined) {
    for (const key in vNode.props) {
      const value = vNode.props[key]
      // 未作类型判断，需要日后补充
      if (key.startsWith('on')) {
        //   处理dom事件
        el.addEventListener(key.slice(2).toLocaleLowerCase(), value)
      } else {
        el.setAttribute(key, value)
      }
    }
  }
  if (vNode.children) {
    // 当为字符串时直接输出
    if (typeof vNode.children === 'string' || typeof vNode.children ===
      'number') {
      el.textContent = `${vNode.children}`
    } else if (vNode.children instanceof Array) {
      vNode.children.forEach(child => {
        mount(child, el)
      })
    }
  }
  container.appendChild(el)
}
