import { computed, effectScope, ref, watch, watchEffect } from "vue";

const Counter = ref(1)


const myInterval = setInterval(() => {
  Counter.value++
}, 1000)


// 创建一个作用域
const counterScope = effectScope()

// 程序在作用域中执行
counterScope.run(() => {
  const Latest = computed(() => Counter.value * 2)
  watch(Latest, () => console.log('Latest Result: ', Counter))
  watchEffect(() => {
    console.log('Doubled Count', Latest)
  })
})

export default counterScope
