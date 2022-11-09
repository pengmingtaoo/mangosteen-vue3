import { defineComponent } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { BackIcon } from "../../shared/BackIcon";
import s from "./Tag.module.scss";
import { TagForm } from "./TagForm";
export const TagCreate = defineComponent({
  setup: (props, context) => {

    return () => (
      <MainLayout class={s.tag_create}>
        {{
          title: () => "新建标签",
          icon: () => <BackIcon />,
          default: () => <TagForm />,
        }}
      </MainLayout>
    );
  },
});
