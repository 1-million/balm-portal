<template>
  <MainItem v-for="item in list" :key="item" :item="item" @click="start(item)" ></MainItem>
  <MainTimer v-if="isShow" :cur-item="curItem" @close="close"></MainTimer>
</template>
<script setup>
import {ref} from 'vue';
import MainItem from "@/components/focus/MainItem.vue";
import MainTimer from "@/components/focus/MainTimer.vue";

const msg = ref("1");
const curItem = ref(null);
const isShow = ref(false);
const list = ref([{
  "title": "测试1",
  "type": 1,
  "summary": 3600,
  "duration":2400
}, {"title": "测试2"}, {"title": "测试3"}, {"title": "测试4"}, {"title": "测试5"}, {"title": "测试6"}, {"title": "测试7"}]);
console.log(msg);
function start(item){
  debugger;
  curItem.value = item;
  isShow.value = true;
}

function close(){
  isShow.value = false;
}
</script>

<style scoped>

</style>