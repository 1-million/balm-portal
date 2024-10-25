<script setup>
import {ref} from "vue";
import dayjs from "dayjs";

const form = ref({});

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
const isShowDateTimePicker = ref(false);

const typeColumns = ref([
  { text: '阅读', value: '1' },
  { text: '学习', value: '2' },
  { text: '编码', value: '3' },
  { text: '运动', value: '4' },
]);


const setTypeConfirm = (data)=>{
  console.log(data);
  form.value.type =  data.selectedValues[0];
  isShowTypePicker.value = false;
};
const minDate = new Date(2020, 0, 1);
const maxDate = new Date(2025, 5, 1);

// 首先获取当前日期时间
// 通过计算函数返回数组

const test = dayjs();
console.log(test.format('YYYY-MM-DD HH:mm:ss'));
// const dateTimeFormater =  DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss');
const startDateTime = ref('2024-05-27 11:33:43');
// const endDateTime = ref(['2023','01','21','11','12','36']);

const dateTimeConfirm = (data)=>{
  console.log(data);
  isShowDateTimePicker.value = false;
}

const dateTimeFormatter = (type, option) => {
  if (type === 'hour') {
    option.text += '时';
  }
  if (type === 'minute') {
    option.text += '分';
  }
  if (type === 'second') {
    option.text += '秒';
  }
  return option;
};

</script>

<template>
  <van-row>
    <van-col span="24">
      <van-form @submit="onSubmit">
        <van-field
            v-model="form.type"
            is-link
            readonly
            name="picker"
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
            v-model="form.startDateTime"
            is-link
            readonly
            name="datePicker"
            label="时间选择"
            placeholder="点击选择时间"
            @click="isShowDateTimePicker = true"
        />
        <van-popup v-model:show="isShowDateTimePicker" position="bottom">
          <van-picker-group
              title="开始日期"
              :tabs="['选择日期', '选择时间']"
              @confirm="dateTimeConfirm"
              @cancel="isShowDateTimePicker = false"
          >
            <van-date-picker
                v-model="startDateTime"
                :min-date="minDate"
                :max-date="maxDate"
                :formatter="dateTimeFormatter"
            />
            <van-time-picker v-model="time" :columns-type="['hour', 'minute', 'second']" :formatter="dateTimeformatter" />
          </van-picker-group>
        </van-popup>
        <van-field
            v-model="form.remark"
            name="datePicker"
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
</template>

<style scoped>

</style>