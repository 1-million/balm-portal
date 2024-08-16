<script setup>
import * as jsJoda from "@js-joda/core";
import {computed, ref} from "vue";
import {ChronoUnit, DateTimeFormatter} from "@js-joda/core";
/**
 * 计时组件
 * 正向计时
 * 累积时间 = 当前时间 - 过去时间
 * 倒计时
 * 剩余时间 = 未来时间 - 当前时间
 *
 */

/**
 * 变量区
 */
// 格式解析器
// 创建一个 formatter
const formatter = DateTimeFormatter.ofPattern('HH:mm:ss');

// 循环ID

const clockId = ref(0);

// 时钟类型
const type = ref(1);

// 时钟状态 0 未开始，1，正常，2，暂停
const status = ref(0);

// 结果时间
const duration = ref(0);

// 开始时间
const startTime = ref();

// 格式化显示时间
const format = computed(()=>{
  return jsJoda.LocalTime.ofSecondOfDay(duration.value).format(formatter); // '01:01:06'
})
/**
 * 功能区
 */

// 开始
const start = ()=>{
  // 正向计时
  if(type.value === 0){
    if(status.value === 0){
      startTime.value = jsJoda.LocalTime.now();
      duration.value = 0;
    }
      status.value = 1;
      clockId.value = setInterval(()=>{
      duration.value = startTime.value.until(jsJoda.LocalTime.now(),ChronoUnit.SECONDS);
      console.log(format.value);
    },100);
  }
  // 倒计时
  if(type.value === 1){
    // 加上1小时测试
    if(status.value === 0) {
      startTime.value = jsJoda.LocalTime.now().plusSeconds(3600);
      duration.value = 0;
    }
    status.value = 1;
    clockId.value = setInterval(()=> {
      duration.value = jsJoda.LocalTime.now().until(startTime.value, ChronoUnit.SECONDS);
      console.log(format.value);
    },100);
  }
};
const pause = ()=>{
  clearInterval(clockId.value);
  status.value = 2;
};
const stop = ()=>{
  clearInterval(clockId.value);
};
</script>

<template>
  <lay-panel>
    {{format}}
  </lay-panel>
  <lay-button-group>
    <lay-button @click="start" type="primary">开始</lay-button>
    <lay-button @click="pause" type="warm">暂停</lay-button>
    <lay-button @click="stop" type="danger">停止</lay-button>
  </lay-button-group>
</template>

<style scoped>

</style>