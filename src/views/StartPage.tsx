import { defineComponent } from "vue";
import { Button } from "../shared/Button";
import { Center } from "../shared/Center";
import { FloatButton } from "../shared/FloatButton";
import { Icon } from "../shared/Icon";
import s from "./StartPage.module.scss";

export const StartPage = defineComponent({
  setup(props, context) {
    const onClick = () => {
      console.log("hi");
    };

    return () => (
      <div>
        <div class={s.button_wrapper}>
          <nav>menu</nav>
          <Center class={s.icon_wrapper}>
            <Icon name="pig" class={s.icon} />
          </Center>
          <Button class={s.button} onClick={onClick}>
            测试
          </Button>
          <FloatButton iconName="add"></FloatButton>
        </div>
      </div>
    );
  },
});
