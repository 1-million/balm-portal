<script setup>
const pageBack = ()=>{
  alert();
};
</script>

<template>
  <lay-page-header content="分类列表" @back="pageBack"></lay-page-header>
</template>

<style scoped>
.lay-page-header{
  margin-bottom: 15px;
}
</style>