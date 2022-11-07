import { defineComponent, onMounted, PropType, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { MainLayout } from "../../layouts/MainLayout";
import { http } from "../../shared/Http";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import s from "./ItemCreate.module.scss";

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup(props, context) {
    const refkind = ref("支出");
    //请求数据
    onMounted(async () => {
      const response = await http.get<{ resources: Tag[] }>('/tags', {
        kind: 'expenses',
        _mock: 'tagIndex'
      })
      refExpensesTags.value = response.data.resources
    })
    const refExpensesTags = ref<Tag[]>([])
    //请求数据
    onMounted(async () => {
      const response = await http.get<{ resources: Tag[] }>('/tags', {
        kind: 'income',
        _mock: 'tagIndex'
      })
      refIncomeTags.value = response.data.resources
    })
    const refIncomeTags = ref<Tag[]>([]);
    const router = useRouter();
    const onReturn = () => {
      router.replace("/start");
    };
    return () => (
      <MainLayout class={s.item_create_layout}>
        {{
          title: () => "记一笔",
          icon: () => (
            <Icon name="return" class={s.return} onClick={onReturn} />
          ),
          default: () => (
            <>
              {/* <Tabs
                selected={refkind.value}
                onUpdateSelected={(name) => (refkind.value = name)}
              > */}
              <div class={s.wrapper}>
                <Tabs v-model:selected={refkind.value} class={s.tabs}>
                  <Tab name="支出" class={s.tags_wrapper}>
                    <RouterLink to="/tags/create">
                      <div class={s.tag}>
                        <div class={s.sign}>
                          <Icon name="add" class={s.createTag} />
                        </div>
                        <div class={s.name}>新增</div>
                      </div>
                    </RouterLink>
                    {refExpensesTags.value.map((tag) => (
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>{tag.sign}</div>
                        <div class={s.name}>{tag.name}</div>
                      </div>
                    ))}
                  </Tab>

                  <Tab name="收入" class={s.tags_wrapper}>
                    <div class={s.tag}>
                      <div class={s.sign}>
                        <Icon name="add" class={s.createTag} />
                      </div>
                      <div class={s.name}>新增</div>
                    </div>
                    {refIncomeTags.value.map((tag) => (
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>{tag.sign}</div>
                        <div class={s.name}>{tag.name}</div>
                      </div>
                    ))}
                  </Tab>
                </Tabs>

                <div class={s.inputPad_wrapper}>
                  <InputPad />
                </div>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
