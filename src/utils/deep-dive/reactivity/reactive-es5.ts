// es5版响应式数据实现方法

// 缺点：
// 当需要添加其他属性时，必须专门把他们添加进来，
// 因为被添加的属性并没有自动给予它们 getter 和 setter
// 只能转换已经在对象上的key

import { Dependence } from '@/utils/deep-dive/dependence'

export function reactive(rawData: any) {
  Object.keys(rawData).forEach(key => {
    const dep = new Dependence()
    let value = rawData[key]
    Object.defineProperty(rawData, key, {
      get() {
        dep.depend()
        return value
      },
      set(newValue) {
        value = newValue
        dep.notify()
      }
    })
  })
}
