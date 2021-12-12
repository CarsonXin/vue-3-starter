import { getTrack, doTrigger } from "@/utils/deep-dive/target-map";

// // 2. 将依赖关系存储到一个全局weakMap中
// // 使用weakMap的原因：
// //  a. weakMap只能用对象作为key
// //  b. 如果这个目标对象本身不会再被任何代码访问时，它会被垃圾回收，也意味着与其对应的weakMap中的关联项目也会被垃圾回收
// const targetMap = new WeakMap()
//
// function getTargetDeps(target: any) {
//   let targetDepsMap = targetMap.get(target)
//   if (!targetDepsMap) {
//     // 3. 当没有找到对应的依赖实例，为其创建一个新的map
//     targetDepsMap = new Map()
//     // 4. 对于每个目标对象，都会有一个map，上面包含与该对象相关的所有依赖关系
//     targetMap.set(target, targetDepsMap)
//   }
//   return targetDepsMap
// }


const reactiveHandlers: ProxyHandler<any> = {
  get(target: any, key: string | symbol, receiver: any): any {
    /*const dep = */
    getTrack(target, key)
    // dep.depend()
    return Reflect.get(target, key, receiver)
  },

  set(target: any, key: string | symbol, value: any, receiver: any): boolean {
    const oldValue = target[key]
    const result = Reflect.set(target, key, value, receiver)
    if (oldValue !== value) {
      // todo 调整比较方法 21.12.12
      // 在返回值之前，且两个值不相等时，通知触发器
      // const dep = getTrack(target, key)
      // dep.notify()
      doTrigger(target, key)
    }
    return result
  },
  has(target: any, key: string | symbol): boolean {
    console.log('trig the has trap')
    return Reflect.has(target, key)
  },
}

export function reactive<T = any>(target: T) {
  // 使用了Proxy方式后，不管有没有设置侦听副作用
  // 仍然为该属性出发get和set
  // 以至于vue能检测到新添加的属性
  // 因为响应式作用是在对象上，而不是对象的属性上
  return new Proxy(target, reactiveHandlers)
}

// const state = reactive({
//   count: 1,
// })
//
// watchEffect(() => {
//   console.log('watching effect', state.count)
// })
