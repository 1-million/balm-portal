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
const props = defineProps({
  curItem:{
    default:null
  }
})
const curItem = ref(props.curItem)
const summaryTimes = ref(0);
const intervalId = ref(0);
const status = ref(0);
const percent = ref(100);
debugger;
const futureTime = ref(moment().add(curItem.value.duration, 's'));
const now = ref(moment());
const emit = defineEmits(["close"]);
// 计算经过秒数
// 计算剩余时间
const duration = ref(moment.duration(futureTime.value.diff(now.value)));

const times = computed(() => {
  // 提取小时、分钟、秒
  const hours = Math.floor(duration.value.asHours()) % 24;
  const minutes = Math.floor(duration.value.asMinutes()) % 60;
  const seconds = Math.floor(duration.value.asSeconds()) % 60;
  // 格式化并显示倒计时
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

const title = computed(()=>{
  return curItem.value?curItem.value.title:'';
})
function start(){
  // 开始
  if(status.value === 0){
    futureTime.value = moment().add(curItem.value.duration, 's');
    dropTimes();
  }
  // 暂停后开始
  if(status.value === 2){
    // 倒计时剩余时间+当前时间 = 暂停后时间回复的剩余倒计时时间
    futureTime.value = moment().add(duration.value);
    dropTimes();
  }

}

function dropTimes(){
  status.value = 1;
  intervalId.value = setInterval(() => {
    // 未来时间和当前时间的差等于倒计时时间
    duration.value = moment.duration(futureTime.value.diff(now.value));
    // 计算剩余进度值
    // (剩余秒数 / 总秒数)
    percent.value = duration.value.asSeconds() / curItem.value.duration * 100;
    if (duration.value.asMilliseconds() < 0){
      clearInterval(intervalId.value);
      saveSummaryTimes();
    }
    // 累计时间
    summaryTimes.value+=1;
    now.value = moment();
  }, 1000);
}

function paused(){
  status.value = 2;
  clearInterval(intervalId.value);

}
function stop(){
  status.value = 0;
  clearInterval(intervalId.value);
  saveSummaryTimes();
  summaryTimes.value = 0;
  emit("close");
}

function saveSummaryTimes(){
  if(summaryTimes.value<=5){
    return;
  }
  curItem.value.summary += summaryTimes.value;
}
</script>

<template>
  <div class="timer">
    <lay-card :title="title">
      <template v-slot:title>
<!--        <span class="reback">退回</span>-->
      </template>
      <template v-slot:extra>
<!--        <span class="close" @click="close">关闭</span>-->
      </template>
      <lay-quote style="background-color: transparent;border: none;color: aliceblue">专注一下</lay-quote>
      <lay-progress id="timer-circle" :percent="percent" circle show-text theme="orange" :text="times" :circleSize="200" :circleWidth="10">
      </lay-progress>
      <lay-button-group>
        <lay-button :disabled="!(status === 0 || status === 2)" @click="start" type="primary">开始</lay-button>
        <lay-button :disabled="(status === 2)" @click="paused" type="warm">暂停</lay-button>
        <lay-button :disabled="!(status !== 0)" @click="stop" type="danger">停止</lay-button>
      </lay-button-group>
    </lay-card>
  </div>
</template>

<style scoped>
div {
  display: block;
}

#timer-circle div{
  font-size: 40px;
}

.timer{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(255 255 255);
  z-index: 999999999;
  background-image: url('../../assets/bg.jpeg');
}
.layui-card{
  background-color:transparent;
}
#timer-circle ::v-deep(.layui-progress-text.lay-progress-circle__text) {
    color: aliceblue;
    font-size: 40px;
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