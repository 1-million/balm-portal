<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import {layer} from "@layui/layer-vue";
import {api_delete, api_getTimeSlotListByPage, api_saveOrUpdate} from "@/api/module/time-slot";
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
    width: '100px',
    key: 'option',
    customSlot: 'option'
  }
])

// 表格数据
const tableData = ref([]);
// 表格高度（根据需求调整）
const tableHeight = ref('100%');
const pageJson = reactive({ current: 1, limit: 50, total: 0 });
// 是否正在加载
let isLoading = false;

const queryParam = reactive({
  datePeriod: moment().format('YYYY-MM-DD')
})

// 新增记录弹窗状态
const addDialogVisible = ref(false);
const editDialogVisible = ref(false);
const addFormRef = ref();
const editFormRef = ref();
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
  endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
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
  endTime: '',
  duration: 0,
  predictThings: '',
  actualThings: '',
  vimRate: 1,
  status: 0,
  remark: "",
});

const datePeriod = ref(moment().format('YYYY-MM-DD'))

function showAddTimeSlot(row:any){
  const getIndicatorTree = async ()=>{
    await api_getIndicatorTree({"id":0,"statues":[0,1]}).then(({ data }) => {
      treeData.value = data;
    });
  }
  if(row){
    newJson.value = {...row}
  }else{
    newJson.value = {...template};
  }
  getIndicatorTree()
  addDialogVisible.value = true;
}

// 提交新增记录
function submit() {
  // 验证表单
  // if (!newJson.value.indicatorName || !newJson.value.datePeriod || !newJson.value.startTime) {
  //   alert('请填写必填字段');
  //   return;
  // }
  api_saveOrUpdate(newJson.value).then(({data,code,msg}) => {
    if(code == 200){
      layer.msg(msg, { icon: 1 });
      addDialogVisible.value = false;
      loadData();
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
    datePeriod:queryParam.datePeriod
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

function remove(row:any){
  layer.confirm('您将删除所有选中的数据？', {
    title: '提示',
    btn: [
      {
        text: '确定',
        callback: (id: any) => {
          api_delete(row.id).then(({data,code,msg}) => {
            if (code == 200) {
              layer.msg('您已成功删除')
              layer.close(id)
            } else {
              layer.msg(msg+","+data, { icon: 5 })
            }
          })
        }
      },
      {
        text: '取消',
        callback: (id: any) => {
          layer.msg('您已取消操作')
          layer.close(id)
        }
      }
    ]
  })
}

// 初始化
onMounted(() => {
  // 初始加载数据
  loadData();
});

function doQuery(){
  loadData()
}

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
        <lay-form>
          <lay-form-item label="" mode="inline">
            <lay-button size="sm" type="normal" @click="showAddTimeSlot(null)">新建</lay-button>
          </lay-form-item>
          <lay-form-item label="日期" mode="inline">
            <lay-date-picker  v-model="queryParam.datePeriod" placeholder="请选择开始时间"></lay-date-picker>
          </lay-form-item>
          <lay-form-item label="" mode="inline">
            <lay-button size="sm" type="normal" @click="doQuery()">查询</lay-button>
          </lay-form-item>
        </lay-form>
      </template>
      <template #record="{ row }">
        <lay-space size="md">
          <lay-tag>{{ row.startTime?row.startTime.substring(10):null }}</lay-tag>
          <lay-tag>{{ row.endTime?row.endTime.substring(10):null }}</lay-tag>
          <lay-tag>{{row.predictThings}}</lay-tag>
          <lay-tag>{{row.actualThings}}</lay-tag>
          <lay-tag>{{row.vimRate * 100 + '%'}}</lay-tag>
          <lay-tag>{{ row.status == 0 ? '计划' : row.stat6us == 1?'进行中':'已完成' }}</lay-tag>
        </lay-space>
      </template>
      <template #option="{ row }">
        <lay-button
            size="xs"
            border="green"
            border-style="dashed"
            @click="showAddTimeSlot(row)"
        >
          修改
        </lay-button>
        <lay-button
            @click="remove(row)"
            size="xs"
            border="red"
            border-style="dashed"
        >
          删除
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
            <lay-form-item label="结束时间" prop="startTime">
              <lay-date-picker  v-model="newJson.endTime" placeholder="请选择结束时间" type="datetime"></lay-date-picker>
            </lay-form-item>
<!--            <lay-form-item label="持续时间（分钟）" prop="duration">
              <lay-input-number v-model="newJson.duration" :min="0" :step="10"></lay-input-number>
            </lay-form-item>-->
            <lay-form-item label="预期事项" prop="predictThings">
              <lay-input v-model="newJson.predictThings" placeholder="请输入预期事项"></lay-input>
            </lay-form-item>
            <lay-form-item label="实际事项" prop="actualThings">
              <lay-input v-model="newJson.actualThings" placeholder="请输入实际事项"></lay-input>
            </lay-form-item>
            <lay-form-item label="满意率" prop="vimRate">
              <lay-input-number v-model="newJson.vimRate" :min="0" :max="1" :step="0.1"></lay-input-number>
            </lay-form-item>
            <lay-form-item label="状态" prop="status">
              <lay-select v-model="newJson.status">
                <lay-select-option :value="0" label="计划"></lay-select-option>
                <lay-select-option :value="1" label="进行中"></lay-select-option>
                <lay-select-option :value="2" label="完成"></lay-select-option>
                <lay-select-option :value="3" label="非预期"></lay-select-option>
              </lay-select>
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