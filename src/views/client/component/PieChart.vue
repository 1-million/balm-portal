<template>
  <div ref="chartRef" style="width: 100%; height: 300px"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import * as echarts from 'echarts';
import type { EChartsType, ECBasicOption } from 'echarts/types';

// 定义图表数据接口
interface ChartData {
  categories: string[];
  values: number[];
}

// 初始化响应式数据
const chartData: ChartData = reactive({
  categories: ['A', 'B', 'C'],
  values: [30, 50, 20],
});

// 获取图表容器
const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: EChartsType | null = null;

// 初始化图表
onMounted(() => {
  if (chartRef.value) {
    // 创建 ECharts 实例
    chartInstance = echarts.init(chartRef.value);

    // 定义饼图配置项（带类型约束）
    const option: ECBasicOption = {
      series: [
        {
          type: 'pie',
          data: chartData.categories.map((category, index) => ({
            name: category,
            value: chartData.values[index],
          })),
          label: { show: true, formatter: '{b}: {c} ({d}%)' }, // 显示标签和百分比
        },
      ],
    };

    // 渲染图表
    chartInstance.setOption(option);
  }
});
</script>

<style scoped>

</style>