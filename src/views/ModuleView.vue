<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { languages, modules, moduleLessons } from '../data'

const route = useRoute()
const code = computed(() => route.params.lang)
const lang = computed(() => languages[code.value])
const mod = computed(() => modules.find((m) => m.id === route.params.module))
const list = computed(() => moduleLessons(code.value, route.params.module))
</script>

<template>
  <div class="container" v-if="lang && mod">
    <div class="crumbs">
      <router-link to="/">首页</router-link><span class="sep">/</span>
      <router-link :to="`/${code}`">{{ lang.name }}</router-link><span class="sep">/</span>
      <span class="cur">{{ mod.name }}</span>
    </div>

    <section class="module-hero">
      <div class="module-hero-deco" aria-hidden="true"></div>
      <div class="module-hero-inner">
        <div class="module-hero-icon">{{ mod.icon }}</div>
        <div class="module-hero-text">
          <div class="module-hero-eyebrow">{{ lang.name }} · {{ list.length }} 课</div>
          <h1 class="module-hero-title">{{ mod.name }}</h1>
          <p class="module-hero-desc">{{ mod.desc }}</p>
        </div>
      </div>
    </section>

    <nav class="module-tabs">
      <router-link
        v-for="m in modules"
        :key="m.id"
        :to="`/${code}/${m.id}`"
        class="module-tab"
        :class="{ active: m.id === mod.id }"
      >
        <span class="mt-icon">{{ m.icon }}</span>
        <span class="mt-name">{{ m.name }}</span>
      </router-link>
    </nav>

    <div class="page-head">
      <h2 class="page-title">课程列表</h2>
      <p class="page-sub">共 {{ list.length }} 节课，按顺序学完本模块。</p>
    </div>

    <div class="lesson-list">
      <router-link
        v-for="(l, i) in list"
        :key="l.id"
        :to="`/${code}/${mod.id}/${l.id}`"
        class="lesson-card card"
      >
        <div class="lesson-index">{{ i + 1 }}</div>
        <div class="lesson-main">
          <div class="lesson-title">{{ l.title }}</div>
          <div class="lesson-sub">{{ l.subtitle }}</div>
          <div class="lesson-meta">
            <span class="lesson-duration">约 {{ l.minutes }} 分钟</span>
            <span class="lesson-cta">开始学习 →</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
