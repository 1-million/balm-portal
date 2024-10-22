import Api from '@/api';

const MODULE_URL = '/focus/record';

const add = (params) => Api.post(`${MODULE_URL}/add`, { params });

const del = (params) => Api.get(`${MODULE_URL}/del`, { params });

const update = (params) => Api.post(`${MODULE_URL}/save`, { params });

const get = (params) => Api.post(`${MODULE_URL}/list`, { params });

const FocusRecordApi= {
  add, // 增加用户
  del, // 删除用户
  update, // 更新用户
  get, // 获取用户
};

export default FocusRecordApi;
