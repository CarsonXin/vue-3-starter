import { effect } from "vue";
// vue 响应式
let activeEffect

// 依赖
class dependence {

  subscribers
  _value

  constructor(value) {
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
    // 当值改变是，通知订阅者
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
      effect()
    })
  }
}

const myState = window.myState = new dependence(true)

const msg = window.myMsg = new dependence('hello')

function watchEffect(effectFunc: Function) {
  activeEffect = effectFunc
  // 在每次副作用执行前，都需要对它的依赖关系进行清除
  effectFunc()
  activeEffect = null
}

watchEffect(() => {
  // dep.depend()
  // console.log('effect function: ', dep.value)
  // 但此时，无论是哪个数据被修改，最终都会调用这里的逻辑，
  // 但我们希望能取消这样的依赖关系
  // 在每次副作用执行前，都需要对它的依赖关系进行清理
  // 能重新收集全新的依赖关系
  console.log('state.value', myState.value)
  if (myState.value) {
    console.log('msg ', msg.value)
  } else {
    console.log('you should not come here')
  }
})

msg.value = 'new value'

// dep.notify()

// const timeout = setTimeout(() => {
//   msg.value = 'change again'
//   clearTimeout(timeout)
// }, 1000)



