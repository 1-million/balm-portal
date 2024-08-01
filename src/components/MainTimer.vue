<script setup>
import {computed, ref} from "vue";
import moment from "moment";
  const baseDateTime = ref(moment(new Date()));
  const curDateTime = ref(moment(new Date()));
  const calcDateDiff = computed(()=>curDateTime.value.diff(baseDateTime.value, 'seconds'));
  function start(){
    console.log("test");
    debugger;
    setInterval(() => {
      baseDateTime.value = moment(new Date()); // 每次都创建一个新的字符串
    }, 1000);

  }
</script>

<template>
  <div>
    <div>{{ calcDateDiff }}</div>
    <button @click="start">开始</button>
    <button>停止</button>
  </div>
</template>

<style scoped>
  div{
    display: block;
  }
</style>