import { defineComponent, PropType, ref } from "vue";
import { Navbar } from "../shared/Navbar";
export const MainLayout = defineComponent({
  setup(props, context) {
    const refoverlayVisible = ref(false);
    const onClickMenu = () => {
      refoverlayVisible.value = !refoverlayVisible.value;
    };

    return () => (
      <div>
        <Navbar>
          {{
            default: () => context.slots.title?.(),
            icon: () => context.slots.icon?.(),
          }}
        </Navbar>
        {context.slots.default?.()}
      </div>
    );
  },
});
