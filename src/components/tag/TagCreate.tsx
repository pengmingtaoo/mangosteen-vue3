import { Icon } from "../../shared/Icon";
import { defineComponent, PropType, reactive } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import s from "./TagCreate.module.scss";
import { Form } from "vant";
import { Button } from "../../shared/Button";
import { EmojiSelect } from "../../shared/EmojiSelect";
export const TagCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup(props, context) {
    const formDate = reactive({
      name: "",
      sign: "",
    });
    return () => (
      <MainLayout>
        {{
          title: () => "新建标签",
          icon: () => <Icon name="return" onClick={() => {}} />,
          default: () => (
            <form class={s.form}>
              <div class={s.formRow}>
                <label class={s.formLabel}>
                  <span class={s.formItem_name}>标签名</span>
                  <div class={s.formItem_value}>
                    <input
                      v-model={formDate.name}
                      class={[s.formItem, s.input, s.error]}
                    ></input>
                  </div>
                  <div class={s.formItem_errorHint}>
                    <span>必填</span>
                  </div>
                </label>
              </div>

              <div class={s.formRow}>
                <label class={s.formLabel}>
                  <span class={s.formItem_name}>符号{formDate.sign}</span>
                  <div class={s.formItem_value}>
                    <EmojiSelect
                      v-model={formDate.sign}
                      class={[s.formItem, s.emojiList, s.error]}
                    />
                  </div>
                  <div class={s.formItem_errorHint}>
                    <span>必填</span>
                  </div>
                </label>
              </div>

              <p class={s.tips}>记账时长按标签即可进行编辑</p>
              <div class={s.formRow}>
                <div class={s.formItem_value}>
                  <Button class={[s.formItem, s.button]}>确定</Button>
                </div>
              </div>
            </form>
          ),
        }}
      </MainLayout>
    );
  },
});
