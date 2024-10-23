<template>
  <MainItem v-for="item in list" :key="item" :item="item" @click="openItem(item)" ></MainItem>
</template>
<script setup>
import {ref} from 'vue';
import MainItem from "@/views/MainItem.vue";
import {useRouter} from "vue-router";

const router = useRouter();
const msg = ref("1");
const curItem = ref(null);
const list = ref([{
  "title": "测试1",
  "type": 1,
  "summary": 3600,
  "duration":2400
}, {"title": "测试2"}, {"title": "测试3"}, {"title": "测试4"}, {"title": "测试5"}, {"title": "测试6"}, {"title": "测试7"}]);
console.log(msg);
function openItem(item){
  debugger;
  curItem.value = item;
  // isShow.value = true;
  router.push("test");
}


</script>

<style scoped>

</style>