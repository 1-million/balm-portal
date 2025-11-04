<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {layer} from "@layui/layer-vue";
import {api_getTimeSlotListByPage} from "@/api/module/time-slot";

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
// 新增记录表单数据
const newRecord = ref({
  indicatorId: 3, // 默认值
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
function submitNewRecord() {
  // 验证表单
  if (!newRecord.value.indicatorName || !newRecord.value.datePeriod || !newRecord.value.startTime) {
    alert('请填写必填字段');
    return;
  }

  // 模拟提交到表格数据
  tableData.value.unshift({
    id: tableData.value.length + 1,
    indicatorId: newRecord.value.indicatorId,
    indicatorName: newRecord.value.indicatorName,
    datePeriod: newRecord.value.datePeriod,
    startTime: newRecord.value.startTime,
    duration: newRecord.value.duration,
    predictThings: newRecord.value.predictThings,
    actualThings: newRecord.value.actualThings,
    vimRate: newRecord.value.vimRate,
    status: newRecord.value.status,
    remark: newRecord.value.remark,
    createTime: new Date().toISOString(),
  });

  // 关闭弹窗并重置表单
  addDialogVisible.value = false;
  newRecord.value = {
    indicatorId: 3,
    indicatorName: '',
    datePeriod: '',
    startTime: '',
    duration: 0,
    predictThings: '',
    actualThings: '',
    vimRate: 0,
    status: 0,
    remark: "",
  };
}

// 模拟数据加载
function loadData() {
  if (isLoading) return;
  isLoading = true;

  // 模拟 API 请求
  setTimeout(() => {
    let newData;
    api_getTimeSlotListByPage().then(({data,code,msg}) => {
      if (code == 200) {
        debugger
        newData.push(data.records)
      } else {
        layer.msg(msg+","+data, { icon: 5 })
      }
    })
    if (newData != undefined || newData != null){
    tableData.value = [...tableData.value, ...newData];
    }
    currentPage++;
    isLoading = false;
  }, 500);
}

// 滚动事件监听
function handleScroll() {
  if (!tableContainer.value) return;

  const container = tableContainer.value;
  const scrollTop = container.scrollTop;
  const scrollHeight = container.scrollHeight;
  const clientHeight = container.clientHeight;

  // 判断是否滚动到底部
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    loadData();
  }
}

// 初始化
onMounted(() => {
  // 初始加载数据
  loadData();

  // 添加滚动监听
  if (tableContainer.value) {
    tableContainer.value.addEventListener('scroll', handleScroll);
  }
});

// 清理事件监听
onUnmounted(() => {
  if (tableContainer.value) {
    tableContainer.value.removeEventListener('scroll', handleScroll);
  }
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
      <lay-form ref="addFormRef" :model="newRecord">
        <lay-form-item label="指标名称" prop="indicatorName">
          <lay-input v-model="newRecord.indicatorName" placeholder="请输入指标名称"></lay-input>
        </lay-form-item>
        <lay-form-item label="日期" prop="datePeriod">
          <lay-date-picker v-model="newRecord.datePeriod" placeholder="请选择日期"></lay-date-picker>
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
        <lay-form-item label="精力率" prop="vimRate">
          <lay-input-number v-model="newRecord.vimRate" :min="0" :max="1" :step="0.05"></lay-input-number>
        </lay-form-item>
        <lay-form-item label="备注" prop="remark">
          <lay-input v-model="newRecord.remark" placeholder="请输入备注"></lay-input>
        </lay-form-item>
      </lay-form>
      <template #footer>
        <lay-button @click="addDialogVisible = false">取消</lay-button>
        <lay-button type="primary" @click="submitNewRecord">提交</lay-button>
      </template>
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