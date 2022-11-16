import { defineComponent, PropType } from "vue";
import s from "./Tabs.module.scss";
export const Tabs = defineComponent({
  props: {
    classPrefix: {
      type: String,
    },
    selected: {
      type: String as PropType<string>,
    },
    reRenderOnSelect: {
      type: Boolean as PropType<Boolean>,
      default: false,
    },
  },
  emits: ["update:selected"],
  setup(props, context) {
    return () => {
      const tabs = context.slots.default?.()
      if (!tabs) return () => null
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].type !== Tab) {
          throw new Error("<Tab>only accepts</Tab> as children")
        }
      }

      return (
        <div class={[s.tabs, props.classPrefix + "_tabs"]}>
          <ol class={[s.tabs_nav, props.classPrefix + "_tabs_nav"]}>
            {tabs.map((item) => (
              <li
                class={[
                  item.props?.value === props.selected ? [s.selected, props.classPrefix + "_selected"] : "",
                  props.classPrefix + "_tabs_nav_item",
                ]}
                onClick={() => context.emit("update:selected", item.props?.value)}>
                {item.props?.name}
              </li>
            ))}
          </ol>
          <div>
            {props.reRenderOnSelect ? (
              <div key={props.selected}>{tabs.find((item) => item.props?.value === props.selected)}</div>
            ) : (
              <div>
                {tabs.map((item) => (
                  <div v-show={item.props?.value === props.selected}>{item}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      )
    }
  },
})

export const Tab = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
      required: true,
    },
    value: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props, context) {
    return () => <div>{context.slots.default?.()}</div>
  },
})
