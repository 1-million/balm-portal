<script setup>

import {computed, ref} from "vue";

const props = defineProps({
  item:{
    type:Object
  }
})
const item = ref(props.item);
/**
 * 计时类型计算
 * @type {ComputedRef<string>}
 */
const typeName = computed(()=>{
  return item.value.type === 1?"正向计时":"其他"
});
/**
 * 累计时间计算
 * @type {ComputedRef<*|number>}
 */
const summaryMinute = computed(()=>{
  if(item.value.summary){
    return Number(item.value.summary /60).toFixed(0);
  }
  return 0;
})

</script>

<template>
  <lay-panel  shadow="hover" style="padding: 10px;">
    <lay-row space="10">
      <lay-col xs="4" sm="4" md="4">
        <img width="100%" height="100%" src="../../assets/logo.png"/>
      </lay-col>
      <lay-col xs="20" sm="20" md="20">
        <lay-row style="margin-bottom: 5px">
          <lay-col xs="24" sm="24" md="24" style="text-align: left">
            {{props.item.title}}
          </lay-col>
        </lay-row>
        <lay-row>
          <lay-col xs="24" sm="4" md="4" style="text-align: left">
            <lay-tag style="font-size:10px">{{ typeName }}</lay-tag>
            <lay-tag style="font-size:10px;margin-left: 5px">累计[{{summaryMinute}}}分钟]</lay-tag>
          </lay-col>
        </lay-row>
      </lay-col>
    </lay-row>
  </lay-panel>
</template>

<style scoped>
div{
  display: block;
}
  h3,button{
    display: inline-block;
  }

</style>