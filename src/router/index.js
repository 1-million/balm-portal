import { createRouter, createWebHashHistory } from 'vue-router'
import AppMain from "@/views/AppMain.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: AppMain
  },
  {
    path: '/test',
    name: 'test',
    component: ()=> import('../components/AppClock.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
