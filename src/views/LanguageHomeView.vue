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
    <div class="page-head">
      <h1 class="page-title">
        {{ lang.name }} <span class="native" :style="{ color: lang.color }">{{ lang.native }}</span>
      </h1>
      <p class="page-sub">{{ lang.tagline }} · {{ lang.desc }}</p>
    </div>

    <router-link
      v-if="firstLesson"
      :to="`/${code}/pronunciation/${firstLesson.id}`"
      class="start-btn"
    >
      从第一课开始：{{ firstLesson.title }}
    </router-link>

    <div class="module-grid">
      <router-link
        v-for="m in modules"
        :key="m.id"
        :to="`/${code}/${m.id}`"
        class="module-card card"
      >
        <div class="module-icon">{{ m.icon }}</div>
        <div class="module-name">{{ m.name }}</div>
        <div class="module-desc">{{ m.desc }} · {{ moduleLessons(code, m.id).length }} 课</div>
      </router-link>
    </div>
  </div>
</template>
