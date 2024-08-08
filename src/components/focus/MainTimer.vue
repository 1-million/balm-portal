<script setup>
import {computed, ref} from "vue";
import moment from "moment";

/**
 * 计时组件
 * 通过时间间隔计算，获取时间差秒数。
 * 当前时间 - 基础时间 = 经过秒数
 *
 * @type {Ref<UnwrapRef<moment.Moment>>}
 */
const isShow = ref(false);
defineProps(['isShow'])
const summaryTimes = ref(0);
const intervalId = ref(0);
const status = ref(0);
// 计算经过秒数
const times = computed(() => {
  return moment.utc(summaryTimes.value).format('HH:mm:ss');});

function start(){
  status.value = 1;
  intervalId.value = setInterval(() => {
    summaryTimes.value+=1000;
  }, 1000);
}
function stop(){
  status.value = 2;
  clearInterval(intervalId.value);
}
function end(){
  status.value = 0;
  clearInterval(intervalId.value);
  summaryTimes.value = 0;
}

function close(){
  isShow.value = !isShow.value;
}
</script>

<template>
  <div  v-if="isShow" class="timer">
    <lay-card title="标题">
      <template v-slot:title>
        <span class="reback">退回</span>
      </template>
      <template v-slot:extra>
        <span class="close" @click="close">关闭</span>
      </template>
      <lay-tag>{{ times }}</lay-tag>
      <lay-button-group>
        <lay-button :disabled="!(status === 0 || status === 2)" @click="start" type="primary">开始</lay-button>
        <lay-button :disabled="!(status === 1 || status === 2)" @click="stop" type="warm">暂停</lay-button>
        <lay-button :disabled="!(status !== 0)" @click="end" type="danger">停止</lay-button>
      </lay-button-group>
    </lay-card>
  </div>
</template>

<style scoped>
div {
  display: block;
}

.timer{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(255 255 255);
  z-index: 999999999;
}
.timer{
  ::v-deep(.layui-card-header){
    padding: 0;
  }
  .reback{
    left: 0;
    position: absolute;
    display: block;
    width: 60px;
    background-color: #ffb800;
    color: white;
  }
  .close{
    display: block;
    width: 60px;
    background-color: #ff5722;
    color: white;
  }
  .close:hover{

  }
}

</style>