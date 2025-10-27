<script setup lang="ts">

import TimeLine from "@/views/client/component/TimeLine.vue";
import Statistics from "@/views/client/component/Statistics.vue";
</script>

<template>
  <lay-row >
    <!-- 左侧时间轴 -->
    <lay-col md="12">
      <lay-card id="left" shadow="">
        <TimeLine />
      </lay-card>
    </lay-col>
    <!-- 右侧统计数据 -->
    <lay-col md="12">
      <lay-card id="right" shadow="">
        <Statistics />
      </lay-card>
    </lay-col>
  </lay-row>
</template>

<style scoped>
  #left{
    background-color: #626872;
  }
  #left .layui-card{
    background-color: #626872;
  }
</style>