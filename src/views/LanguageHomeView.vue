<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { languages, modules, moduleLessons } from '../data'

const route = useRoute()
const code = computed(() => route.params.lang)
const lang = computed(() => languages[code.value])
const firstLesson = computed(() => moduleLessons(code.value, 'pronunciation')[0])
</script>

<template>
  <div class="container" v-if="lang">
    <section class="lang-hero">
      <div class="lang-hero-deco" aria-hidden="true"></div>
      <div class="lang-hero-inner">
        <div class="lang-hero-eyebrow">{{ lang.name }}</div>
        <h1 class="lang-hero-native">{{ lang.native }}</h1>
        <p class="lang-hero-tagline">{{ lang.tagline }}</p>
        <p class="lang-hero-desc">{{ lang.desc }}</p>
        <router-link
          v-if="firstLesson"
          :to="`/${code}/pronunciation/${firstLesson.id}`"
          class="start-btn"
        >
          <span class="start-play">▶</span>
          <span>从第一课开始：{{ firstLesson.title }}</span>
          <span class="start-arrow">→</span>
        </router-link>
      </div>
    </section>

    <div class="page-head">
      <h2 class="page-title">学习模块</h2>
      <p class="page-sub">四个模块循序渐进，任选一个开始，或按顺序系统学完 {{ lang.name }}入门。</p>
    </div>

    <div class="module-grid">
      <router-link
        v-for="(m, i) in modules"
        :key="m.id"
        :to="`/${code}/${m.id}`"
        class="module-card card"
      >
        <span class="module-step">第 {{ i + 1 }} 步</span>
        <div class="module-icon">{{ m.icon }}</div>
        <div class="module-name">{{ m.name }}</div>
        <div class="module-desc">{{ m.desc }}</div>
        <div class="module-foot">
          <span class="module-count">{{ moduleLessons(code, m.id).length }} 课</span>
          <span class="module-cta">进入 →</span>
        </div>
      </router-link>
    </div>
  </div>
</template>
