<script setup>
import MainList from "@/components/focus/MainList.vue";
import MainMenu from "@/components/focus/MainMenu.vue";
</script>

<template>
  <MainMenu id="menu"/>
  <MainList id="list"/>
</template>

<style scoped>
  #menu{
    margin-bottom: 15px;
  }
</style>