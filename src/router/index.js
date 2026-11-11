import { createRouter, createWebHistory } from 'vue-router'
import { languages, modules } from '../data'

// GitHub Pages 没有服务端重写规则：深链接（如 /en/pronunciation）会命中 404.html，
// 404.html 把路径存入 sessionStorage 后跳回首页；这里在路由创建前把路径还原到地址栏
const spaRedirect = sessionStorage.getItem('spa-redirect')
if (spaRedirect) {
  sessionStorage.removeItem('spa-redirect')
  history.replaceState(null, '', import.meta.env.BASE_URL + spaRedirect)
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    {
      path: '/:lang',
      name: 'language',
      component: () => import('../views/LanguageHomeView.vue'),
    },
    {
      path: '/:lang/:module',
      name: 'module',
      component: () => import('../views/ModuleView.vue'),
    },
    {
      path: '/:lang/:module/:lessonId',
      name: 'lesson',
      component: () => import('../views/LessonView.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

// 校验语言与模块参数，非法则回首页
router.beforeEach((to) => {
  if (to.params.lang && !languages[to.params.lang]) return { path: '/' }
  if (to.params.module && !modules.find((m) => m.id === to.params.module)) {
    return { path: `/${to.params.lang}` }
  }
  return true
})

export default router
