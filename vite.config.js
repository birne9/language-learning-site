import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base 由环境变量驱动：GitHub Pages 部署到 /language-learning-site/ 子路径时设置 PAGES_BASE
export default defineConfig({
  base: process.env.PAGES_BASE || '/',
  plugins: [vue()],
  server: {
    host: '127.0.0.1',
    port: 5174,
  },
})
