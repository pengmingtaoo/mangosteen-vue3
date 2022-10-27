import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { MainLayout } from "../../layouts/MainLayout";
import { Button } from "../../shared/Button";
import { Icon } from "../../shared/Icon";
import s from "./Tag.module.scss";
import { TagForm } from "./TagForm";
export const TagEidit = defineComponent({
  setup: (props, context) => {
    const router = useRouter();
    const onReturn = () => {
      router.replace("/items/create");
    };

    return () => (
      <MainLayout>
        {{
          title: () => "新建标签",
          icon: () => (
            <Icon name="return" onClick={onReturn} class={s.return} />
          ),
          default: () => (
            <>
              <TagForm />
              <div class={s.actions}>
                <Button level="danger" class={s.removeTags} onClick={() => {}}>
                  删除标签
                </Button>
                <Button
                  level="danger"
                  class={s.removeTagsAndItems}
                  onClick={() => {}}
                >
                  删除标签和记账
                </Button>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
