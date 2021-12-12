import { Dependence } from '@/utils/deep-dive/dependence'

// 2. 将依赖关系存储到一个全局weakMap中
// 使用weakMap的原因：
//  a. weakMap只能用对象作为key
//  b. 如果这个目标对象本身不会再被任何代码访问时，它会被垃圾回收，也意味着与其对应的weakMap中的关联项目也会被垃圾回收

const targetMap = new WeakMap()

// 获取依赖关系方法
function getDeps(target: any, key: string | symbol) {
  // 1. 获取当前目标对象同时，找到同一个依赖实例
  let targetDepsMap = targetMap.get(target)
  if (!targetDepsMap) {
    // 3. 当没有找到对应的依赖实例，为其创建一个新的map
    targetDepsMap = new Map()
    // 4. 对于每个目标对象，都会有一个map，上面包含与该对象相关的所有依赖关系
    targetMap.set(target, targetDepsMap)
  }
  // 5. 从依赖关系map中获取该数据的依赖
  let dep = targetDepsMap.get(key)
  if (!dep) {
    // 创建一个依赖关系对象
    dep = new Dependence()
    // 在依赖关系map中，将目标对象与依赖关系相对应
    targetDepsMap.set(key, dep)
  }
  return dep
}

const reactiveHandlers: ProxyHandler<any> = {
  get(target: any, key: string | symbol, receiver: any): any {
    const dep = getDeps(target, key)
    dep.depend()
    return Reflect.get(target, key, receiver)
  },

  set(target: any, key: string | symbol, value: any, receiver: any): boolean {
    const dep = getDeps(target, key)
    const result = Reflect.set(target, key, value, receiver)
    // 在返回值之前，通知依赖对象
    dep.notify()
    return result
  },
  has(target: any, key: string | symbol): boolean {
    console.log('trig the has trap')
    return Reflect.has(target, key)
  },
}

export function reactive<T = any>(raw: T) {
  // 使用了Proxy方式后，不管有没有设置侦听副作用
  // 仍然为该属性出发get和set
  // 以至于vue能检测到新添加的属性
  // 因为响应式作用是在对象上，而不是对象的属性上
  return new Proxy(raw, reactiveHandlers)
}

// const state = reactive({
//   count: 1,
// })
//
// watchEffect(() => {
//   console.log('watching effect', state.count)
// })
