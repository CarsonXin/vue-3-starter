<template>
  <div>
    深入理解 deep dive
    <div id="deep-dive-container">

    </div>
  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue'
import { mount } from "@/utils/deep-dive/mount";
import { patch } from "@/utils/deep-dive/patch";
import { oldNode, newNode, ListNode } from "@/utils/deep-dive";
import '@/utils/deep-dive/reactivity/dependence'
export default {
  name: "index",
  setup() {
    onMounted(() => {
      const el = document.getElementById('deep-dive-container')
      mount(oldNode, el)

      setTimeout(() => {
        patch(oldNode, newNode)
      }, 2000)
    })
  }
}
</script>

<style>
.green {
  color: green;
  font-weight: 600;
}

.red {
  color: red;
}
</style>
