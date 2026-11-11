<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { languages, modules, findLesson } from '../data'
import AudioButton from '../components/AudioButton.vue'

const route = useRoute()
const code = computed(() => route.params.lang)
const lang = computed(() => languages[code.value])
const mod = computed(() => modules.find((m) => m.id === route.params.module))

const found = computed(() => findLesson(code.value, route.params.module, route.params.lessonId))
const lesson = computed(() => found.value.lesson)
const idx = computed(() => found.value.index)
const list = computed(() => found.value.list)
const prev = computed(() => (idx.value > 0 ? list.value[idx.value - 1] : null))
const next = computed(() => (idx.value < list.value.length - 1 ? list.value[idx.value + 1] : null))

// 读音文本：音标卡（/θ/ 形式）读示范词，其余卡片读原文
function speakText(item) {
  return item.main.startsWith('/') ? item.reading : item.main
}
</script>

<template>
  <div class="container" v-if="lesson">
    <div class="crumbs">
      <router-link to="/">首页</router-link><span class="sep">/</span>
      <router-link :to="`/${code}`">{{ lang.name }}</router-link><span class="sep">/</span>
      <router-link :to="`/${code}/${mod.id}`">{{ mod.name }}</router-link><span class="sep">/</span>
      <span class="cur">{{ lesson.title }}</span>
    </div>

    <div class="page-head">
      <h1 class="page-title">{{ lesson.title }}</h1>
      <p class="page-sub">
        <span class="tag">{{ mod.name }}</span>
        {{ lesson.subtitle }} · 约 {{ lesson.minutes }} 分钟
      </p>
    </div>

    <div class="lesson-body">
      <div class="intro-box">
        <p v-for="(p, i) in lesson.intro" :key="i">{{ p }}</p>
      </div>

      <section v-for="(s, si) in lesson.sections" :key="si" class="section">
        <h2 class="section-title">{{ s.title }}</h2>

        <!-- 段落讲解 -->
        <div v-if="s.type === 'text'" class="card text-card">
          <p v-for="(p, i) in s.paragraphs" :key="i">{{ p }}</p>
        </div>

        <!-- 字母 / 音标卡 -->
        <div v-else-if="s.type === 'char'" class="word-grid">
          <div v-for="(item, i) in s.items" :key="i" class="word-card card">
            <div class="word-top">
              <div>
                <div class="word-main">{{ item.main }}</div>
                <div class="word-reading">{{ item.reading }}</div>
              </div>
              <AudioButton :text="speakText(item)" :lang="lang.speechLang" />
            </div>
            <div v-if="item.tip" class="word-meaning">{{ item.tip }}</div>
          </div>
        </div>

        <!-- 词汇卡 -->
        <div v-else-if="s.type === 'word'" class="word-grid">
          <div v-for="(item, i) in s.items" :key="i" class="word-card card">
            <div class="word-top">
              <div>
                <div class="word-main">{{ item.main }}</div>
                <div v-if="item.reading" class="word-reading">{{ item.reading }}</div>
              </div>
              <AudioButton :text="item.main" :lang="lang.speechLang" />
            </div>
            <div class="word-meaning">{{ item.meaning }}</div>
            <div v-if="item.example" class="word-example">
              <b>{{ item.example }}</b><span v-if="item.exampleCn"> · {{ item.exampleCn }}</span>
            </div>
          </div>
        </div>

        <!-- 句型卡 -->
        <div v-else-if="s.type === 'pattern'">
          <div v-for="(item, i) in s.items" :key="i" class="pattern-card card">
            <div class="word-top">
              <div class="pattern-line">{{ item.main }}</div>
              <AudioButton :text="item.example || item.main" :lang="lang.speechLang" />
            </div>
            <div class="pattern-meaning">{{ item.meaning }}</div>
            <div v-if="item.example" class="pattern-example">
              {{ item.example }}<span class="cn"> · {{ item.exampleCn }}</span>
            </div>
            <div v-if="item.note" class="pattern-note">{{ item.note }}</div>
          </div>
        </div>

        <!-- 语法卡 -->
        <div v-else-if="s.type === 'grammar'">
          <div v-for="(item, i) in s.items" :key="i" class="grammar-card card">
            <div class="grammar-title">{{ item.title }}</div>
            <div class="grammar-explanation">{{ item.explanation }}</div>
            <div v-for="(ex, j) in item.examples" :key="j" class="grammar-example">
              {{ ex.text }}<span class="cn"> · {{ ex.cn }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div v-if="prev || next" class="lesson-nav">
      <router-link v-if="prev" :to="`/${code}/${mod.id}/${prev.id}`">
        <span class="dir">上一课</span>{{ prev.title }}
      </router-link>
      <router-link v-else :to="`/${code}/${mod.id}`">
        <span class="dir">返回</span>{{ mod.name }}课程列表
      </router-link>
      <router-link v-if="next" class="next" :to="`/${code}/${mod.id}/${next.id}`">
        <span class="dir">下一课</span>{{ next.title }}
      </router-link>
    </div>
  </div>
</template>
