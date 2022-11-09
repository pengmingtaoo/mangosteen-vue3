import { defineComponent, PropType } from 'vue'
import { Icon } from './Icon'
import s from './BackIcon.module.scss';
import { useRoute, useRouter } from 'vue-router';
export const BackIcon = defineComponent({

  setup(props, context) {
    const route = useRoute()
    const router = useRouter()
    const onClick = () => {
      const { return_to } = route.query
      if (return_to) {
        router.push(return_to.toString())
      } else {
      router.back()
      }
    }
    return () =>
      <Icon name="return" class={s.return} onClick={onClick} />
  }
})