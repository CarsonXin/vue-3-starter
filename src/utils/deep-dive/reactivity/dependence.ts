// vue 响应式

import { DependenceSimple as dependence, watchEffect } from '@/utils/deep-dive/dependence'

// @ts-ignore
const myState = window.myState = new dependence(true)

// @ts-ignore
const msg = window.myMsg = new dependence('hello')

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



