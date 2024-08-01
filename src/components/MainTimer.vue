<script setup>
import {computed, ref} from "vue";
import moment from "moment";

/**
 * 计时组件
 * 通过时间间隔计算，获取时间差秒数。
 * 当前时间 - 基础时间 = 经过秒数
 *
 * @type {Ref<UnwrapRef<moment.Moment>>}
 */
const summaryTimes = ref(0);
const intervalId = ref(0);
const status = ref(0);
// 计算经过秒数
const times = computed(() => {
  return moment.utc(summaryTimes.value).format('HH:mm:ss');});

function start(){
  status.value = 1;
  intervalId.value = setInterval(() => {
    summaryTimes.value+=1000;
  }, 1000);
}
function stop(){
  status.value = 2;
  clearInterval(intervalId.value);
}
function end(){
  status.value = 0;
  clearInterval(intervalId.value);
  summaryTimes.value = 0;
}
</script>

<template>
  <div>
    <div>{{ times }}</div>
    <button :disabled="!(status === 0 || status === 2)" @click="start">开始</button>
    <button :disabled="!(status === 1 || status === 2)" @click="stop">暂停</button>
    <button :disabled="!(status !== 0)" @click="end">停止</button>
  </div>
</template>

<style scoped>
div {
  display: block;
}
</style>