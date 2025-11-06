<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {layer} from "@layui/layer-vue";
import {api_getTimeSlotListByPage, api_saveOrUpdate} from "@/api/module/time-slot";
import moment from 'moment';

//表格列数据
const columns = ref([
  // {
  //   fixed: 'left',
  //   type: 'checkbox',
  //   title: '选择'
  // },
  {
    title: '时段记录',
    key: 'id',
    customSlot: 'record'
  },
  {
    title: '操作',
    width: '50px',
    key: 'option',
    customSlot: 'option'
  }
])

// 表格数据
const tableData = ref([]);
// 表格高度（根据需求调整）
const tableHeight = ref('100%');
// 表格容器引用
const tableContainer = ref<HTMLElement | null>(null);
// 当前页码
let currentPage = 1;
// 每页数据量
let pageSize = 20;
// 是否正在加载
let isLoading = false;

// 新增记录弹窗状态
const addDialogVisible = ref(false);
const addFormRef = ref();
const action11 = ref([
  {
    text: "确认",
    callback: () => {
      layer.confirm("确认操作", { shade: false });
    }
  },
  {
    text: "取消",
    callback: () => {
      addDialogVisible.value = false;
    }
  }
]);
const template = {
  indicatorId: null, // 默认值
  indicatorName: '',
  datePeriod: moment().format('YYYY-MM-DD'),
  startTime: moment().format('YYYY-MM-DD HH:mm:ss'),
  duration: 0,
  predictThings: '',
  actualThings: '',
  vimRate: 0,
  status: 0,
  remark: "",
}
// 新增记录表单数据
const newJson = ref({
  indicatorId: null, // 默认值
  indicatorName: '',
  datePeriod: '',
  startTime: '',
  duration: 0,
  predictThings: '',
  actualThings: '',
  vimRate: 0,
  status: 0,
  remark: "",
});

// 提交新增记录
function submit() {
  // 验证表单
  if (!newJson.value.indicatorName || !newJson.value.datePeriod || !newJson.value.startTime) {
    alert('请填写必填字段');
    return;
  }
  api_saveOrUpdate(newJson.value)
  // 关闭弹窗并重置表单
  addDialogVisible.value = false;
}

// 分页加载数据
function loadData() {
  if (isLoading) return;
  isLoading = true;

  // 模拟 API 请求
  api_getTimeSlotListByPage({
    params: {
      page: currentPage,
      size: pageSize,
      datePeriod:'2025-01-01'
    }}).then(({data,code,msg}) => {
    if (code == 200) {
      tableData.value = data.records;
    } else {
      layer.msg(msg+","+data, { icon: 5 });
    }
    isLoading = false;
  });
}

// 初始化
onMounted(() => {
  // 初始加载数据
  loadData();
});


</script>

<template>
  <div class="table-container" ref="tableContainer">
    <lay-table
        id="table"
        ref="refTable"
        :loading="isLoading"
        :columns="columns"
        :data-source="tableData"
        :data="tableData" :height="tableHeight">
      <template #toolbar>
        <lay-button
            size="sm"
            type="normal"
            @click="()=>{addDialogVisible = true}"
        >
          新建
        </lay-button>
      </template>
      <template #pagination>
        <lay-pagination
            v-model="currentPage"
            :total="100"
            :limit="pageSize"
            @change="loadData"
        />
      </template>
      <template #record="{ row }">
        名称:{{row.name}}
        时段:{{ row.startTime?row.startTime.substring(10):null }},
        预期:{{ row.predictThings }},
        实际:{{ row.actualThings }},
        时长:{{ row.duration }}
        精力率:{{ row.vimRate }}
        状态:{{ row.status == 0 ? '进行中' : '已完成' }}
        备注:{{ row.remark }}
      </template>
      <template #option="{ row }">
        <lay-button
            size="xs"
            border="green"
            border-style="dashed"
        >
          修改
        </lay-button>
      </template>
    </lay-table>
    <lay-layer v-model="addDialogVisible" title="新增记录" :area="['600px', '600px']" :btn="action11">
      <lay-container>
        <lay-row>
          <lay-col>
            <lay-form ref="addFormRef" :model="newRecord">
            <lay-form-item label="指标名称" prop="indicatorName">
              <lay-input v-model="newRecord.indicatorName" placeholder="请输入指标名称"></lay-input>
            </lay-form-item>
            <lay-form-item label="所属日期" prop="datePeriod">
              <lay-date-picker v-model="newRecord.datePeriod" placeholder="请选择所属日期"></lay-date-picker>
            </lay-form-item>
            <lay-form-item label="开始时间" prop="startTime">
              <lay-date-picker v-model="newRecord.startTime" placeholder="请选择开始时间"></lay-date-picker>
            </lay-form-item>
            <lay-form-item label="持续时间（分钟）" prop="duration">
              <lay-input-number v-model="newRecord.duration" :min="0" :step="10"></lay-input-number>
            </lay-form-item>
            <lay-form-item label="预期事项" prop="predictThings">
              <lay-input v-model="newRecord.predictThings" placeholder="请输入预期事项"></lay-input>
            </lay-form-item>
            <lay-form-item label="实际事项" prop="actualThings">
              <lay-input v-model="newRecord.actualThings" placeholder="请输入实际事项"></lay-input>
            </lay-form-item>
            <lay-form-item label="满意率" prop="vimRate">
              <lay-input-number v-model="newRecord.vimRate" :min="0" :max="1" :step="0.1"></lay-input-number>
            </lay-form-item>
            <lay-form-item label="备注" prop="remark">
              <lay-input v-model="newRecord.remark" placeholder="请输入备注"></lay-input>
            </lay-form-item>
          </lay-form>
          </lay-col>
        </lay-row>
      </lay-container>
    </lay-layer>
  </div>
</template>

<style scoped>
  .table-container {
    height: 500px; /* 根据需求调整高度 */
    overflow-y: auto;
    border: 1px solid #e6e6e6;
  }
</style>