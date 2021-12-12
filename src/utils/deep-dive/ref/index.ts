/*
* ref(reference)方法实现
* JS的计算属性
* */

import { reactive } from "@/utils/deep-dive/reactivity/reactive";

const ref =  (raw: any) => {
  const result = reactive({
    value: raw
  })
  return result
}
