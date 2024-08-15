<script setup>
const pageBack = ()=>{
  alert();
};
</script>

<template>
  <lay-panel>
    <lay-page-header content="分类列表" @back="pageBack"></lay-page-header>
  </lay-panel>
</template>

<style scoped>
.layui-panel{
  padding:10px;
  margin-top: 10px;
}
</style>