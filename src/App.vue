<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <lay-container fluid>
<!--    <MainList/>-->
    <FocusMain/>
  </lay-container>
</template>

<script>

import FocusMain from "@/components/focus2/FocusMain.vue";

export default {
  name: 'App',
  components: {FocusMain},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body{
  background-color: azure

}
</style>
