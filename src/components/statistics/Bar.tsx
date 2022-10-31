import { computed, defineComponent, PropType, reactive } from 'vue'
import s from './Bar.module.scss';
export const Bar = defineComponent({
props:{
name:{
type: String as PropType<string>,
}
},
setup(props, context) {
   const date3 = reactive([
      { tag: {id:1,name:'房租',sign:'x'},amount:3000 },
      { tag: {id:2,name:'吃饭',sign:'x'},amount:2000 },
      { tag: {id:3,name:'娱乐',sign:'x'},amount:1000 }
    ])
    const betterDate3 = computed(() => {
      const total = date3.reduce((sum, item) => sum + item.amount, 0)
      return date3.map(item => ({
        ...item,
        percent:Math.round(item.amount / total *100) + '%'
      }))
    })
return () => 
  <div class={s.echart3}>
        {
          betterDate3.value.map(({ tag, amount, percent }) => {
            return (
              <div class={s.topItem}>
                <div class={s.sign}>
                  {tag.sign}
                </div>
                <div class={s.bar_wrapper}>
                  <div class={s.bar_text}>
                    <span>{tag.name} - {percent}</span>
                    <span>￥{amount}</span>
                  </div>
                  <div class={s.bar}>
                    <div class={s.bar_inner}></div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
}
})