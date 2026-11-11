<script setup>
import SiteHeader from './components/SiteHeader.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { languages } from './data'

const route = useRoute()
// 根据当前路由的语言给根节点加主题类，切换强调色
const themeClass = computed(() => {
  const lang = route.params.lang
  return lang && languages[lang] ? `theme-${lang}` : 'theme-en'
})
</script>

<template>
  <div :class="themeClass">
    <SiteHeader />
    <main>
      <router-view />
    </main>
    <footer class="site-footer">
      <div class="container">
        三语学习站 · 英语 / 韩语 / 日语入门教程 · 面向中文母语学习者
      </div>
    </footer>
  </div>
</template>
