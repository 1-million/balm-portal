import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'mobile',
    component: ()=> import('@/components/focus/mobile/FocusMain.vue')
  },
  {
    path: '/pc',
    name: 'pc',
    component: ()=> import('@/components/focus/pc/FocusMain.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
