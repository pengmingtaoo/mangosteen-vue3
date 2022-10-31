import { defineComponent, PropType } from "vue";
import s from "./Button.module.scss";

interface Props {
  onClick?: (e: MouseEvent) => void;
}

export const Button = defineComponent({
  props: {
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
    level: {
      type: String as PropType<"import" | "normal" | "danger">,
      default: "important",
    },
    type: {
      type: String as PropType<'submit' | 'button'>
    }
  },
  setup(props, context) {
    return () => (
      <button type={props.type} onClick={props.onClick} class={[s.button, s[props.level]]}>
        {context.slots.default?.()}
      </button>
    );
  },
});
