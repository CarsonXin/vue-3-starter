// 1. 获取当前目标对象同时，找到同一个依赖实例
// 2. 将依赖关系存储到一个全局weakMap中
// 使用weakMap的原因：
//  a. weakMap只能用对象作为key
//  b. 如果这个目标对象本身不会再被任何代码访问时，它会被垃圾回收，也意味着与其对应的weakMap中的关联项目也会被垃圾回收

// 依赖关系
import { Dependence } from "@/utils/deep-dive/dependence";

const targetMap = new WeakMap()

export function getTargetDeps(target: any) {
  let targetDepsMap = targetMap.get(target)
  if (!targetDepsMap) {
    // 3. 当没有找到对应的依赖实例，为其创建一个新的map
    targetDepsMap = new Map()
    // 4. 对于每个目标对象，都会有一个map，上面包含与该对象相关的所有依赖关系
    targetMap.set(target, targetDepsMap)
  }
  return targetDepsMap
}

// 获取依赖关系方法
export function getTrack(target: any, key: string | symbol) {
  // 1. 获取当前目标对象同时，找到同一个依赖实例
  let depsMap = getTargetDeps(target)

  // 5. 从依赖关系map中获取该数据的依赖
  let dep = depsMap.get(key)
  if (!dep) {
    // 创建一个依赖关系对象
    dep = new Dependence()
    // 在依赖关系map中，将目标对象与依赖关系相对应
    depsMap.set(key, dep)
  }
  dep.depend()
  return dep
}

// 触发变更
export function doTrigger(target: any, key: string | symbol) {
  let depsMap = getTargetDeps(target)
  if (!depsMap) {
    return
  } else {
    let dep = depsMap.get(key)
    dep.notify()
    // return dep
  }
}
