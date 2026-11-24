<script setup>
import { computed, ref } from 'vue'
import kanaStrokes from '../data/kanaStrokes'

const props = defineProps({
  cell: { type: Object, required: true },
})

const replayKey = ref(0)
const scripts = computed(() => [
  { label: '平假名', character: props.cell.main, strokes: kanaStrokes[props.cell.main] },
  { label: '片假名', character: props.cell.sub, strokes: kanaStrokes[props.cell.sub] },
])

function strokeStyle(index) {
  return {
    '--stroke-delay': `${index * 0.72}s`,
    '--number-delay': `${index * 0.72 + 0.48}s`,
  }
}
</script>

<template>
  <div class="kana-writing card">
    <div class="kana-writing-head">
      <div>
        <h3>{{ cell.main }}・{{ cell.sub }} 书写方式</h3>
        <p>{{ cell.romaji }} · 从 1 开始按数字顺序书写，点击上方其他假名可切换。</p>
      </div>
      <button type="button" class="kana-replay" @click="replayKey++">重新演示</button>
    </div>

    <div :key="`${cell.main}-${replayKey}`" class="kana-writing-grid">
      <section v-for="script in scripts" :key="script.label" class="kana-script-card">
        <div class="kana-script-head">
          <span>{{ script.label }}</span>
          <strong>{{ script.character }}</strong>
          <span>{{ script.strokes.length }} 画</span>
        </div>
        <svg
          class="kana-stroke-svg"
          viewBox="0 0 109 109"
          role="img"
          :aria-label="`${script.character} 的笔顺，共 ${script.strokes.length} 画`"
        >
          <title>{{ script.character }} 的笔顺，共 {{ script.strokes.length }} 画</title>
          <path class="kana-guide-lines" d="M54.5 4V105M4 54.5H105" aria-hidden="true" />
          <g class="kana-strokes-under" aria-hidden="true">
            <path v-for="(stroke, index) in script.strokes" :key="index" :d="stroke.d" />
          </g>
          <g class="kana-strokes-draw" aria-hidden="true">
            <path
              v-for="(stroke, index) in script.strokes"
              :key="index"
              :d="stroke.d"
              pathLength="1"
              :style="strokeStyle(index)"
            />
          </g>
          <g class="kana-stroke-numbers" aria-hidden="true">
            <text
              v-for="(stroke, index) in script.strokes"
              :key="index"
              :x="stroke.x"
              :y="stroke.y"
              :style="strokeStyle(index)"
            >{{ index + 1 }}</text>
          </g>
        </svg>
      </section>
    </div>

    <p class="kana-writing-tip">动画展示运笔顺序；练习时同时注意笔画方向、收笔和字形在方格中的比例。</p>
    <p class="kana-writing-source">
      笔顺数据：<a href="https://kanjivg.tagaini.net" target="_blank" rel="noopener noreferrer">KanjiVG</a>
      · <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 3.0</a>
    </p>
  </div>
</template>

<style scoped>
.kana-writing { margin-top: 14px; padding: 20px; }
.kana-writing-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
.kana-writing-head h3 { margin: 0; color: var(--text); font-size: 17px; }
.kana-writing-head p { margin: 4px 0 0; color: var(--text-2); font-size: 13px; }
.kana-replay {
  flex: none;
  padding: 7px 13px;
  border: 1px solid var(--accent);
  border-radius: 8px;
  background: var(--card);
  color: var(--accent);
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
.kana-replay:hover { background: var(--accent-soft); }
.kana-writing-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-top: 16px; }
.kana-script-card { min-width: 0; padding: 12px; border: 1px solid var(--border); border-radius: 12px; background: var(--bg-soft); }
.kana-script-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; color: var(--text-2); font-size: 12px; }
.kana-script-head strong { color: var(--accent); font-size: 22px; line-height: 1; }
.kana-stroke-svg { display: block; width: 100%; max-width: 230px; height: auto; margin: 10px auto 0; border: 1px solid var(--border); border-radius: 8px; background: var(--card); }
.kana-guide-lines { fill: none; stroke: var(--border); stroke-width: 0.7; stroke-dasharray: 3 3; }
.kana-strokes-under path,
.kana-strokes-draw path { fill: none; stroke-linecap: round; stroke-linejoin: round; }
.kana-strokes-under path { stroke: var(--border); stroke-width: 4.5; }
.kana-strokes-draw path {
  stroke: var(--accent);
  stroke-width: 4;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: kana-draw 0.64s ease-in-out var(--stroke-delay) forwards;
}
.kana-stroke-numbers text { fill: var(--accent); font-size: 8px; font-weight: 700; opacity: 0; animation: kana-number 0.01s linear var(--number-delay) forwards; }
.kana-writing-tip { margin: 14px 0 0; color: var(--text-2); font-size: 13px; }
.kana-writing-source { margin: 6px 0 0; color: var(--text-3); font-size: 11px; }
.kana-writing-source a { text-decoration: underline; text-underline-offset: 2px; }
.kana-writing-source a:hover { color: var(--accent); }
@keyframes kana-draw { to { stroke-dashoffset: 0; } }
@keyframes kana-number { to { opacity: 1; } }
@media (max-width: 520px) {
  .kana-writing { padding: 15px; }
  .kana-writing-head { align-items: stretch; flex-direction: column; gap: 10px; }
  .kana-replay { align-self: flex-start; }
  .kana-writing-grid { gap: 9px; margin-top: 12px; }
  .kana-script-card { padding: 8px; }
  .kana-script-head { gap: 4px; font-size: 11px; }
  .kana-script-head strong { font-size: 19px; }
}
@media (prefers-reduced-motion: reduce) {
  .kana-strokes-draw path { animation: none; stroke-dashoffset: 0; }
  .kana-stroke-numbers text { animation: none; opacity: 1; }
}
</style>
