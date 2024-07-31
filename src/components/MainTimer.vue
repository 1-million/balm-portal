<script setup>
import {computed, ref} from "vue";
  import moment from "moment";
  let dateTime = ref(new Date());
  let curDateTime = computed(()=> moment(dateTime).format("YYYY-MM-DD HH:mm:ss"));
  function start(){
    console.log("test");
    dateTime.value = new Date();
  }
</script>

<template>
  <div>
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