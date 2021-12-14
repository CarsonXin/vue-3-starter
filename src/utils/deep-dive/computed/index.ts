import { ref } from "@/utils/deep-dive/ref";
import { watchEffect } from "@/utils/deep-dive/dependence";

export default function computed(getter: Function): any {
  let result = ref(null)
  watchEffect(() => {
    return result.value = getter()
  })
  return result
}
