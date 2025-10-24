<template>
  <lay-container fluid="true" class="menu-box">
    <lay-card>
      <lay-form style="margin-top: 10px">
        <lay-row>
          <lay-col :md="5">
            <lay-form-item label="菜单名称" label-width="80">
              <lay-input
                  v-model="searchQuery.name"
                  placeholder="请输入"
                  size="sm"
                  :allow-clear="true"
                  style="width: 98%"
              ></lay-input>
            </lay-form-item>
          </lay-col>
          <lay-col :md="5">
            <lay-form-item label="菜单地址" label-width="80">
              <lay-input
                  v-model="searchQuery.address"
                  placeholder="请输入"
                  size="sm"
                  :allow-clear="true"
                  style="width: 98%"
              ></lay-input>
            </lay-form-item>
          </lay-col>
          <lay-col :md="5">
            <lay-form-item label="权限标识" label-width="80">
              <lay-input
                  v-model="searchQuery.identifying"
                  placeholder="请输入"
                  size="sm"
                  :allow-clear="true"
                  style="width: 98%"
              ></lay-input>
            </lay-form-item>
          </lay-col>
          <lay-col :md="5">
            <lay-form-item label-width="20">
              <lay-button
                  style="margin-left: 20px"
                  type="normal"
                  size="sm"
                  @click="toSearch"
              >
                查询
              </lay-button>
              <lay-button size="sm" @click="toReset"> 重置 </lay-button>
            </lay-form-item>
          </lay-col>
        </lay-row>
      </lay-form>
    </lay-card>
    <!-- table -->
    <div class="table-box">
      <lay-table
          :height="`100%`"
          ref="tableRef6"
          :loading="loading"
          children-column-name="children"
          :columns="columns6"
          :data-source="dataSource7"
          :default-toolbar="true"
          :default-expand-all="defaultExpandAll6"
          :expand-index="1"
      >
        <template #toolbar>
          <lay-button type="primary" size="sm" @click="getCheckData6"
          >获取选中数据</lay-button
          >
          <lay-button
              size="sm"
              @click="changeVisible11('新建', null)"
              type="normal"
          >
            新建
          </lay-button>
          <lay-button size="sm" @click="expandAll6(true)">展开全部</lay-button>
          <lay-button size="sm" @click="expandAll6(false)">折叠全部</lay-button>
        </template>
        <template #name="{ row }">
          <lay-icon :class="row.icon"></lay-icon> &nbsp;&nbsp;
          {{ row.name }}
        </template>
        <template #option="{ row }">
          <lay-button
              @click="changeVisible11('新建', null)"
              size="xs"
              border="blue"
              border-style="dashed"
          >
            添加
          </lay-button>
          <lay-button
              @click="changeVisible11('修改', row)"
              size="xs"
              border="green"
              border-style="dashed"
          >
            修改
          </lay-button>
          <lay-button
              @click="toRemove"
              size="xs"
              border="red"
              border-style="dashed"
          >
            删除
          </lay-button>
        </template>
        <template #status="{ row }">
          <div v-show="row.status == 0">
            <lay-tag color="#165DFF" variant="light">停用</lay-tag>
          </div>
          <div v-show="row.status == 1">
            <lay-tag color="#2dc570" variant="light">启用</lay-tag>
          </div>
        </template>
        <template #type="{ row }">
          <div v-show="row.type == 0">
            <lay-tag color="#165DFF" variant="light">指标</lay-tag>
          </div>
          <div v-show="row.type == 1">
            <lay-tag color="#2dc570" variant="light">步骤</lay-tag>
          </div>
        </template>
      </lay-table>
    </div>

    <lay-layer v-model="visible11" :title="title" :area="['700px', '370px']">
      <div style="padding: 20px">
        <lay-form :model="model11" ref="layFormRef11" required>
          <lay-row>
            <lay-col md="12">
              <lay-form-item label="菜单名称" prop="name">
                <lay-input v-model="model11.name"></lay-input>
              </lay-form-item>
              <lay-form-item label="路由路径" prop="routePath">
                <lay-input v-model="model11.routePath"></lay-input>
              </lay-form-item>
              <lay-form-item label="组件路径" prop="compontPath">
                <lay-input v-model="model11.compontPath"></lay-input>
              </lay-form-item>
              <lay-form-item label="图标" prop="icon">
                <lay-input v-model="model11.icon"></lay-input>
              </lay-form-item>
            </lay-col>
            <lay-col md="12">
              <lay-form-item label="排序" prop="sort">
                <lay-input-number
                    style="width: 100%"
                    v-model="model11.sort"
                    position="right"
                ></lay-input-number>
              </lay-form-item>
              <lay-form-item label="是否显示" prop="isShow">
                <lay-select v-model="model11.isShow" style="width: 100%">
                  <lay-select-option value="是" label="是"></lay-select-option>
                  <lay-select-option value="否" label="否"></lay-select-option>
                </lay-select>
              </lay-form-item>

              <lay-form-item label="类型" prop="type">
                <lay-input v-model="model11.type"></lay-input>
              </lay-form-item>
            </lay-col>
          </lay-row>
        </lay-form>
        <div style="width: 97%; text-align: right">
          <lay-button size="sm" type="primary" @click="toSubmit"
          >保存</lay-button
          >
          <lay-button size="sm" @click="toCancel">取消</lay-button>
        </div>
      </div>
    </lay-layer>
  </lay-container>
</template>
<script setup lang="ts">
import {ref, reactive, onMounted} from 'vue'
import { layer } from '@layui/layui-vue'
import {api_getIndicatorTree, getIndicatorTree} from "@/api/module/indicator";
const searchQuery = ref({
  address: '',
  identifying: '',
  name: ''
})

function toReset() {
  searchQuery.value = {
    address: '',
    identifying: '',
    name: ''
  }
}

function toSearch() {
  page.current = 1
  change(page)
}
const change = (page: any) => {
  loading.value = true
  setTimeout(() => {
    //
    loading.value = false
  }, 1000)
}
const page = reactive({ current: 1, limit: 10, total: 100 })
const loading = ref(false)
const tableRef6 = ref()

const columns6 = [
  {
    fixed: 'left',
    type: 'checkbox',
    title: '复选'
  },
  {
    title: '指标名称',
    key: 'name',
    customSlot: 'name'
  },
  {
    title: '排序',
    width: '40px',
    key: 'sortNo',
  },
  {
    title: '开始时间',
    key: 'startPeriod'
  },
  {
    title: '结束时间',
    key: 'endPeriod'
  },
  {
    title: '状态',
    key: 'status',
    width: '65px',
    customSlot: 'status'
  },
  {
    title: '类型',
    key: 'type',
    width: '65px',
    customSlot: 'type'
  },
  {
    title: '备注',
    key: 'remark'
  },
  {
    title: '创建时间',
    key: 'createTime'
  },
  {
    title: '操作',
    key: 'option',
    customSlot: 'option'
  }
]

const dataSource7 = ref([
  {
    "id": 1,
    "sortNo": 1,
    "startPeriod": "2025-01-01 00:00:00",
    "endPeriod": "2025-12-31 23:59:59",
    "name": "年度指标",
    "status": 1,
    "type": 0,
    "remark": null,
    "createTime": "2025-10-20 10:20:02",
    "children": [
      {
        "id": 4,
        "sortNo": 1,
        "startPeriod": "2025-01-01 00:00:00",
        "endPeriod": "2025-12-31 23:59:59",
        "name": "年度阅读",
        "status": 1,
        "type": 0,
        "remark": null,
        "createTime": "2025-10-20 10:20:44",
        "pId": 1
      }
    ],
    "pId": 0
  },
  {
    "id": 2,
    "sortNo": null,
    "startPeriod": null,
    "endPeriod": null,
    "name": "突发指标",
    "status": 1,
    "type": 0,
    "remark": null,
    "createTime": "2025-10-21 14:27:10",
    "children": [
      {
        "id": 3,
        "sortNo": 1,
        "startPeriod": "2025-01-01 00:00:00",
        "endPeriod": "2025-02-28 23:59:59",
        "name": "计算机基础",
        "status": 1,
        "type": 0,
        "remark": null,
        "createTime": "2025-10-20 10:21:20",
        "children": [
          {
            "id": 13,
            "sortNo": 1,
            "startPeriod": "2025-09-24 00:31:56",
            "endPeriod": "2025-10-01 00:31:56",
            "name": "管浩辰2222",
            "status": 0,
            "type": 1,
            "remark": "incididunt elit pariatur",
            "createTime": "2025-10-23 17:48:48",
            "pId": 3
          }
        ],
        "pId": 2
      }
    ],
    "pId": 0
  }
])

const dataSource6 = [
  {
    id: '10001',
    name: '工作空间',
    type: '目录',
    icon: 'layui-icon-home',
    age: 0,
    routePath: '/workspace',
    compontPath: '',
    isShow: '是',
    children: [
      {
        id: '10009',
        name: '工作台',
        type: '菜单',
        sort: 1,
        icon: 'layui-icon-util',
        routePath: '/workspace/workbench',
        compontPath: '/workspace/workbench',
        isShow: '是'
      },
      {
        id: '10012',
        name: '控制台',
        type: '菜单',
        sort: 2,
        icon: 'layui-icon-engine',
        routePath: '/workspace/console',
        compontPath: '/workspace/console',
        isShow: '是'
      },
      {
        id: '10012',
        name: '分析页',
        type: '菜单',
        sort: 3,
        icon: 'layui-icon-chart-screen',
        routePath: '/workspace/analysis',
        compontPath: '/workspace/analysis',
        isShow: '是'
      },
      {
        id: '10012',
        name: '监控页',
        type: '菜单',
        sort: 4,
        icon: 'layui-icon-find-fill',
        routePath: '/workspace/monitor',
        compontPath: '/workspace/monitor',
        isShow: '是'
      }
    ]
  }
]

onMounted(() => {
  //加载表格数据
  const getIndicatorTree = async ()=>{
    let {data,code,msg} = await api_getIndicatorTree()
    if(code == 200){
      dataSource7.value = data
    }
  }
  getIndicatorTree()
})

const getCheckData6 = function () {
  layer.msg(tableRef6.value.getCheckData())
}

const defaultExpandAll6 = ref(false)

const expandAll6 = function (flag: any) {
  defaultExpandAll6.value = flag
}
const model11 = ref({
  name: '',
  type: '',
  sort: 0,
  icon: '',
  routePath: '',
  compontPath: '',
  isShow: '是'
})
const layFormRef11 = ref()
const visible11 = ref(false)

const title = ref('新增')
const changeVisible11 = (text: any, row: any) => {
  title.value = text
  if (row != null) {
    let info = JSON.parse(JSON.stringify(row))
    model11.value = info
  } else {
    model11.value = {
      name: '',
      type: '',
      sort: 0,
      icon: '',
      routePath: '',
      compontPath: '',
      isShow: '是'
    }
  }
  visible11.value = !visible11.value
}
const submit11 = function () {
  layFormRef11.value.validate((isValidate: any, model: any, errors: any) => {
    layer.open({
      type: 1,
      title: '表单提交结果',
      content: `<div style="padding: 10px"><p>是否通过 : ${isValidate}</p> <p>表单数据 : ${JSON.stringify(
          model
      )} </p> <p>错误信息 : ${JSON.stringify(errors)}</p></div>`,
      shade: false,
      isHtmlFragment: true,
      btn: [
        {
          text: '确认',
          callback(index: number) {
            layer.close(index)
          }
        }
      ],
      area: '500px'
    })
  })
}
// 清除校验
const clearValidate11 = function () {
  layFormRef11.value.clearValidate()
}
// 重置表单
const reset11 = function () {
  layFormRef11.value.reset()
}
function toRemove() {
  layer.confirm('您将删除所有选中的数据？', {
    title: '提示',
    btn: [
      {
        text: '确定',
        callback: (id: any) => {
          layer.msg('您已成功删除')
          layer.close(id)
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
function toSubmit() {
  layer.msg('保存成功！', { icon: 1, time: 1000 })
  visible11.value = false
}
function toCancel() {
  visible11.value = false
}
</script>

<style scoped>
.menu-box {
  width: calc(100vw - 220px);
  height: calc(100vh - 110px);
  margin-top: 10px;
  box-sizing: border-box;
  overflow: hidden;
}
.top-search {
  margin-top: 10px;
  padding: 10px;
  height: 40px;
  border-radius: 4px;
  background-color: #fff;
}
.table-box {
  margin-top: 10px;
  padding: 10px;
  height: 700px;
  width: 100%;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #fff;
}

.search-input {
  display: inline-block;
  width: 98%;
  margin-right: 10px;
}
.table-style {
  margin-top: 10px;
}
.isChecked {
  display: inline-block;
  background-color: #e8f1ff;
  color: red;
}
</style>