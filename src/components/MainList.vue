<template>
      <lay-panel v-for="item in list" :key="item" :id="item" shadow="hover">
        {{item.title}}
        <MainItem/>
      </lay-panel>
</template>
<script setup>
import { ref } from 'vue';
import MainItem from "@/components/MainItem.vue";

const msg = ref("1");
const list = ref([{"title":"测试1"},{"title":"测试2"},{"title":"测试3"}]);
console.log(msg);
</script>

<style scoped>

</style>