<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { findNce1Lesson } from '../data/nce1Lessons'
import { nce1VideoSource } from '../data/nce1Videos'
import AudioButton from '../components/AudioButton.vue'
import LessonVideo from '../components/LessonVideo.vue'

const route = useRoute()
const lesson = computed(() => findNce1Lesson(route.params.lessonId))
const previous = computed(() => (lesson.value?.id > 1 ? findNce1Lesson(lesson.value.id - 1) : null))
const next = computed(() => (lesson.value?.id < 144 ? findNce1Lesson(lesson.value.id + 1) : null))
const progressPct = computed(() => `${Math.round(((lesson.value?.id || 0) / 144) * 100)}%`)
</script>

<template>
  <div v-if="lesson" class="container">
    <nav class="crumbs" aria-label="面包屑">
      <router-link to="/">首页</router-link>
      <span class="sep">/</span>
      <router-link to="/nce1">新概念一</router-link>
      <span class="sep">/</span>
      <span class="cur">Lesson {{ lesson.id }}</span>
    </nav>

    <section class="lesson-head">
      <div class="lesson-head-deco" aria-hidden="true"></div>
      <div class="lesson-head-inner">
        <div class="lesson-head-top">
          <span class="tag">Lesson {{ lesson.id }} · {{ lesson.kind }}</span>
          <span class="lesson-meta">约 {{ lesson.minutes }} 分钟 · 第 {{ lesson.id }}/144 课</span>
        </div>
        <h1 class="lesson-title-main">{{ lesson.title }}</h1>
        <p class="lesson-subtitle">{{ lesson.theme }}</p>
        <div class="lesson-progress" :aria-label="`全册学习进度 ${progressPct}`">
          <span class="lesson-progress-fill" :style="{ width: progressPct }"></span>
        </div>
      </div>
    </section>

    <p class="exam-note">原创学习版：课次与知识顺序对应原书，但不包含原书课文；通过原创例句与练习掌握本课内容。</p>

    <section class="nce1-video-section" aria-labelledby="nce1-videos">
      <div class="nce1-video-heading">
        <div>
          <h2 id="nce1-videos">配套视频</h2>
          <p>胶学 × 刘羽 Leo · 按 B 站原课程分 P 匹配</p>
        </div>
        <a :href="nce1VideoSource" target="_blank" rel="noopener noreferrer">打开原合集 ↗</a>
      </div>
      <LessonVideo
        v-for="video in lesson.videos"
        :key="video.page"
        :video="video"
        :title="`${video.title} · 胶学 × 刘羽 Leo`"
      />
    </section>

    <div class="lesson-body">
      <section class="section" aria-labelledby="nce1-objectives">
        <h2 id="nce1-objectives" class="section-title"><span class="section-marker">1</span>学习目标</h2>
        <div class="card nce1-lesson-list">
          <div v-for="(objective, index) in lesson.objectives" :key="objective" class="tip-item">
            <span class="tip-num">{{ index + 1 }}</span>
            <span class="tip-text">{{ objective }}</span>
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="nce1-words">
        <h2 id="nce1-words" class="section-title"><span class="section-marker">2</span>核心词汇</h2>
        <div class="word-grid">
          <div v-for="word in lesson.words" :key="word.word" class="word-card card">
            <div class="word-top">
              <div>
                <div class="word-main">{{ word.word }}</div>
                <div class="word-meaning">{{ word.meaning }}</div>
              </div>
              <AudioButton :text="word.word" lang="en-US" />
            </div>
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="nce1-grammar-focus">
        <h2 id="nce1-grammar-focus" class="section-title"><span class="section-marker">3</span>语法与原创例句</h2>
        <div class="card text-card nce1-grammar-focus">{{ lesson.grammar }}</div>
        <div v-for="example in lesson.examples" :key="example.en" class="pattern-card card">
          <div class="word-top">
            <div class="pattern-line">{{ example.en }}</div>
            <AudioButton :text="example.en" lang="en-US" />
          </div>
          <div class="pattern-meaning">{{ example.cn }}</div>
        </div>
      </section>

      <section class="section" aria-labelledby="nce1-exercises">
        <h2 id="nce1-exercises" class="section-title"><span class="section-marker">4</span>练习任务</h2>
        <div class="card nce1-lesson-list">
          <div v-for="(exercise, index) in lesson.exercises" :key="exercise" class="tip-item">
            <span class="tip-num">{{ index + 1 }}</span>
            <span class="tip-text">{{ exercise }}</span>
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="nce1-review">
        <h2 id="nce1-review" class="section-title"><span class="section-marker">5</span>复习要点</h2>
        <p class="exam-note nce1-review-note"><strong>本课达标：</strong>{{ lesson.review }}</p>
      </section>
    </div>

    <nav class="lesson-nav" aria-label="上下课导航">
      <router-link v-if="previous" :to="`/nce1/${previous.id}`">
        <span class="dir">上一课 · Lesson {{ previous.id }}</span>{{ previous.title }}
      </router-link>
      <router-link v-else to="/nce1">
        <span class="dir">返回</span>144 课学习目录
      </router-link>
      <router-link v-if="next" class="next" :to="`/nce1/${next.id}`">
        <span class="dir">下一课 · Lesson {{ next.id }}</span>{{ next.title }}
      </router-link>
      <router-link v-else class="next" to="/nce1">
        <span class="dir">完成本册</span>返回学习目录
      </router-link>
    </nav>
  </div>
</template>
