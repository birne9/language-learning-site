<script setup>
import { computed } from 'vue'

// 配套讲解视频：B 站 / YouTube 嵌入 iframe，零成本、不受 Pages 体积限制
// 数据格式（写在 lesson 上）：
//   video: { provider: 'bilibili', id: 'BV1xx4y1xxx', page: 1 }
//   video: { provider: 'youtube', id: 'dQw4w9WgXcQ' }
const props = defineProps({
  video: { type: Object, default: null },
  title: { type: String, default: '' },
})

const src = computed(() => {
  const v = props.video
  if (!v || !v.provider || !v.id) return ''
  const id = encodeURIComponent(v.id)
  if (v.provider === 'bilibili') {
    const page = v.page || 1
    return `https://player.bilibili.com/player.html?bvid=${id}&page=${page}&high_quality=1&danmaku=0`
  }
  if (v.provider === 'youtube') {
    return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`
  }
  return ''
})

// iframe 的标题（无障碍 & 屏幕阅读器）
const frameTitle = computed(() => (props.title ? `${props.title} · 讲解视频` : '讲解视频'))
</script>

<template>
  <figure v-if="src" class="lesson-video">
    <div class="lesson-video-frame">
      <iframe
        :src="src"
        :title="frameTitle"
        frameborder="0"
        scrolling="no"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <figcaption v-if="title" class="lesson-video-caption">{{ title }}</figcaption>
  </figure>
</template>
