<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <lay-container fluid>
    <AppMain/>
  </lay-container>
</template>

<script>
import AppMain from "@/components/focus/AppMain.vue";

export default {
  name: 'App',
  components: {
    AppMain,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 15px;
}
body{
  background-color: #539eeb

}
</style>
