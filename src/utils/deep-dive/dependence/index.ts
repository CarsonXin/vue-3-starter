// 依赖

let activeEffect: any

// 依赖
export class DependenceSimple {

  subscribers
  _value

  constructor(value: any) {
    // 将订阅者存储到一个集合中
    this.subscribers = new Set()
    this._value = value
  }

  get value() {
    this.depend()
    return this._value
  }

  set value(newValue) {
    this._value = newValue
    // 当值改变时，通知订阅者
    this.notify()
  }

  // track
  depend() {
    if (activeEffect) {
      // 将副作用函数添加到订阅队列中
      this.subscribers.add(activeEffect)
    }
  }

  // trigger
  notify() {
    this.subscribers.forEach(effect => {
      typeof effect === 'function' && effect()
    })
  }
}

export function watchEffect(effectFunc: Function) {
  activeEffect = effectFunc
  // todo 在每次副作用执行前，都需要对它的依赖关系进行清除
  effectFunc()
  activeEffect = null
}


// 当在响应式内部使用时，这个依赖类就不需要跟踪它自己的值，因为值实在对象上的
export class Dependence {

  subscribers = new Set()

  // track
  depend() {
    if (activeEffect) {
      // 将副作用函数添加到订阅队列中
      this.subscribers.add(activeEffect)
    }
  }

  // trigger
  notify() {
    this.subscribers.forEach(effect => {
      typeof effect === 'function' && effect()
    })
  }
}
