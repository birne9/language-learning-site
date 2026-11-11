import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// 等待路由初始解析完成再挂载，避免先渲染首页再跳转的闪烁；
// 加 1 秒兜底超时：个别环境（如无头浏览器经 CDP 导航）初始导航 promise 不回调，兜底保证应用一定能挂载
Promise.race([
  router.isReady(),
  new Promise((resolve) => setTimeout(resolve, 1000)),
]).then(() => {
  createApp(App).use(router).mount('#app')
})
