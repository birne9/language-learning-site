<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import kanaStrokes from '../data/kanaStrokes'

const props = defineProps({
  cell: { type: Object, required: true },
})

const VIEWBOX_SIZE = 109
const SCALE = 4
const CANVAS_SIZE = VIEWBOX_SIZE * SCALE
const canvas = ref(null)
const activeScript = ref('main')
const drawing = ref(false)
const hasDrawing = ref(false)
const result = ref(null)
const character = computed(() => props.cell[activeScript.value])
const scriptLabel = computed(() => (activeScript.value === 'main' ? '平假名' : '片假名'))
const strokes = computed(() => kanaStrokes[character.value])

let context
let previousPoint = null

onMounted(() => {
  context = canvas.value.getContext('2d', { willReadFrequently: true })
  resetCanvas()
})

watch(character, resetCanvas)

function resetCanvas() {
  drawing.value = false
  hasDrawing.value = false
  result.value = null
  previousPoint = null
  if (!context) return
  context.save()
  context.setTransform(1, 0, 0, 1, 0, 0)
  context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  context.restore()
  context.setTransform(SCALE, 0, 0, SCALE, 0, 0)
  context.lineWidth = 5
  context.lineCap = 'round'
  context.lineJoin = 'round'
}

function pointerPoint(event) {
  const rect = canvas.value.getBoundingClientRect()
  return {
    x: (event.clientX - rect.left) * VIEWBOX_SIZE / rect.width,
    y: (event.clientY - rect.top) * VIEWBOX_SIZE / rect.height,
  }
}

function startStroke(event) {
  if (event.button !== 0) return
  event.preventDefault()
  canvas.value.setPointerCapture(event.pointerId)
  drawing.value = true
  hasDrawing.value = true
  result.value = null
  previousPoint = pointerPoint(event)
  context.strokeStyle = getComputedStyle(canvas.value).color
  context.beginPath()
  context.moveTo(previousPoint.x, previousPoint.y)
  context.lineTo(previousPoint.x + 0.01, previousPoint.y)
  context.stroke()
}

function continueStroke(event) {
  if (!drawing.value) return
  event.preventDefault()
  const point = pointerPoint(event)
  context.beginPath()
  context.moveTo(previousPoint.x, previousPoint.y)
  context.lineTo(point.x, point.y)
  context.stroke()
  previousPoint = point
}

function endStroke(event) {
  if (!drawing.value) return
  drawing.value = false
  previousPoint = null
  if (canvas.value.hasPointerCapture(event.pointerId)) {
    canvas.value.releasePointerCapture(event.pointerId)
  }
}

function createTargetMask(lineWidth) {
  const target = document.createElement('canvas')
  target.width = CANVAS_SIZE
  target.height = CANVAS_SIZE
  const targetContext = target.getContext('2d', { willReadFrequently: true })
  targetContext.setTransform(SCALE, 0, 0, SCALE, 0, 0)
  targetContext.strokeStyle = '#000'
  targetContext.lineWidth = lineWidth
  targetContext.lineCap = 'round'
  targetContext.lineJoin = 'round'
  for (const stroke of strokes.value) {
    targetContext.stroke(new Path2D(stroke.d))
  }
  return targetContext.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE).data
}

function submitScore() {
  if (!hasDrawing.value) return
  const targetCore = createTargetMask(5)
  const targetTolerance = createTargetMask(11)
  const userPixels = context.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE).data
  let coreCount = 0
  let coveredCount = 0
  let drawnCount = 0
  let accurateCount = 0

  for (let index = 3; index < userPixels.length; index += 4) {
    const drawn = userPixels[index] > 24
    if (targetCore[index] > 24) {
      coreCount++
      if (drawn) coveredCount++
    }
    if (drawn) {
      drawnCount++
      if (targetTolerance[index] > 24) accurateCount++
    }
  }

  const coverage = coreCount ? coveredCount / coreCount : 0
  const accuracy = drawnCount ? accurateCount / drawnCount : 0
  const score = Math.round((coverage * 0.7 + accuracy * 0.3) * 100)
  result.value = {
    score,
    coverage: Math.round(coverage * 100),
    accuracy: Math.round(accuracy * 100),
    feedback: score >= 90
      ? '很棒，字形覆盖和笔画位置都很稳定。'
      : score >= 75
        ? '整体不错，再留意没有覆盖到的笔画。'
        : score >= 60
          ? '已经掌握部分字形，建议对照灰色字帖再练一次。'
          : '先慢慢沿灰色字形临摹，注意每一笔的位置和完整度。',
  }
}
</script>

<template>
  <div class="kana-practice card">
    <div class="practice-head">
      <div>
        <h3>字帖临摹练习</h3>
        <p>当前练习：{{ scriptLabel }}「{{ character }}」 · 沿灰色字形书写后提交评分。</p>
      </div>
      <div class="practice-script-switch" aria-label="选择练习字形">
        <button type="button" :aria-pressed="activeScript === 'main'" @click="activeScript = 'main'">平假名 {{ cell.main }}</button>
        <button type="button" :aria-pressed="activeScript === 'sub'" @click="activeScript = 'sub'">片假名 {{ cell.sub }}</button>
      </div>
    </div>

    <div class="practice-layout">
      <div class="practice-drawing">
        <div class="practice-board">
          <svg viewBox="0 0 109 109" aria-hidden="true">
            <path class="practice-guide-lines" d="M54.5 4V105M4 54.5H105" />
            <g class="practice-guide-strokes">
              <path v-for="(stroke, index) in strokes" :key="index" :d="stroke.d" />
            </g>
            <g class="practice-guide-numbers">
              <text v-for="(stroke, index) in strokes" :key="index" :x="stroke.x" :y="stroke.y">{{ index + 1 }}</text>
            </g>
          </svg>
          <canvas
            ref="canvas"
            :width="CANVAS_SIZE"
            :height="CANVAS_SIZE"
            :aria-label="`${character} 临摹区域，使用鼠标、手指或触控笔书写`"
            @pointerdown="startStroke"
            @pointermove="continueStroke"
            @pointerup="endStroke"
            @pointercancel="endStroke"
          ></canvas>
        </div>
        <div class="practice-actions">
          <button type="button" class="practice-clear" :disabled="!hasDrawing" @click="resetCanvas">清空重写</button>
          <button type="button" class="practice-submit" :disabled="!hasDrawing" @click="submitScore">提交评分</button>
        </div>
      </div>

      <div class="practice-result" aria-live="polite">
        <template v-if="result">
          <span class="practice-result-label">本次得分</span>
          <div class="practice-score">{{ result.score }}<small>分</small></div>
          <div class="practice-score-track"><span :style="{ width: `${result.score}%` }"></span></div>
          <dl class="practice-metrics">
            <div><dt>字形覆盖</dt><dd>{{ result.coverage }}%</dd></div>
            <div><dt>位置准确</dt><dd>{{ result.accuracy }}%</dd></div>
          </dl>
          <p class="practice-feedback">{{ result.feedback }}</p>
        </template>
        <template v-else>
          <strong>完成临摹后提交评分</strong>
          <ol>
            <li>选择平假名或片假名。</li>
            <li>沿灰色字形逐笔书写。</li>
            <li>点击「提交评分」查看结果。</li>
          </ol>
          <p>评分由字形覆盖度（70%）和位置准确度（30%）组成。</p>
        </template>
      </div>
    </div>

    <p class="practice-note">评分用于临摹练习，不评价书法风格，也不自动判断笔顺；书写内容仅在本机浏览器中处理，不会上传。</p>
  </div>
</template>

<style scoped>
.kana-practice { margin-top: 14px; padding: 20px; }
.practice-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
.practice-head h3 { margin: 0; color: var(--text); font-size: 17px; }
.practice-head p { margin: 4px 0 0; color: var(--text-2); font-size: 13px; }
.practice-script-switch { display: flex; flex: none; gap: 6px; }
.practice-script-switch button {
  padding: 6px 10px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--card);
  color: var(--text-2);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}
.practice-script-switch button[aria-pressed="true"] { border-color: var(--accent); background: var(--accent-soft); color: var(--accent); font-weight: 700; }
.practice-layout { display: grid; grid-template-columns: minmax(0, 340px) minmax(0, 1fr); gap: 22px; margin-top: 18px; }
.practice-drawing { min-width: 0; }
.practice-board { position: relative; width: 100%; aspect-ratio: 1; overflow: hidden; border: 1px solid var(--border); border-radius: 12px; background: var(--bg-soft); }
.practice-board svg,
.practice-board canvas { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.practice-guide-lines { fill: none; stroke: var(--border); stroke-width: 0.8; stroke-dasharray: 3 3; }
.practice-guide-strokes path { fill: none; stroke: var(--text-3); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; opacity: 0.35; }
.practice-guide-numbers text { fill: var(--text-3); font-size: 8px; opacity: 0.65; }
.practice-board canvas { color: var(--accent); cursor: crosshair; touch-action: none; }
.practice-actions { display: flex; justify-content: flex-end; gap: 9px; margin-top: 12px; }
.practice-actions button { padding: 8px 14px; border-radius: 8px; font: inherit; font-size: 13px; font-weight: 700; cursor: pointer; }
.practice-actions button:disabled { cursor: not-allowed; opacity: 0.45; }
.practice-clear { border: 1px solid var(--border); background: var(--card); color: var(--text-2); }
.practice-clear:not(:disabled):hover { border-color: var(--accent); color: var(--accent); }
.practice-submit { border: 1px solid var(--accent); background: var(--accent); color: #fff; }
.practice-submit:not(:disabled):hover { filter: brightness(1.06); }
.practice-result { display: flex; flex-direction: column; justify-content: center; min-width: 0; min-height: 260px; padding: 24px; border: 1px solid var(--border); border-radius: 12px; background: var(--bg-soft); }
.practice-result > strong { color: var(--text); font-size: 16px; }
.practice-result ol { margin: 16px 0; padding-left: 22px; color: var(--text-2); font-size: 14px; }
.practice-result li + li { margin-top: 7px; }
.practice-result p { margin: 0; color: var(--text-2); font-size: 13px; }
.practice-result-label { color: var(--text-2); font-size: 13px; }
.practice-score { margin-top: 2px; color: var(--accent); font-size: 52px; font-weight: 800; line-height: 1.15; }
.practice-score small { margin-left: 5px; font-size: 15px; font-weight: 600; }
.practice-score-track { height: 8px; margin: 16px 0; overflow: hidden; border-radius: 999px; background: var(--track-bg); }
.practice-score-track span { display: block; height: 100%; border-radius: inherit; background: var(--accent); transition: width 0.3s ease; }
.practice-metrics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin: 0 0 16px; }
.practice-metrics div { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 9px 11px; border-radius: 8px; background: var(--card); font-size: 13px; }
.practice-metrics dt { color: var(--text-2); }
.practice-metrics dd { margin: 0; color: var(--text); font-weight: 700; }
.practice-feedback { line-height: 1.7; }
.practice-note { margin: 16px 0 0; color: var(--text-3); font-size: 12px; }
@media (max-width: 720px) {
  .practice-layout { grid-template-columns: 1fr; gap: 14px; }
  .practice-board { max-width: 340px; margin: 0 auto; }
  .practice-result { min-height: 0; padding: 18px; }
}
@media (max-width: 520px) {
  .kana-practice { padding: 15px; }
  .practice-head { flex-direction: column; gap: 12px; }
  .practice-script-switch { width: 100%; }
  .practice-script-switch button { flex: 1; }
  .practice-actions button { flex: 1; }
  .practice-score { font-size: 44px; }
}
@media (prefers-reduced-motion: reduce) {
  .practice-score-track span { transition: none; }
}
</style>
