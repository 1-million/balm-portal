<template>
    <lay-collapse v-model="openKeys">
      <lay-collapse-item v-for="item in list" :key="item" :title="item.title" :id="item">
        <MainItem/>
      </lay-collapse-item>
    </lay-collapse>
</template>
<script setup>
import { ref } from 'vue';
import MainItem from "@/components/MainItem.vue";

const msg = ref("1");
const list = ref([{"title":"测试1"},{"title":"测试2"}]);
const openKeys = ref(0);
console.log(msg);
</script>

<style scoped>

</style>