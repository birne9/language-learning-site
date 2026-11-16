<script setup>
import { languages, modules, lessons } from '../data'
import { examList } from '../data/exams'

const lessonCount = (code) => Object.values(lessons[code]).reduce((sum, list) => sum + list.length, 0)
const totalLessons = Object.keys(languages).reduce((sum, code) => sum + lessonCount(code), 0)
</script>

<template>
  <div class="container">
    <section class="site-hero">
      <div class="site-hero-deco"></div>
      <div class="site-hero-inner">
        <span class="site-hero-eyebrow">英语 · 韩语 · 日语</span>
        <h1 class="site-hero-title">三语学习站</h1>
        <p class="site-hero-sub">
          面向中文母语学习者的英语、韩语、日语入门教程，以发音、词汇、句型、语法四大模块为主，循序渐进入门。
        </p>
        <div class="site-hero-stats">
          <div class="shs-item"><span class="shs-num">3</span><span class="shs-label">门语言</span></div>
          <div class="shs-item"><span class="shs-num">4</span><span class="shs-label">大模块</span></div>
          <div class="shs-item"><span class="shs-num">{{ totalLessons }}</span><span class="shs-label">节课程</span></div>
        </div>
      </div>
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
        <div class="lang-foot">
          <span class="lang-count">{{ lessonCount(code) }} 节课 · 4 大模块</span>
          <span class="lang-go">开始学习 →</span>
        </div>
      </router-link>
    </section>

    <section class="page-head">
      <h2 class="page-title">考级与证书</h2>
      <p class="page-sub">
        学完入门课程后，可以挑战对应语言的权威考试：英语雅思、韩语 TOPIK、日语 JLPT。先了解等级划分、备考路径与报名方式。
      </p>
    </section>

    <section class="lang-grid exam-grid">
      <router-link
        v-for="e in examList"
        :key="e.id"
        :to="`/exams/${e.id}`"
        class="lang-card card"
        :style="{ '--lc': languages[e.lang].color }"
      >
        <div class="lang-native">{{ e.native }}</div>
        <div class="lang-name">{{ e.name }}考级</div>
        <div class="lang-desc">{{ e.tagline }}</div>
        <div class="lang-foot">
          <span class="lang-count">{{ e.levelRange }}</span>
          <span class="lang-go">了解考级 →</span>
        </div>
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
        <span class="ps-icon">{{ m.icon }}</span>
        <span class="ps-name">{{ m.name }}</span>
      </div>
    </div>

    <div class="module-grid">
      <div v-for="(m, i) in modules" :key="m.id" class="module-card card">
        <span class="module-step">第 {{ i + 1 }} 步</span>
        <div class="module-icon">{{ m.icon }}</div>
        <div class="module-name">{{ m.name }}</div>
        <div class="module-desc">{{ m.desc }}</div>
      </div>
    </div>
  </div>
</template>
