<script setup>
import {ref} from "vue";
import dayjs from "dayjs";
import ArraySupport from 'dayjs/plugin/arraySupport'
import toArray from 'dayjs/plugin/toArray'
import FocusRecordApi from "@/api/focusRecord";
import {showNotify} from "vant";
dayjs.extend(ArraySupport);
dayjs.extend(toArray);
const form = ref({});
const typeName = ref();
const sceneName = ref();
// const columns = ref([
//   {title: "选项", width: "30px", type: "checkbox", fixed: "left"},
//   {title: "类型", width: "80px", key: "type"},
//   {title: "开始时间", width: "100px", key: "startDateTime",},
//   {title: "结束时间", width: "180px", key: "endDateTime"},
//   {title: "场景", width: "180px", key: "scene"},
//   {title: "描述", width: "180px", key: "remark"},
//   {title: "操作", width: "100px", customSlot: "operator", key: "operator", fixed: "right", ignoreExport: true}
//
// ]);
// const dataSource = ref([
//   {
//     'type': "阅读999",
//     'startDateTime': "2024-10-21 22:42",
//     'endDateTime': "2024-10-21 23:42",
//     'scene': "出租房",
//     "remark": "编写专注记录软件。"
//   }
// ]);


const isShowTypePicker = ref(false);
const isShowScenePicker = ref(false);
const isShowStartDateTimePicker = ref(false);
const isShowEndDateTimePicker = ref(false);

const typeColumns = ref([
  {text: '阅读', value: '1'},
  {text: '学习', value: '2'},
  {text: '编码', value: '3'},
  {text: '运动', value: '4'},
]);
const sceneColumns = ref([
  {text: '家', value: '1'},
  {text: '公司', value: '2'},
  {text: '测试', value: '3'},
  {text: '其他', value: '4'},
]);

const setTypeConfirm = (data) => {
  console.log(data);
  form.value.type = data.selectedValues[0];
  typeName.value = data.selectedOptions[0].text;
  isShowTypePicker.value = false;
};

const setSceneConfirm = (data) => {
  console.log(data);
  form.value.scene = data.selectedValues[0];
  sceneName.value = data.selectedOptions[0].text;
  isShowScenePicker.value = false;
};

const dataTime = dayjs().toArray();

const date = ref(dataTime.slice(0,3));
const time = ref(dataTime.slice(3,6));
const minDate = new Date(2020, 0, 1);
const maxDate = new Date(2025, 5, 1);

// 首先获取当前日期时间
// 通过计算函数返回数组

const dateTimeConfirm = (type,data) => {
  console.info(data);
  const dateTime = dayjs([...data[0].selectedValues,...data[1].selectedValues]);
  if(type==='date'){
    form.value.startDateTime = dateTime.format('YYYY-MM-DD HH:mm:ss');
    isShowStartDateTimePicker.value = false;
  }
  if(type==='time'){
    form.value.endDateTime = dateTime.format('YYYY-MM-DD HH:mm:ss');
    isShowEndDateTimePicker.value = false;
  }
}

// list

const queryParam = {
  'current': 1,
  'size': 2
};
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const list = ref([]);

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};

const onLoad = () => {
  FocusRecordApi.queryPage(queryParam).then((res) => {
    list.value = list.value.concat(res.data.records);
    loading.value = false;
    // 主要通知
    showNotify({type: 'primary', message: res.msg});
    // 数据全部加载完成
    if (list.value.length >= res.data.total) {
      finished.value = true;
    }else{
      queryParam.current += 1;
    }
  }).catch((err) => {
    // 危险通知
    showNotify({type: 'danger', message: err.message});
  }).catch(() => {
    finished.value = true;
  })
}

const onSubmit = (values)=>{
  debugger;
  console.info(values);
  FocusRecordApi.add(values).then((res)=>{
    debugger;
    console.debug(res);
    // 成功通知
    showNotify({type: 'success', message: res.msg});
  }).catch((err)=>{
    console.error(err);
    // 危险通知
    showNotify({type: 'danger', message: err.message});
  });
};
</script>

<template>
  <van-row>
    <van-col span="24">
      <van-form @submit="onSubmit">
        <van-field
            v-model="typeName"
            is-link
            readonly
            name="type"
            label="类型"
            placeholder="点击选择类型"
            @click="isShowTypePicker = true"
        />
        <van-popup v-model:show="isShowTypePicker" position="bottom">
          <van-picker
              :columns="typeColumns"
              @confirm="setTypeConfirm"
              @cancel="isShowTypePicker = false"
          />
        </van-popup>
        <van-field
            v-model="sceneName"
            is-link
            readonly
            name="scene"
            label="场景"
            placeholder="点击选择场景"
            @click="isShowScenePicker = true"
        />
        <van-popup v-model:show="isShowScenePicker" position="bottom">
          <van-picker
              :columns="sceneColumns"
              @confirm="setSceneConfirm"
              @cancel="isShowScenePicker = false"
          />
        </van-popup>
        <van-field
            v-model="form.startDateTime"
            is-link
            readonly
            name="startDateTime"
            label="时间选择"
            placeholder="点击选择时间"
            @click="isShowStartDateTimePicker = true"
        />
        <van-popup v-model:show="isShowStartDateTimePicker" position="bottom">
          <van-picker-group
              title="开始日期"
              :tabs="['选择日期', '选择时间']"
              @confirm="(data)=>{dateTimeConfirm('date',data)}"
              @cancel="isShowStartDateTimePicker = false"
          >
            <van-date-picker
                v-model="date"
                :min-date="minDate"
                :max-date="maxDate"
            />
            <van-time-picker v-model="time" :columns-type="['hour', 'minute', 'second']"/>
          </van-picker-group>
        </van-popup>
        <van-field
            v-model="form.endDateTime"
            is-link
            readonly
            name="endDateTime"
            label="时间选择"
            placeholder="点击选择时间"
            @click="isShowEndDateTimePicker = true"
        />
        <van-popup v-model:show="isShowEndDateTimePicker" position="bottom">
          <van-picker-group
              title="开始日期"
              :tabs="['选择日期', '选择时间']"
              @confirm="(data)=>{dateTimeConfirm('time',data)}"
              @cancel="isShowEndDateTimePicker = false"
          >
            <van-date-picker
                v-model="date"
                :min-date="minDate"
                :max-date="maxDate"
            />
            <van-time-picker v-model="time" :columns-type="['hour', 'minute', 'second']"/>
          </van-picker-group>
        </van-popup>
        <van-field
            v-model="form.remark"
            name="remark"
            label="备注"
            placeholder="请输入备注"
        />
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </van-col>
  </van-row>
  <van-row>
    <van-col span="24">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
          <van-cell v-for="item in list" :key="item">
            <van-swipe-cell>
              <van-cell
                  class="list-card"
              >
                <template #title>
                  <span>{{item.id}}-{{item.type}}</span>
                </template>
              <template #label>
                <span style="display: none;">{{item.type}}</span>
                <span>{{item.startDateTime}}</span>
                <span>{{item.endDateTime}}</span>
                <span>{{item.scene}}</span>
                <span>{{item.remark}}</span>
              </template>
              </van-cell>
              <template #right>
                <van-button square text="Delete" type="danger" class="delete-button" />
              </template>
            </van-swipe-cell>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </van-col>
  </van-row>
</template>

<style scoped>
.list-card ::v-deep(.van-cell__title),::v-deep(.van-cell__label){
  text-align: left;
}
span{
  display: block;
}
</style>