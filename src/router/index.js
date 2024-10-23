import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ()=> import('@/components/focus2/FocusMain.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: ()=> import('@/components/focus2/FocusMain.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
