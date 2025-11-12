<script setup lang="ts">

</script>

<template>
  <lay-container :fluid="true">
    <lay-layout class="client">
      <lay-header>header</lay-header>
      <lay-body>
        <router-view/>
      </lay-body>
    </lay-layout>
  </lay-container>
</template>

<style scoped>

</style>