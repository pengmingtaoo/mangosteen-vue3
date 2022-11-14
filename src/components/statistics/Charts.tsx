import { computed, defineComponent, onMounted, PropType, ref } from "vue";
import { FormItem } from "../../shared/Form";
import s from "./Charts.module.scss";
import { LineChart } from "./LineChart";
import { PiaChart } from "./PiaChart";
import { Bar } from "./Bar";
import { http } from "../../shared/Http";
import { Time } from "../../shared/time";

type Data1Item = { happen_at: string; amount: number };
type Data1 = Data1Item[];
const DAY = 24 * 3600 * 1000;

export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
    },
    endDate: {
      type: String as PropType<string>,
    },
  },

  setup(props, context) {
    const kind = ref("expenses");
    const data1 = ref<Data1>([]);
    const betterData1 = computed<[string, number][]>(() => {
      if (!props.startDate || !props.endDate) {
        return [];
      }
      const array = [];
      let data1Index = 0;
      const diff = new Date(props.endDate).getTime() - new Date(props.startDate).getTime(); //开始到结束时间挫的差值(总共的秒数)
      //start 1 end 2  n=2
      //start 1 end 3  n=3
      const n = diff / DAY + 1; //天数

      for (let i = 0; i < n; i++) {
        const time = new Time(props.startDate + "T00:00:00.000+0800").add(i, "day").getTimestamp(); //time = 1669737600000（时间搓）,让props.startDate转变成时间搓
        //new Date(time)===Sat Nov 05 2022 00:00:00 GMT+0800 (中国标准时间)
        //new Date(time).toISOString()===2022-10-31T16:00:00.000Z

        if (data1.value[data1Index] && new Time(data1.value[data1Index].happen_at).getTimestamp() === time) {
          array.push([new Date(time).toISOString(), data1.value[data1Index].amount]);
          data1Index += 1;
        } else {
          array.push([new Date(time).toISOString(), 0]);
        }
      }

      return array as [string, number][];
    });
    onMounted(async () => {
      const response = await http.get<{ groups: Data1; summary: number }>("/items/summary", {
        happen_after: props.startDate,
        happen_before: props.endDate,
        kind: kind.value,
        _mock: "itemSummary",
      });
      data1.value = response.data.groups;
    });

    return () => (
      <div class={s.chart_wrapper}>
        <FormItem
          label="类型"
          type="select"
          options={[
            { value: "expenses", text: "支出" },
            { value: "income", text: "收入" },
          ]}
          v-model={kind.value}
        />

        <LineChart data={betterData1.value} />
        <PiaChart />
        <Bar />
      </div>
    );
  },
});
