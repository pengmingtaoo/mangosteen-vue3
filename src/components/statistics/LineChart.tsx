import * as echarts from "echarts"
import { defineComponent, onMounted, PropType, ref, watch } from "vue"
import { getMoney } from "../../shared/Money"
import { Time } from "../../shared/time"
import s from "./LineChart.module.scss"

const echartsOption = {
  tooltip: {
    show: true,
    trigger: "axis", //坐标轴触发
    formatter: ([item]: any) => {
      //提示框浮层内容格式器
      const [x, y] = item.data
      return `${new Time(new Date(x)).format("YYYY年MM月DD日")} ￥${getMoney(y)}`
    },
  },
  grid: [{ left: 5, right: 5, top: 20, bottom: 20 }],
  xAxis: {
    //直角坐标系 grid 中的 x 轴
    type: "time",
    boundaryGap: ["5%", "3%"], //坐标轴两边留白
    axisLabel: {
      //坐标轴刻度标签的相关设置。
      formatter: (value: string) => new Time(new Date(value)).format("MM-DD"), //刻度标签的内容格式器
    },
    axisTick: {
      //坐标轴刻度相关设置。
      alignWithLabel: true, //可以保证刻度线和标签对齐
    },
  },
  yAxis: {
    show: true,
    type: "value",
    splitLine: {
      //坐标轴在 grid 区域中的分隔线。
      show: true,
      lineStyle: {
        //分隔线线的类型。
        type: "dashed",
      },
    },
    axisLabel: {
      //坐标轴刻度标签的相关设置。
      show: false,
    },
  },
}

export const LineChart = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
    data: {
      type: Array as PropType<[string, number][]>,
      required: true,
    },
  },
  setup(props, context) {
    const refDiv = ref<HTMLDivElement>()
    let chart: echarts.ECharts | undefined = undefined
    onMounted(() => {
      if (!refDiv.value) {
        return
      }

      // 基于准备好的dom，初始化echarts实例
      chart = echarts.init(refDiv.value)
      // 绘制图表
      chart.setOption({
        ...echartsOption,
        series: [
          {
            data: props.data,
            type: "line",
          },
        ],
      })
    })
    watch(
      () => props.data,
      () => {
        chart?.setOption({
          series: [
            {
              data: props.data,
            },
          ],
        })
      }
    )

    return () => (
      <div
        ref={refDiv}
        class={s.echart}></div>
    )
  },
})
