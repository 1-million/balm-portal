import { createApp } from 'vue'
import App from './App.vue'
import Layui from '@layui/layui-vue'
import '@layui/layui-vue/lib/index.css'
import router from './router'
import VueAxios from "vue-axios";
import {axios} from "@/axios/axiosConfig";
createApp(App)
    .use(router)
    .use(Layui)
    .use(VueAxios, axios)
    .mount('#app')
