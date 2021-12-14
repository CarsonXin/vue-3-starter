/*
* ref(reference)方法实现
* JS的计算属性
* */

import { reactive } from "@/utils/deep-dive/reactivity/reactive";
import { doTrigger, getTrack } from "@/utils/deep-dive/target-map";
import { isEqual } from "@/utils/comparator";

// reactive way
const RefByReactive = (defaultValue: any) => {
  return reactive({
    value: defaultValue
  })
}

// vue3 way
// 通过JS的计算属性+reactive，对数据进行响应式处理
export const ref = (raw: any) => {
  const result = {
    get value() {
      getTrack(result, 'value')
      return raw
    },
    set value(newValue) {
      // 先判断是否一致
      if (!isEqual(raw, newValue)) {
        raw = newValue
        doTrigger(result, 'value')
      }
    }
  }
  return result
}
