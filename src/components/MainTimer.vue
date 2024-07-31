<script setup>
import {computed, ref} from "vue";
  const count = ref({});
  let curDateTime = computed(()=>{
    debugger;
    return count;
  });
  function start(){
    console.log("test");
    debugger;
    setInterval(()=>{count.value = new Date()},500)

  }
</script>

<template>
  <div>
    <div>{{ curDateTime }}</div>
    <div>{{ curDateTime }}</div>
    <button @click="start">开始</button>
    <button>停止</button>
  </div>
</template>

<style scoped>
  div{
    display: block;
  }
</style>