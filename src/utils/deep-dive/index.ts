// vue h 函数
import {
  IVNodeChildrenType,
  IVNodePropsType,
  IVNodeTagType,
  IVNodeType,
} from '@/utils/deep-dive/deepDiveTypes'
import { h } from "@/utils/deep-dive/render-helper";

// 创建vue vNode
export const TextNode: IVNodeType = h('div', {
  id: 'text-node',
  class: 'title'
}, 'hello world')

export const ListNode = h(
  'div',
  {
    class: 'list-container',
  }, [
    h('div', null, 'list 1'),
    h('div', null, 'list 2'),
    h('div', null, [
      'inside',
      h('div', {
        class: 'inside-node'
      }, 'inside1'),
      h('div', {
        class: 'inside-node'
      }, 'inside2'),
    ]),
  ])


export const oldNode = h(
  'div',
  {
    class: 'green'
  },
  [
    h('span', null, 'hello world')
  ]
)

export const newNode = h(
  'div',
  {
    class: 'red'
  },
  [
    h('span', null, 'new node')
  ]
)
