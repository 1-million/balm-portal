import axios from "axios";
import qs from "qs";

// axios默认是application/x-www-form-urlencoded,这里修改成application/json
axios.defaults.headers["Content-Type"] = "application/json";

const axiosInstance = axios.create({
	baseURL: 'https://localhost:8888/api', // 替换为你的 API 基础 URL
	timeout: 3000,
	transformRequest: [
		function(data, header) {
		debugger;
			let ret = data;
			if (header["Content-Type"] === "application/x-www-form-urlencoded") {
				ret = qs.stringify(data);
			}

			if (header["Content-Type"] === "application/json") {
				ret = JSON.stringify(data);
			}
			return ret;
		},
	]
});

// 请求拦截器
axiosInstance.interceptors.request.use(
	config => {
		// 在发送请求之前做些什么
		console.log("请求拦截",config);
		return config;
	},
	error => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 响应拦截器
axiosInstance.interceptors.response.use(
	response => {
		// 对响应数据做点什么
		console.log("响应拦截",response);
		return response.data;
	},
	error => {
		// 对响应错误做点什么
		return Promise.reject(error);
	}
);
export default axiosInstance;
