import { defineComponent, PropType, ref } from "vue";
import { Icon } from "../../shared/Icon";
import { time } from "../../shared/time";
import s from "./InputPad.module.scss";
import { DatetimePicker, Popup } from "vant";

export const InputPad = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup(props, context) {
    const refDate = ref<Date>();
    const now = new Date();
    const buttons = [
      { text: "1", onClick: () => {} },
      { text: "2", onClick: () => {} },
      { text: "3", onClick: () => {} },
      { text: "清空", onClick: () => {} },
      { text: "4", onClick: () => {} },
      { text: "5", onClick: () => {} },
      { text: "6", onClick: () => {} },
      { text: "+", onClick: () => {} },
      { text: "7", onClick: () => {} },
      { text: "8", onClick: () => {} },
      { text: "9", onClick: () => {} },
      { text: "-", onClick: () => {} },
      { text: ".", onClick: () => {} },
      { text: "0", onClick: () => {} },
      { text: "删", onClick: () => {} },
      { text: "确定", onClick: () => {} },
    ];
      const refDateVisible = ref(false);
      const showDatePicker = () => (refDateVisible.value = true);
      const hideDatePicker = () => (refDateVisible.value = false);
      const setDate = (date: Date) => {
        refDate.value = date;
        hideDatePicker();
      };
      return () => (
        <>
          <div class={s.dateAndNumber}>
            <span class={s.date}>
              <Icon name="date" class={s.icon} />
              <span>
                <span onClick={showDatePicker}>
                  {time(refDate.value).format()}
                </span>
                <Popup
                  position="bottom"
                  v-model:show={refDateVisible.value}
                  round
                >
                  <DatetimePicker
                    value={refDate.value}
                    type="date"
                    title="选择年月日"
                    onConfirm={setDate}
                    onCancel={hideDatePicker}
                  />
                </Popup>
              </span>
            </span>
            <span class={s.amount}>199.3</span>
          </div>
          <div class={s.buttons}>
            {buttons.map((button) => (
              <button onClick={button.onClick}>{button.text}</button>
            ))}
          </div>
        </>
      );
  },
});
