<script setup lang="ts">

import TimeLine from "@/views/client/component/TimeLine.vue";
import Statistics from "@/views/client/component/Statistics.vue";
import TableTimeLine from "@/views/client/component/TableTimeLine.vue";
</script>

<template>
  <lay-row >
    <!-- 左侧时间轴 -->
    <lay-col md="24">
      <lay-card id="left">
<!--        <TimeLine />-->
        <TableTimeLine/>
      </lay-card>
    </lay-col>
    <!-- 右侧统计数据 -->
<!--    <lay-col md="12">-->
<!--      <lay-card id="right" shadow="">-->
<!--&lt;!&ndash;        <Statistics />&ndash;&gt;-->
<!--      </lay-card>-->
<!--    </lay-col>-->
  </lay-row>
</template>

<style scoped>
  /*#left{
    background-color: #626872;
  }*/
/*  #left :deep(.layui-card){
    background-color: #626872;
  }*/
  #left :deep(h4){
    color: white;
  }
  #left :deep(p){
    color: white;
  }
</style>