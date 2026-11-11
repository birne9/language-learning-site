<script setup>
import { languages, modules } from '../data'
</script>

<template>
  <div class="container">
    <section class="hero">
      <h1>三语学习站</h1>
      <p>
        面向中文母语学习者的英语、韩语、日语入门教程。每门语言 4 节课，覆盖发音、词汇、句型、语法四大模块。
      </p>
    </section>

    <section class="lang-grid">
      <router-link
        v-for="(l, code) in languages"
        :key="code"
        :to="`/${code}`"
        class="lang-card card"
        :style="{ '--lc': l.color }"
      >
        <div class="lang-native">{{ l.native }}</div>
        <div class="lang-name">{{ l.name }}</div>
        <div class="lang-desc">{{ l.desc }}</div>
      </router-link>
    </section>

    <section class="page-head">
      <h2 class="page-title">学习路径</h2>
      <p class="page-sub">
        每门语言都按同样的四步走：先认字母和发音，再积累高频词汇，然后开口说句型，最后理解基础语法。
      </p>
    </section>

    <div class="path-strip">
      <div v-for="(m, i) in modules" :key="m.id" class="path-step">
        <span class="num">{{ i + 1 }}</span>
        <span>{{ m.name }}</span>
      </div>
    </div>

    <div class="module-grid">
      <div v-for="m in modules" :key="m.id" class="module-card card">
        <div class="module-icon">{{ m.icon }}</div>
        <div class="module-name">{{ m.name }}</div>
        <div class="module-desc">{{ m.desc }}</div>
      </div>
    </div>
  </div>
</template>
