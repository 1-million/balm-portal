<script setup lang="ts">
import {ref, onMounted, onUnmounted, reactive} from 'vue';
import {layer} from "@layui/layer-vue";
import {api_getTimeSlotListByPage, api_saveOrUpdate} from "@/api/module/time-slot";
import moment from 'moment';
import {api_getIndicatorTree} from "@/api/module/indicator";

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
const pageJson = reactive({ current: 1, limit: 1, total: 0 });
// 是否正在加载
let isLoading = false;

// 新增记录弹窗状态
const addDialogVisible = ref(false);
const addFormRef = ref();
const action11 = ref([
  {
    text: "确认",
    callback: () => {
      submit()
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
  duration: 30,
  predictThings: '',
  actualThings: '',
  vimRate: 1,
  status: 0,
  remark: "",
}
// 新增记录表单数据
const treeData = ref([]);
const replaceFields = {
  key: 'id',
  title: 'name',
  field:"id",
  children: 'children'
};
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

const datePeriod = ref(moment().format('YYYY-MM-DD'))

function showAddTimeSlot(){
  addDialogVisible.value = true;
  newJson.value = {...template};
  // 调用接口获取树形数据
  api_getIndicatorTree().then(({ data }) => {
    treeData.value = data;
  });
}

// 提交新增记录
function submit() {
  // 验证表单
  // if (!newJson.value.indicatorName || !newJson.value.datePeriod || !newJson.value.startTime) {
  //   alert('请填写必填字段');
  //   return;
  // }
  debugger
  api_saveOrUpdate(newJson.value).then(({data,code,msg}) => {
    if(code == 200){
      layer.msg(msg, { icon: 1 });
      addDialogVisible.value = false;
    }else{
      layer.msg(msg+","+data, { icon: 5 });
    }
  })
}

// 分页加载数据
function loadData() {
  if (isLoading) return;
  isLoading = true;
  // 模拟 API 请求
  api_getTimeSlotListByPage( {
    current: pageJson.current,
    size: pageJson.limit,
    datePeriod:datePeriod.value
  }).then(({data,code,msg}) => {
    if (code == 200) {
      tableData.value = data.records;
      pageJson.total = data.total;
    } else {
      layer.msg(msg+","+data, { icon: 5 });
    }
    isLoading = false;
  });
}

const change = (page:any) => {
  pageJson.current = page.current;
  pageJson.limit = page.limit;
  loadData()
}

// 初始化
onMounted(() => {
  // 初始加载数据
  loadData();
});


</script>

<template>
  <div class="table-container">
    <lay-table
        id="table"
        ref="refTable"
        :page="pageJson"
        @change="change"
        :loading="isLoading"
        :columns="columns"
        :data-source="tableData"
        :data="tableData" :height="tableHeight">
      <template #toolbar>
        <lay-button
            size="sm"
            type="normal"
            @click="showAddTimeSlot"
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
        状态:{{ row.status == 0 ? '计划' : row.stat6us == 1?'进行中':'已完成' }}
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
            <lay-form ref="addFormRef" :model="newJson">
            <lay-form-item label="指标名称" prop="indicatorName">
              <lay-tree-select v-model="newJson.indicatorId" placeholder="请选择指标名称" :data="treeData" :replaceFields="replaceFields" :default-expand-all="true" ></lay-tree-select>
            </lay-form-item>
            <lay-form-item label="所属日期" prop="datePeriod">
              <lay-date-picker v-model="newJson.datePeriod" placeholder="请选择所属日期"></lay-date-picker>
            </lay-form-item>
            <lay-form-item label="开始时间" prop="startTime">
              <lay-date-picker  v-model="newJson.startTime" placeholder="请选择开始时间" type="datetime"></lay-date-picker>
            </lay-form-item>
            <lay-form-item label="持续时间（分钟）" prop="duration">
              <lay-input-number v-model="newJson.duration" :min="0" :step="10"></lay-input-number>
            </lay-form-item>
            <lay-form-item label="预期事项" prop="predictThings">
              <lay-input v-model="newJson.predictThings" placeholder="请输入预期事项"></lay-input>
            </lay-form-item>
            <lay-form-item label="实际事项" prop="actualThings">
              <lay-input v-model="newJson.actualThings" placeholder="请输入实际事项"></lay-input>
            </lay-form-item>
            <lay-form-item label="满意率" prop="vimRate">
              <lay-input-number v-model="newJson.vimRate" :min="0" :max="1" :step="0.1"></lay-input-number>
            </lay-form-item>
            <lay-form-item label="备注" prop="remark">
              <lay-input v-model="newJson.remark" placeholder="请输入备注"></lay-input>
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