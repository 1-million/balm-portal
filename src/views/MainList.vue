<template>
  <MainItem v-for="item in list" :key="item" :item="item" @click="openItem(item)" ></MainItem>
</template>
<script setup>
import {onMounted, ref} from 'vue';
import MainItem from "@/views/MainItem.vue";
import {useRouter} from "vue-router";
import {GET_FOCUS_LIST_API} from "@/axios/api/focus";
onMounted(()=>{
  GET_FOCUS_LIST_API.then((response)=>{
    list.value = response.data;
    console.log(response);
  });
});

const router = useRouter();
const msg = ref("1");
const curItem = ref(null);
const list = ref();
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