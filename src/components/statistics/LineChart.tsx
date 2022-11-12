import * as echarts from 'echarts';
import { defineComponent, onMounted, PropType, ref } from 'vue'
import { getMoney } from '../../shared/Money';
import { Time } from '../../shared/time';
import s from './LineChart.module.scss';

const echartsOption = {
  tooltip: {
    show: true,
    trigger: 'axis',//坐标轴触发
    formatter: ([item]: any) => {//提示框浮层内容格式器
      const [x, y] = item.data
      return `${new Time(new Date(x)).format('YYYY年MM月DD日')} ￥${getMoney(y)}`
    },
  },
  grid: [{ left: 5, right: 5, top: 20, bottom: 20 }],
  xAxis: {//直角坐标系 grid 中的 x 轴
    type: 'time',
    boundaryGap: ['5%', '3%'],//坐标轴两边留白
    // axisLabel: {//坐标轴刻度标签的相关设置。
    //   formatter: (value: string,index:string) => new Time(new Date(value)).format('MM-DD'),//刻度标签的内容格式器

    // },
    axisTick: {//坐标轴刻度相关设置。
      alignWithLabel: true,//可以保证刻度线和标签对齐
    },
  },
  yAxis: {
    show: true,
    type: 'value',
    splitLine: {//坐标轴在 grid 区域中的分隔线。
      show: true,
      lineStyle: { //分隔线线的类型。
        type: 'dashed',
      },
    },
    axisLabel: { //坐标轴刻度标签的相关设置。
      show: true,
    },
  },
}

export const LineChart = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    }
  },
  setup(props, context) {
    const refDiv = ref<HTMLDivElement>()

    const data = [
      ['2018-01-01T00:00:00.000+0800', 150],
      ['2018-01-02T00:00:00.000+0800', 230],
      ['2018-01-03T00:00:00.000+0800', 224],
      ['2018-01-04T00:00:00.000+0800', 218],
      ['2018-01-05T00:00:00.000+0800', 135],
      ['2018-01-06T00:00:00.000+0800', 147],
      ['2018-01-07T00:00:00.000+0800', 260],
      ['2018-01-08T00:00:00.000+0800', 300],
      ['2018-01-09T00:00:00.000+0800', 200],
      ['2018-01-10T00:00:00.000+0800', 300],
      ['2018-01-11T00:00:00.000+0800', 400],
      ['2018-01-12T00:00:00.000+0800', 500],
      ['2018-01-13T00:00:00.000+0800', 400],
      ['2018-01-14T00:00:00.000+0800', 300],
      ['2018-01-15T00:00:00.000+0800', 200],
      ['2018-01-16T00:00:00.000+0800', 100],
      ['2018-01-17T00:00:00.000+0800', 200],
      ['2018-01-18T00:00:00.000+0800', 300],
      ['2018-01-19T00:00:00.000+0800', 400],
      ['2018-01-20T00:00:00.000+0800', 500],
      ['2018-01-21T00:00:00.000+0800', 600],
      ['2018-01-22T00:00:00.000+0800', 700],
      ['2018-01-23T00:00:00.000+0800', 800],
      ['2018-01-24T00:00:00.000+0800', 900],
      ['2018-01-25T00:00:00.000+0800', 1000],
      ['2018-01-26T00:00:00.000+0800', 1100],
      ['2018-01-27T00:00:00.000+0800', 1200],
      ['2018-01-28T00:00:00.000+0800', 1300],
      ['2018-01-29T00:00:00.000+0800', 1400],
      ['2018-01-30T00:00:00.000+0800', 1500],
      ['2018-01-31T00:00:00.000+0800', 1600],
    ]

    onMounted(() => {
      if (!refDiv.value) { return }

      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(refDiv.value);
      // 绘制图表
      const option = {
       ...echartsOption,
        series: [{
          data: data,
          type: 'line'
        }]
      };
      myChart.setOption(option);

    })
    return () =>
      <div ref={refDiv} class={s.echart}></div>
  }
})