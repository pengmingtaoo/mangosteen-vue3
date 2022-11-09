import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import s from "./ItemCreate.module.scss";
import { Tags } from "./Tags";

export const ItemCreate = defineComponent({
  setup(props, context) {
    const refkind = ref("支出")
    const refTagId = ref<number>()

    const refHappenAt = ref<string>(new Date().toISOString())//发生时间
    const refAmount = ref<number>()//金额


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
              <div class={s.wrapper}>
                <Tabs v-model:selected={refkind.value} class={s.tabs}>
                  <Tab name="支出" >
                    <div>{refAmount.value}</div>
                    <Tags kind="expenses" v-model:selected={refTagId.value} />
                  </Tab>
                  <Tab name="收入">
                    <Tags kind="income" v-model:selected={refTagId.value}/>
                  </Tab>
                </Tabs>
                <div class={s.inputPad_wrapper}>
                  <InputPad
                    v-model:happenAt={refHappenAt.value}
                    v-model:amount={refAmount.value}
                  />
                </div>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
