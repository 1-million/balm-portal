<template>
  <template v-for="item in 10" :key="item">
    <MainItem/>
  </template>
  <MainTimer/>
</template>
<script setup>
import { ref } from 'vue';
import MainItem from "@/components/MainItem.vue";
import MainTimer from "@/components/MainTimer.vue";
const msg = ref("1");
console.log(msg);
</script>

<style scoped>

</style>