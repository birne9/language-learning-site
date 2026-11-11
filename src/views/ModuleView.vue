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

    <div class="page-head">
      <h1 class="page-title">{{ mod.name }}</h1>
      <p class="page-sub">{{ mod.desc }} · 共 {{ list.length }} 课</p>
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
          <div class="lesson-sub">{{ l.subtitle }} · 约 {{ l.minutes }} 分钟</div>
        </div>
        <span class="lesson-arrow">›</span>
      </router-link>
    </div>
  </div>
</template>
