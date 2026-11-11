<script setup>
import { languages } from '../data'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const activeLang = computed(() => route.params.lang || '')
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <router-link to="/" class="brand">
        <span class="brand-mark">三</span>
        <span class="brand-text">三语学习站</span>
      </router-link>
      <nav class="header-nav">
        <router-link to="/" class="nav-item" :class="{ active: !route.params.lang }">首页</router-link>
        <router-link
          v-for="(l, code) in languages"
          :key="code"
          :to="`/${code}`"
          class="nav-item"
          :class="{ active: activeLang === code }"
        >
          {{ l.name }}
        </router-link>
      </nav>
    </div>
  </header>
</template>
