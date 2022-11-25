import { Overlay } from "vant";
import { defineComponent, ref, reactive, PropType } from "vue";
import { Form, FormItem } from "../shared/Form";
import { OverlayIcon } from "../shared/Overlay";
import { Tab, Tabs } from "../shared/Tabs";
import { Time } from "../shared/time";
import { MainLayout } from "./MainLayout";
import s from './TimeTabsLayout.module.scss';
const demo = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false,
    },
    endDate: {
      type: String as PropType<string>,
      required: false,
    },
  },
})
export const TimeTabsLayout = defineComponent({
  props: {
    component: {
      type: Object as PropType<typeof demo>,
      required: true,
    },
    reRenderOnSwitchTab: {
      type: Boolean,
      default: false,
    },
    hideThisYear: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const refSelected = ref("本月")
    const time = new Time()

    const tempTime = reactive({
      //自定义时间暂存区
      start: new Time().format(),
      end: new Time().format(),
    })

    const customTime = reactive<{
      //自定义时间
      start?: string
      end?: string
    }>({})
    const timeList = [
      {
        start: time.firstDayOfMonth(),
        end: time.lastDayOfMonth(),
      },
      {
        start: time.add(-1, "month").firstDayOfMonth(),
        end: time.add(-1, "month").lastDayOfMonth(),
      },
      {
        start: time.firstDayOfYear(),
        end: time.lastDayOfYear(),
      },
    ]
    const refOverlayVisible = ref(false)
    const onSubmitCustomTime = (e: Event) => {
      e.preventDefault()
      refOverlayVisible.value = false
      Object.assign(customTime, tempTime)
    }
    const onSelected = (value: string) => {
      if (value === "自定义时间") {
        refOverlayVisible.value = true
      }
    }
    return () => (
      <MainLayout class={s.TimeTabsLayout_layout}>
        {{
          title: () => "闪速记账",
          icon: () => <OverlayIcon />,
          default: () => (
            <>
              <div class={s.wrapper}>
                <Tabs
                  classPrefix="customTabs"
                  v-model:selected={refSelected.value}
                  onUpdate:selected={onSelected}
                  reRenderOnSelect={props.reRenderOnSwitchTab}>
                  <Tab
                    value="本月"
                    name="本月">
                    <props.component
                      startDate={timeList[0].start.format()}
                      endDate={timeList[0].end.format()}
                    />
                  </Tab>
                  <Tab
                    value="上月"
                    name="上月">
                    <props.component
                      startDate={timeList[1].start.format()}
                      endDate={timeList[1].end.format()}
                    />
                  </Tab>
                  <Tab
                    value="今年"
                    name="今年">
                    <props.component
                      startDate={timeList[2].start.format()}
                      endDate={timeList[2].end.format()}
                    />
                  </Tab>
                  <Tab
                    value="自定义时间"
                    name="自定义时间">
                    <props.component
                      startDate={customTime.start}
                      endDate={customTime.end}
                    />
                  </Tab>
                </Tabs>
                <Overlay
                  show={refOverlayVisible.value}
                  class={s.overlay}>
                  <div class={s.overlay_inner}>
                    <header>请选择时间</header>
                    <main>
                      <Form onSubmit={onSubmitCustomTime}>
                        <FormItem
                          label="开始时间"
                          v-model={tempTime.start}
                          type="date"
                        />
                        <FormItem
                          label="结束时间"
                          v-model={tempTime.end}
                          type="date"
                        />
                        <FormItem>
                          <div class={s.actions}>
                            <button
                              type="button"
                              onClick={() => (refOverlayVisible.value = false)}>
                              取消
                            </button>
                            <button type="submit">确认</button>
                          </div>
                        </FormItem>
                      </Form>
                    </main>
                  </div>
                </Overlay>
              </div>
            </>
          ),
        }}
      </MainLayout>
    )
  },
})
