<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { languages, modules, findLesson } from '../data'
import AudioButton from '../components/AudioButton.vue'

const route = useRoute()
const code = computed(() => route.params.lang)
const lang = computed(() => languages[code.value])
const mod = computed(() => modules.find((m) => m.id === route.params.module))

// public 目录资源统一走 base 前缀（dev 为 /，GitHub Pages 构建为 /language-learning-site/）
const base = import.meta.env.BASE_URL

const found = computed(() => findLesson(code.value, route.params.module, route.params.lessonId))
const lesson = computed(() => found.value.lesson)
const idx = computed(() => found.value.index)
const list = computed(() => found.value.list)
const prev = computed(() => (idx.value > 0 ? list.value[idx.value - 1] : null))
const next = computed(() => (idx.value < list.value.length - 1 ? list.value[idx.value + 1] : null))

// 学习进度：当前课序号 / 总课数，用于顶部进度条
const progressPct = computed(() => {
  const total = list.value.length
  return total ? Math.round(((idx.value + 1) / total) * 100) + '%' : '0%'
})

// 读音文本：音标卡（/θ/ 形式）读示范词，其余卡片读原文
function speakText(item) {
  return item.main.startsWith('/') ? item.reading : item.main
}

// 音图单元格点击发音：优先读 speak，其次读 main（复用浏览器 TTS）
function speakCell(cell, speechLang) {
  if (!cell || !('speechSynthesis' in window)) return
  const text = cell.speak || cell.main
  if (!text) return
  const synth = window.speechSynthesis
  synth.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = speechLang
  u.rate = 0.85
  synth.speak(u)
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

    <section class="lesson-head">
      <div class="lesson-head-deco" aria-hidden="true"></div>
      <div class="lesson-head-inner">
        <div class="lesson-head-top">
          <span class="tag">{{ mod.name }}</span>
          <span class="lesson-meta">约 {{ lesson.minutes }} 分钟 · 第 {{ idx + 1 }}/{{ list.length }} 课</span>
        </div>
        <h1 class="lesson-title-main">{{ lesson.title }}</h1>
        <p class="lesson-subtitle">{{ lesson.subtitle }}</p>
        <div class="lesson-progress">
          <span class="lesson-progress-fill" :style="{ width: progressPct }"></span>
        </div>
      </div>
    </section>

    <div v-if="lesson.image" class="lesson-hero">
      <img :src="base + lesson.image" :alt="lesson.title" loading="lazy" decoding="async" />
    </div>

    <div class="lesson-body">
      <div class="intro-box">
        <p v-for="(p, i) in lesson.intro" :key="i">{{ p }}</p>
      </div>

      <section v-for="(s, si) in lesson.sections" :key="si" class="section">
        <h2 class="section-title"><span class="section-marker">{{ si + 1 }}</span>{{ s.title }}</h2>

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

        <!-- 音图：五十音图 / 字母表 / 音标表（每格可点击发音） -->
        <div v-else-if="s.type === 'chart'" class="chart-wrap card">
          <!-- 矩阵模式：带列头（日语五十音图） -->
          <table v-if="s.cols" class="chart-table">
            <thead>
              <tr>
                <th class="chart-corner">{{ s.corner }}</th>
                <th v-for="c in s.cols" :key="c" class="chart-colhead">{{ c }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, ri) in s.rows" :key="ri">
                <th class="chart-rowhead">{{ row.label }}</th>
                <td v-if="row.single" :colspan="s.cols.length" class="chart-td chart-td-full">
                  <button
                    v-if="row.cells[0]"
                    class="chart-cell"
                    type="button"
                    @click="speakCell(row.cells[0], lang.speechLang)"
                  >
                    <span class="cc-main">{{ row.cells[0].main }}</span>
                    <span v-if="row.cells[0].sub" class="cc-sub">{{ row.cells[0].sub }}</span>
                    <span v-if="row.cells[0].romaji" class="cc-romaji">{{ row.cells[0].romaji }}</span>
                  </button>
                </td>
                <template v-else>
                  <td v-for="(cell, ci) in row.cells" :key="ci" class="chart-td">
                    <button
                      v-if="cell"
                      class="chart-cell"
                      type="button"
                      @click="speakCell(cell, lang.speechLang)"
                    >
                      <span class="cc-main">{{ cell.main }}</span>
                      <span v-if="cell.sub" class="cc-sub">{{ cell.sub }}</span>
                      <span v-if="cell.romaji" class="cc-romaji">{{ cell.romaji }}</span>
                    </button>
                    <span v-else class="chart-blank">—</span>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>

          <!-- 分组模式：无列头（韩语字母表 / 英语音标表） -->
          <div v-else class="chart-groups">
            <div v-for="(row, ri) in s.rows" :key="ri" class="chart-group">
              <div class="chart-group-label">{{ row.label }}</div>
              <div class="chart-group-cells">
                <button
                  v-for="(cell, ci) in row.cells"
                  :key="ci"
                  class="chart-cell chart-cell-inline"
                  type="button"
                  @click="speakCell(cell, lang.speechLang)"
                >
                  <span class="cc-main">{{ cell.main }}</span>
                  <span v-if="cell.romaji" class="cc-romaji">{{ cell.romaji }}</span>
                </button>
              </div>
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
