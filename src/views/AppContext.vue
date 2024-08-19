<script setup>

import AppMenu from "@/components/AppMenu.vue";
import AppPageTop from "@/components/AppPageTop.vue";
</script>

<template>
  <lay-container>
    <AppPageTop/>
    <AppMenu/>
    <lay-panel>
      <router-view/>
    </lay-panel>
  </lay-container>
</template>

<style scoped>

</style>