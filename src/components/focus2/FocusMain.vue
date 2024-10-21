<script setup>
import {reactive, ref} from "vue";

const form = ref({});
const loading = ref(false);
const columns = ref([
  {title: "选项", width: "30px", type: "checkbox", fixed: "left"},
  {title: "类型", width: "80px", key: "type"},
  {title: "开始时间", width: "100px", key: "startDateTime",},
  {title: "结束时间", width: "180px", key: "endDateTime"},
  {title: "场景", width: "180px", key: "scene"},
  {title: "描述", width: "180px", key: "remark"},
  {title: "操作", width: "100px", customSlot: "operator", key: "operator", fixed: "right", ignoreExport: true}

]);
const dataSource = ref([
  {
    'type': "阅读",
    'startDateTime': "2024-10-21 22:42",
    'endDateTime': "2024-10-21 23:42",
    'scene': "出租房",
    "remark": "编写专注记录软件。"
  }
]);
const selectedKeys = ref([]);
const page = reactive({current: 1, limit: 10, total: 100});
</script>

<template>
  <lay-row space="10">
    <lay-col md="18">
      <lay-card>
        <lay-table
            :page="page"
            :resize="true"
            :height="'100%'"
            :columns="columns"
            :loading="loading"
            :default-toolbar="true"
            :data-source="dataSource"
            v-model:selected-keys="selectedKeys"
            @change="change"
            @sortChange="sortChange">
          <template v-slot:operator>
            <lay-button size="xs" type="primary">编辑</lay-button>
            <lay-button size="xs">查看</lay-button>
          </template>
        </lay-table>
      </lay-card>
    </lay-col>
    <lay-col md="6">
      <lay-card>
        <lay-form :model="form" pane>
          <lay-form-item label="类型" prop="form.type">
            <lay-select v-model="form.type" placeholder="专注类型，如：阅读、编码等。">
              <lay-select-option :value="1" label="阅读"></lay-select-option>
              <lay-select-option :value="2" label="学习"></lay-select-option>
              <lay-select-option :value="3" label="编码"></lay-select-option>
              <lay-select-option :value="4" label="运动"></lay-select-option>
            </lay-select>
          </lay-form-item>
          <lay-form-item label="开始时间" prop="form.startDateTime">
            <lay-date-picker v-model="form.startDateTime" type="datetime" placeholder="开始时间"
                             allowClear></lay-date-picker>
          </lay-form-item>
          <lay-form-item label="结束时间" prop="form.endDateTime">
            <lay-date-picker v-model="form.endDateTime" type="datetime" placeholder="结束时间"
                             allowClear></lay-date-picker>
          </lay-form-item>
          <lay-form-item label="场景" prop="form.scene">
            <lay-select v-model="form.scene" placeholder="请选择">
              <lay-select-option :value="1" label="出租房"></lay-select-option>
              <lay-select-option :value="2" label="公司"></lay-select-option>
              <lay-select-option :value="3" label="公园"></lay-select-option>
            </lay-select>
          </lay-form-item>
          <lay-form-item label="备注" prop="form.remark">
            <lay-textarea placeholder="请输入备注" v-model="form.remark"></lay-textarea>
          </lay-form-item>
          <lay-form-item>
            <lay-button type="primary" @click="submit">提交</lay-button>
            <lay-button type="default" @click="1">重置</lay-button>
          </lay-form-item>
        </lay-form>
      </lay-card>
    </lay-col>
  </lay-row>

</template>

<style scoped>
.layui-select {
  width: 100%;
}

.layui-date-picker {
  width: 100% !important;
}
.layui-form.layui-border-box.layui-table-view{
  height: calc(100vh - 58px)!important;
}
</style>