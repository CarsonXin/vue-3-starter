import { defineComponent, onUnmounted, reactive, ref, renderSlot } from 'vue'


export const MySelector = defineComponent({
  setup() {
    const mess = ref<string>('hello')


    return {
      mess
    }
  },
  render() {
    const { mess: v } = this
    // console.log('value', v)

    return (
      <div>
        这个是个值：{ v } 不能写成 双花括号
      </div>
    )
  }
})

export const RenderComponent = defineComponent({
  props: {
    title: String,
  },
  // 逻辑层
  setup() {
    const count = ref<number>(1);

    // const timer = setInterval(() => {
    //   count.value++;
    // }, 2000);
    //
    // onUnmounted(() => {
    //   clearInterval(timer);
    // });

    return {
      count,
    };
  },
  // 渲染层
  render() {
    // render函数在响应式数据发生更改时会自动触发（与react类似）
    const { count, $slots, title } = this;
    return (
      <div class="render-component">
        {renderSlot($slots, "prefix")} {count}
        <br />
        这是props：{title} - {count}
        <br />
        {renderSlot($slots, "default")}
      </div>
    );
  },
});

