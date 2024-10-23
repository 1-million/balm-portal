// 定义mock接口请求拦截
import {GET_FOCUS_LIST_URL} from "@/axios/api/focus/index";
import {mock} from "@/axios/axiosConfig";

/**
 * Mock.mock参数
 * 第一个是拦截接口的地址
 * 第二个是接口请求类型(可省略)
 * 第三个是一个函数=>拦截后的请求逻辑
 */

mock.onGet(GET_FOCUS_LIST_URL).reply(200, [{"title": "测试2"}, {"title": "测试3"}, {"title": "测试4"}, {"title": "测试5"}, {"title": "测试6"}, {"title": "测试7"}])
