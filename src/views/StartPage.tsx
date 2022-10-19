import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "../shared/Button";
import { Center } from "../shared/Center";
import { FloatButton } from "../shared/FloatButton";
import { Icon } from "../shared/Icon";
import { Navbar } from "../shared/Navbar";
import { Overlay } from "../shared/Overlay";
import s from "./StartPage.module.scss";

export const StartPage = defineComponent({
  setup(props, context) {
    const refoverlayVisible = ref(false);
    const onClickMenu = () => {
      refoverlayVisible.value = !refoverlayVisible.value;
    };

    return () => (
      <MainLayout>
        {{
          title: () => "山竹记账",
          icon: () => <Icon name="menu" class={s.pig} onClick={onClickMenu} />,
          default: () => (
            <>
              <Center class={s.icon_wrapper}>
                <Icon name="pig" class={s.icon} />
              </Center>
              <div class={s.button_wrapper}>
                <RouterLink to="/items/create">
                  <Button class={s.button}>开始记账</Button>
                </RouterLink>
              </div>
              <RouterLink to="/items/create">
                <FloatButton iconName="add" />
              </RouterLink>
              {refoverlayVisible.value && (
                <Overlay onClose={() => (refoverlayVisible.value = false)} />
              )}
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
