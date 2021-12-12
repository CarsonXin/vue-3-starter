<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import ReactiveDemo from '@/views/deep-dive/reactive-demo.vue'
import MiniVue from '@/views/deep-dive/mini-vue.vue'

</script>

<template>
    <img alt="Vue logo" src="./assets/logo.png"/>
    <HelloWorld msg="Hello Vue 3 + Vite"/>
    <ReactiveDemo />
    <br>
    <hr />

    <MiniVue />

</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
