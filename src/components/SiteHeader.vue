<script setup>
import { languages } from '../data'
import { useRoute } from 'vue-router'
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'

const route = useRoute()
const activeLang = computed(() => route.params.lang || '')

// 主题：manual=null 跟随系统；'light'/'dark' 手动覆盖并写入 localStorage
const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null
const manual = ref(stored === 'light' || stored === 'dark' ? stored : null)
const systemDark = ref(
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
)
const isDark = computed(() => (manual.value ? manual.value === 'dark' : systemDark.value))

function applyToDOM() {
  const root = document.documentElement
  if (manual.value) root.setAttribute('data-theme', manual.value)
  else root.removeAttribute('data-theme')
}

function toggle() {
  manual.value = isDark.value ? 'light' : 'dark'
  try { localStorage.setItem('theme', manual.value) } catch (e) { /* 忽略隐私模式异常 */ }
  applyToDOM()
}

let mq = null
function onSystemChange(e) { systemDark.value = e.matches }

onMounted(() => {
  applyToDOM()
  if (window.matchMedia) {
    mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', onSystemChange)
  }
})
onBeforeUnmount(() => {
  if (mq) mq.removeEventListener('change', onSystemChange)
})
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <router-link to="/" class="brand">
        <span class="brand-mark">三</span>
        <span class="brand-text">三语学习站</span>
      </router-link>
      <div class="header-right">
        <nav class="header-nav">
          <router-link to="/" class="nav-item" :class="{ active: !route.params.lang }">首页</router-link>
          <router-link
            v-for="(l, code) in languages"
            :key="code"
            :to="`/${code}`"
            class="nav-item"
            :class="{ active: activeLang === code }"
          >
            {{ l.name }}
          </router-link>
        </nav>
        <button
          class="theme-toggle"
          type="button"
          :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
          :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
          @click="toggle"
        >
          <!-- 深色下显示太阳（点击回到浅色） -->
          <svg v-if="isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
          </svg>
          <!-- 浅色下显示月亮（点击切深色） -->
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>
