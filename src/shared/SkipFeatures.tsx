import { defineComponent, PropType } from 'vue'
import { RouterLink } from 'vue-router'
export const SkipFeatures = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  //skipFeatures会一键跳过广告
  setup(props, context) {
    const onClick = () => {
      localStorage.setItem("skipFeatures", "yes")
    }
    return () => (
      <span onClick={onClick}>
        <RouterLink to="/items/list">跳过</RouterLink>
      </span>
    )
  },
})