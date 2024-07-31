<script setup>
  import {ref} from "vue";
  import moment from "moment";
  let timer = ref(new Date());
  function start(){
    console.log("test");
    let mon = moment.locale();
    console.log(mon);
    timer = new Date();
  }
</script>

<template>
  <div>
    <div>{{ timer }}</div>
    <button @click="start">开始</button>
    <button>停止</button>
  </div>
</template>

<style scoped>
  div{
    display: block;
  }
</style>