<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { languages } from '../data'
import { findExam } from '../data/exams'

const route = useRoute()
const exam = computed(() => findExam(route.params.examId))
const lang = computed(() => (exam.value ? languages[exam.value.lang] : null))
</script>

<template>
  <!-- 考级页按考试所属语言套主题色（英蓝 / 韩玫红 / 日绿） -->
  <div v-if="exam" :class="`theme-${exam.lang}`">
    <div class="container">
      <nav class="crumbs">
        <router-link to="/">首页</router-link>
        <span class="sep">/</span>
        <span class="cur">考级与证书</span>
        <span class="sep">/</span>
        <span class="cur">{{ exam.short }}</span>
      </nav>

      <!-- 头部横幅：复用语言主页的渐变横幅 -->
      <section class="lang-hero">
        <div class="lang-hero-deco" aria-hidden="true"></div>
        <div class="lang-hero-inner">
          <div class="lang-hero-eyebrow">{{ lang.name }} · 考级与证书</div>
          <h1 class="lang-hero-native">{{ exam.native }}</h1>
          <p class="lang-hero-tagline">{{ exam.tagline }}</p>
          <p class="lang-hero-desc">{{ exam.desc }}</p>
          <div class="exam-hero-facts">
            <div v-for="f in exam.facts" :key="f.label" class="exam-fact">
              <span class="ef-label">{{ f.label }}</span>
              <span class="ef-value">{{ f.value }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 等级划分 -->
      <div class="page-head">
        <h2 class="page-title">{{ exam.levelsTitle }}</h2>
        <p class="page-sub">{{ exam.levelsIntro }}</p>
      </div>
      <div class="exam-level-grid">
        <div v-for="lv in exam.levels" :key="lv.name" class="exam-level-card card">
          <div class="elc-head">
            <span class="elc-name">{{ lv.name }}</span>
            <span class="elc-sub">{{ lv.sub }}</span>
          </div>
          <div class="elc-desc">{{ lv.desc }}</div>
        </div>
      </div>
      <p class="exam-note">{{ exam.levelsNote }}</p>

      <!-- 考试内容 -->
      <div class="page-head">
        <h2 class="page-title">{{ exam.sectionsTitle }}</h2>
      </div>
      <div class="exam-section-grid">
        <div v-for="s in exam.sections" :key="s.name" class="exam-section-card card">
          <div class="esc-head">
            <span class="esc-name">{{ s.name }}</span>
            <span class="tag">{{ s.meta }}</span>
          </div>
          <div class="esc-desc">{{ s.desc }}</div>
        </div>
      </div>

      <!-- 适合人群 + 备考建议 -->
      <div class="exam-two-col">
        <section>
          <div class="page-head">
            <h2 class="page-title">{{ exam.audienceTitle }}</h2>
          </div>
          <div class="card exam-audience-card">
            <div v-for="a in exam.audience" :key="a" class="audience-item">
              <span class="audience-dot"></span>
              <span>{{ a }}</span>
            </div>
          </div>
        </section>
        <section>
          <div class="page-head">
            <h2 class="page-title">{{ exam.tipsTitle }}</h2>
          </div>
          <div class="card exam-tips-card">
            <div v-for="(t, i) in exam.tips" :key="i" class="tip-item">
              <span class="tip-num">{{ i + 1 }}</span>
              <span class="tip-text">{{ t }}</span>
            </div>
          </div>
        </section>
      </div>

      <!-- 报名指引 -->
      <div class="page-head">
        <h2 class="page-title">报名指引</h2>
        <p class="page-sub">中国大陆通过教育部教育考试院报名，以下为通用信息，费用与场次以官网最新公告为准。</p>
      </div>
      <div class="card signup-card">
        <a :href="exam.signup.url" target="_blank" rel="noopener noreferrer" class="signup-link">
          <span>{{ exam.signup.siteLabel }}</span>
          <span class="signup-arrow">↗</span>
        </a>
        <div class="signup-meta">
          <div class="signup-row"><span class="sr-label">报名网址</span><span class="sr-value">{{ exam.signup.url }}</span></div>
          <div class="signup-row"><span class="sr-label">考试费用</span><span class="sr-value">{{ exam.signup.fee }}</span></div>
          <div class="signup-row"><span class="sr-label">考试场次</span><span class="sr-value">{{ exam.signup.schedule }}</span></div>
        </div>
        <p class="signup-note">{{ exam.signup.note }}</p>
      </div>

      <!-- 底部：衔接本站入门课程 -->
      <div class="exam-back">
        <router-link :to="`/${exam.lang}`" class="exam-back-link">
          <span>先打基础：去{{ lang.name }}入门课程</span>
          <span class="start-arrow">→</span>
        </router-link>
        <router-link to="/" class="exam-back-home">返回首页</router-link>
      </div>
    </div>
  </div>
</template>
