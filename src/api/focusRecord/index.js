import Api from '@/api';

const MODULE_URL = '/focus/record';

const add = (params) => Api.post(`${MODULE_URL}/add`, { ...params });

const del = (params) => Api.get(`${MODULE_URL}/del`, { params });

const update = (params) => Api.post(`${MODULE_URL}/save`, { params });

const queryPage = (params) => Api.get(`${MODULE_URL}/queryPage`, { params });

const FocusRecordApi= {
  add, // 增加
  del, // 删除
  update, // 更新
  queryPage, // 获取
};

export default FocusRecordApi;
