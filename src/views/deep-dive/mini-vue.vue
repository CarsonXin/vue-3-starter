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
    mountApp(MiniVueApp, El)
})
</script>

<style scoped>

</style>
