import { createApp } from 'vue'
import App from './App.vue'
import Layui from '@layui/layui-vue'
import '@layui/layui-vue/lib/index.css'
import router from './router'
import VueAxios from "vue-axios";
import {axios} from "@/axios/axiosConfig";
// 1. 引入你需要的组件
import Vant  from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';
createApp(App)
    .use(router)
    .use(Layui)
    .use(Vant)
    .use(VueAxios, axios)
    .mount('#app')
