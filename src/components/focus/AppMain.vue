<script setup>
import MainList from "@/components/focus/MainList.vue";
import MainHeader from "@/components/focus/MainHeader.vue";
import {useRouter} from "vue-router";
const router = useRouter();
const go = (item)=>{
  debugger;
  router.push('timer',{
    params:item
  })
}
</script>

<template>
  <lay-container>
    <lay-row>
      <lay-col sm="24">
        <MainHeader/>
      </lay-col>
    </lay-row>
    <lay-row>
      <lay-col sm="24">
        <MainList/>
        <lay-button @click="go(1)">test</lay-button>
      </lay-col>
    </lay-row>
  </lay-container>
</template>
<style scoped>
</style>