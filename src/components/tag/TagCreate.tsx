import { defineComponent, PropType, reactive } from "vue";
import { useRouter } from "vue-router";
import { MainLayout } from "../../layouts/MainLayout";
import { Button } from "../../shared/Button";
import { EmojiSelect } from "../../shared/EmojiSelect";
import { Icon } from "../../shared/Icon";
import { Rules, validate } from "../../shared/validate";
import s from "./Tag.module.scss";
import { TagForm } from "./TagForm";
export const TagCreate = defineComponent({
  setup: (props, context) => {
    const router = useRouter();
    const onReturn = () => {
      router.replace("/items/create");
    };

    return () => (
      <MainLayout class={s.tag_create}>
        {{
          title: () => "新建标签",
          icon: () => (
            <Icon name="return" onClick={onReturn} class={s.return} />
          ),
          default: () => <TagForm />,
        }}
      </MainLayout>
    );
  },
});
