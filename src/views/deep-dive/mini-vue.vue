<template>
  <div id="mini-vue-container"></div>
</template>

<script lang="ts" setup>
import { reactive } from '@/utils/deep-dive/reactivity/reactive'
import { watchEffect } from '@/utils/deep-dive/dependence'
import { patch } from '@/utils/deep-dive/patch'
import { mount } from '@/utils/deep-dive/mount'
import { h } from '@/utils/deep-dive/render-helper'
import { onMounted } from 'vue'
import { ref } from "@/utils/deep-dive/ref";
import computed from "@/utils/deep-dive/computed";

const MiniVueApp = {
  data: reactive({
    msg: 'hello world',
    count: 1,
  }),
  render() {
    const self = this

    return h('div', {
      onClick: () => {
        console.log('onClick')
        self.data.count++
      },
    }, `${this.data.msg}-${this.data.count}`)
    /*
    * [
        h('div', null, self.data.msg),
        h('div', {
            class: 'hello '
        }, self.data.count)
    ]
    * */
  },
}

function mountApp(component, container) {
  let isMounted = false
  let prevDom: any
  watchEffect(() => {
    if (!isMounted) {
      prevDom = component.render()
      mount(prevDom, container)
      isMounted = true
    } else {
      const newDom = component.render()
      patch(prevDom, newDom)
      prevDom = newDom
    }
  })
}

onMounted(() => {
  const El = document.getElementById('mini-vue-container')


  //  测试 ref 开始
  let product = reactive({
    price: 5,
    total: 2
  })
  let salePrice = ref(2)

  let totalCost = computed(() => {
    return salePrice.value * product.total
  })
  // let totalCost
  // watchEffect(() => {
  //   totalCost = salePrice.value * product.total
  // })

  console.log(`before update: totalCost(10): ${totalCost.value}, salePrice(2): ${salePrice.value}`)

  watchEffect(() => {
    salePrice.value = product.price * .9
  })

  product.total = 2
  console.log(`after total update: totalCost(18): ${totalCost.value}, salePrice(9): ${salePrice.value}`)

  product.price = 20
  console.log(`after price update: totalCost(36): ${totalCost.value}, salePrice(18): ${salePrice.value}`)
  // 测试ref 结束


  mountApp(MiniVueApp, El)
})
</script>

<style scoped>

</style>
