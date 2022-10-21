import { defineComponent, PropType } from "vue";
import s from "./TagEidit.module.scss";
export const TagEidit = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup(props, context) {
    return () => <div></div>;
  },
});
