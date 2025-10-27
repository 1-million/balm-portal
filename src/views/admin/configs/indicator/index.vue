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
              @click="changeVisible11('添加', null)"
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
        <template #option="{ row }">
          <lay-button
              @click="changeVisible11('添加', row)"
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
              @click="toRemove(row)"
              size="xs"
              border="red"
              border-style="dashed"
          >
            删除
          </lay-button>
        </template>
      </lay-table>
    </div>

    <lay-layer v-model="visible11" :title="title" :area="['700px', '430px']">
      <div style="padding: 20px">
        <lay-form :model="indicator" ref="layFormRef11" required>
          <lay-row>
            <lay-col md="12">
              <lay-form-item label="父级指标" prop="pId">
                <lay-input v-model="indicator.pId"></lay-input>
              </lay-form-item>
              <lay-form-item label="菜单名称" prop="name">
                <lay-input v-model="indicator.name"></lay-input>
              </lay-form-item>
              <lay-form-item label="开始日期" prop="startPeriod">
                <lay-date-picker v-model="indicator.startPeriod" type="datetime"></lay-date-picker>
              </lay-form-item>
              <lay-form-item label="结束日期" prop="endPeriod">
                <lay-date-picker v-model="indicator.endPeriod" type="datetime"></lay-date-picker>
              </lay-form-item>
              <lay-form-item label="状态" prop="status">
                <lay-select v-model="indicator.status" style="width: 100%">
                  <lay-select-option :value="0" label="停用"></lay-select-option>
                  <lay-select-option :value="1" label="启用"></lay-select-option>
                </lay-select>
              </lay-form-item>
            </lay-col>
            <lay-col md="12">
              <lay-form-item label="排序" prop="sort">
                <lay-input-number
                    style="width: 100%"
                    v-model="indicator.sortNo"
                    position="right"
                ></lay-input-number>
              </lay-form-item>
              <lay-form-item label="类型" prop="type">
                <lay-select v-model="indicator.type" style="width: 100%">
                  <lay-select-option :value="0" label="指标"></lay-select-option>
                  <lay-select-option :value="1" label="步骤"></lay-select-option>
                </lay-select>
              </lay-form-item>
              <lay-form-item label="备注" prop="remark">
                <lay-input v-model="indicator.remark"></lay-input>
              </lay-form-item>
            </lay-col>
          </lay-row>
        </lay-form>
        <div style="width: 97%; text-align: center">
          <lay-button size="sm" type="primary" @click="toSubmit">保存</lay-button>
          <lay-button size="sm" @click="toCancel">取消</lay-button>
        </div>
      </div>
    </lay-layer>
  </lay-container>
</template>
<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import {layer} from '@layui/layui-vue'
import {api_delete, api_getIndicatorTree, api_saveOrUpdate} from '@/api/module/indicator';
import moment from 'moment';
import {login} from "@/api/module/user";

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

const dataSource7 = ref([])

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
const indicator = ref({
  "id": null,
  "pId": null,
  "sortNo": 1,
  "startPeriod": moment().format('YYYY-MM-DD HH:mm:ss'),
  "endPeriod": moment().format('YYYY-MM-DD HH:mm:ss'),
  "name": null,
  "status": 1,
  "type": 0,
  "remark": null
})
const layFormRef11 = ref()
const visible11 = ref(false)

const title = ref('新增')
const changeVisible11 = (text: any, row: any) => {
  title.value = text
  if(text === "添加"){
    indicator.value ={
      "id": null,
      "pId": row.id,
      "sortNo": 1,
      "startPeriod": moment().format('YYYY-MM-DD HH:mm:ss'),
      "endPeriod": moment().format('YYYY-MM-DD HH:mm:ss'),
      "name": null,
      "status": 1,
      "type": 0,
      "remark": null
    }
  }
  if(text === "修改"){
    indicator.value = JSON.parse(JSON.stringify(row))
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
function toRemove(row:any) {
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
function toSubmit() {
  api_saveOrUpdate(JSON.parse(JSON.stringify(indicator.value))).then(({data,code,msg}) => {
    if (code == 200) {
      layer.msg('保存成功', { icon: 1 })
      visible11.value = false
    } else {
      layer.msg(msg+","+data, { icon: 5 })
    }
  })
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