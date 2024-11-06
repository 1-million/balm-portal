import Api from '@/api';

const MODULE_URL = '/focus/record';

const add = (params) => Api.post(`${MODULE_URL}/add`, { ...params });

const del = (params) => Api.get(`${MODULE_URL}/del`, { params });

const update = (params) => Api.post(`${MODULE_URL}/save`, { params });

const queryPage = (params) => Api.get(`${MODULE_URL}/queryPage`, { params });
const getFocusing = (params) => Api.get(`${MODULE_URL}/getFocusing`, { params });
const setFinish = (params) => Api.post(`${MODULE_URL}/setFinish`, { ...params });
const getScenes = (params) => Api.get(`${MODULE_URL}/getScenes`, { params });
const getTypes = (params) => Api.get(`${MODULE_URL}/getTypes`, { params });
const FocusRecordApi= {
  add, // 增加
  del, // 删除
  update, // 更新
  queryPage, // 获取
  getFocusing,// 获取正在进行的专注记录
  setFinish,// 结束记录
  getScenes,// 获取场景列表
  getTypes// 获取类型列表
};

export default FocusRecordApi;
