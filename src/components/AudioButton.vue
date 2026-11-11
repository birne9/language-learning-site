<script setup>
// 浏览器 TTS 读音按钮：零依赖，用系统语音朗读
const props = defineProps({
  text: { type: String, required: true },
  lang: { type: String, default: 'en-US' },
})

function speak() {
  if (!props.text || !('speechSynthesis' in window)) return
  const synth = window.speechSynthesis
  synth.cancel()
  const u = new SpeechSynthesisUtterance(props.text)
  u.lang = props.lang
  u.rate = 0.85
  synth.speak(u)
}
</script>

<template>
  <button class="audio-btn" type="button" :title="`朗读：${text}`" @click="speak">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
    </svg>
  </button>
</template>
