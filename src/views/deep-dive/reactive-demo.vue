<template>
    <div>
        <el-button @click="handleClick">点我+ 1</el-button>
<!--        <el-button @click="handlePushArray">点我 list+ 1</el-button>-->
    </div>
</template>

<script lang="ts" setup>
import { reactive } from '@/utils/deep-dive/reactivity/reactive'
import { watchEffect } from '@/utils/deep-dive/dependence'
// import { reactive as VueReactive, watchEffect as VueWatchEffect } from 'vue'
const counter = reactive({
    num: 1,
})

// const list = VueReactive([
//     {
//         name: 1, id: 2,
//     }])

watchEffect(() => {
    console.log('watching effect', counter.num)
    const key = 'num'
    const isMsgInCounter = 'msg' in counter
    const isNumInCounter = key in counter
    console.log('msg key is in counter: ', isMsgInCounter)
    console.log('num key is in counter: ', isNumInCounter)
})

const handleClick = () => {
    counter.num++
}

// const handlePushArray = () => {
//     console.log("push")
//     const nextList = [{
//         id: Math.random(),
//         name: 123
//     }]
//     list.push(...nextList)
// }
//
// VueWatchEffect(() => {
//     console.log('list change', list)
// })

</script>

<style scoped>

</style>
