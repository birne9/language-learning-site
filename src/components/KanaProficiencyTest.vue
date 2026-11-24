<script setup>
import { computed, onUnmounted, ref } from 'vue'
import AudioButton from './AudioButton.vue'

const props = defineProps({
  items: { type: Array, required: true },
})

const STORAGE_KEY = 'kana-proficiency-history-v1'
const PASS_PERCENT = 90
const OPTION_COUNT = 4
const MAX_HISTORY_COUNT = 30
const RECENT_HISTORY_COUNT = 5
const TEST_MODES = {
  DAILY: 20,
  FULL: 46,
}
const PHASES = {
  START: 'start',
  RUNNING: 'running',
  RESULT: 'result',
}
const QUESTION_TYPES = {
  RECOGNITION: 'recognition',
  LISTENING: 'listening',
}

const phase = ref(PHASES.START)
const questions = ref([])
const currentIndex = ref(0)
const selectedOption = ref(null)
const answers = ref([])
const correctCount = ref(0)
const elapsedSeconds = ref(0)
const testHistory = ref(loadHistory())
let timer = null

const currentQuestion = computed(() => questions.value[currentIndex.value])
const currentAnswer = computed(() => answers.value.at(-1) || null)
const currentKana = computed(() => {
  if (!currentQuestion.value) return ''
  return currentQuestion.value.item[currentQuestion.value.script]
})
const currentScriptLabel = computed(() => {
  return currentQuestion.value?.script === 'main' ? '平假名' : '片假名'
})
const isLastQuestion = computed(() => currentIndex.value === questions.value.length - 1)
const nextButtonLabel = computed(() => isLastQuestion.value ? '查看结果' : '下一题')
const score = computed(() => {
  if (!questions.value.length) return 0
  return Math.round((correctCount.value / questions.value.length) * 100)
})
const isPassing = computed(() => score.value >= PASS_PERCENT)
const passTarget = computed(() => {
  return Math.ceil((questions.value.length * PASS_PERCENT) / 100)
})
const wrongAnswers = computed(() => answers.value.filter((answer) => !answer.correct))
const latestResult = computed(() => testHistory.value[0] || null)
const recentHistory = computed(() => testHistory.value.slice(0, RECENT_HISTORY_COUNT))
const passingStreak = computed(() => calculateStreak(testHistory.value))
const progressPercent = computed(() => {
  if (!questions.value.length) return 0
  const answeredCount = currentIndex.value + (selectedOption.value ? 1 : 0)
  return (answeredCount / questions.value.length) * 100
})
const feedbackText = computed(() => {
  if (!currentAnswer.value) return ''
  return currentAnswer.value.correct
    ? '回答正确'
    : `正确答案：${currentAnswer.value.answer}`
})
const resultMessage = computed(() => {
  if (isPassing.value) {
    return '已达到 90% 达标线，明天再测一次，确认记忆是否稳定。'
  }
  return `达标需要答对 ${passTarget.value} 题，本次答对 ${correctCount.value} 题，建议先复习下面的错题。`
})

function loadHistory() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

function saveHistory() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testHistory.value))
  } catch {
    // 隐私模式或存储空间不足时仍保留本次成绩。
  }
}

function shuffle(items) {
  const shuffled = [...items]
  for (let index = shuffled.length - 1; index > 0; index--) {
    const targetIndex = Math.floor(Math.random() * (index + 1))
    const currentItem = shuffled[index]
    shuffled[index] = shuffled[targetIndex]
    shuffled[targetIndex] = currentItem
  }
  return shuffled
}

function soundKey(item) {
  // 现代日语中 を 与 お 同音，听音题不能同时作为选项。
  return item.romaji === 'wo' ? 'o' : item.romaji
}

function createOptions(item, type) {
  const candidates = props.items.filter((candidate) => {
    if (candidate.main === item.main) return false
    if (type === QUESTION_TYPES.RECOGNITION) return true
    return soundKey(candidate) !== soundKey(item)
  })
  const distractors = shuffle(candidates).slice(0, OPTION_COUNT - 1)
  return shuffle([item, ...distractors])
}

function buildQuestions(questionCount) {
  const selectedItems = shuffle(props.items).slice(0, questionCount)
  const recognitionCount = Math.ceil(questionCount / 2)
  const questionTypes = selectedItems.map((_, index) => {
    return index < recognitionCount
      ? QUESTION_TYPES.RECOGNITION
      : QUESTION_TYPES.LISTENING
  })
  const shuffledTypes = shuffle(questionTypes)

  return selectedItems.map((item, index) => {
    const type = shuffledTypes[index]
    return {
      item,
      type,
      script: index % 2 === 0 ? 'main' : 'sub',
      options: createOptions(item, type),
    }
  })
}

function resetTestState() {
  questions.value = []
  currentIndex.value = 0
  selectedOption.value = null
  answers.value = []
  correctCount.value = 0
  elapsedSeconds.value = 0
}

function startTest(questionCount) {
  stopTimer()
  resetTestState()
  questions.value = buildQuestions(questionCount)
  phase.value = PHASES.RUNNING
  timer = window.setInterval(() => {
    elapsedSeconds.value++
  }, 1000)
}

function stopTimer() {
  if (timer) window.clearInterval(timer)
  timer = null
}

function optionLabel(option) {
  return currentQuestion.value.type === QUESTION_TYPES.RECOGNITION
    ? option.romaji
    : `${option.main}・${option.sub}`
}

function optionStateClass(option) {
  if (!selectedOption.value) return ''
  if (option.main === currentQuestion.value.item.main) return 'is-correct'
  if (option === selectedOption.value) return 'is-wrong'
  return ''
}

function correctAnswerLabel(question) {
  if (question.type === QUESTION_TYPES.RECOGNITION) {
    return question.item.romaji
  }
  return `${question.item.main}・${question.item.sub}（${question.item.romaji}）`
}

function chooseOption(option) {
  if (selectedOption.value) return

  const question = currentQuestion.value
  const isCorrect = option.main === question.item.main
  selectedOption.value = option
  if (isCorrect) correctCount.value++

  answers.value.push({
    question,
    correct: isCorrect,
    chosen: optionLabel(option),
    answer: correctAnswerLabel(question),
  })
}

function nextQuestion() {
  if (!selectedOption.value) return
  if (isLastQuestion.value) {
    finishTest()
    return
  }
  currentIndex.value++
  selectedOption.value = null
}

function finishTest() {
  stopTimer()
  phase.value = PHASES.RESULT

  const now = new Date()
  const record = {
    timestamp: now.getTime(),
    day: dayKey(now),
    total: questions.value.length,
    correct: correctCount.value,
    percent: score.value,
    seconds: elapsedSeconds.value,
    passed: isPassing.value,
  }
  testHistory.value = [record, ...testHistory.value].slice(0, MAX_HISTORY_COUNT)
  saveHistory()
}

function retryCurrentTest() {
  startTest(questions.value.length)
}

function returnToStart() {
  stopTimer()
  resetTestState()
  phase.value = PHASES.START
}

function dayKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function calculateStreak(records) {
  const passingDays = new Set(
    records
      .filter((record) => record.passed)
      .map((record) => record.day),
  )
  const cursor = new Date()
  if (!passingDays.has(dayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1)
  }

  let streak = 0
  while (passingDays.has(dayKey(cursor))) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

function formatDuration(seconds) {
  if (seconds < 60) return `${seconds} 秒`
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes} 分 ${remainingSeconds} 秒`
}

function formatDate(timestamp) {
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp))
}

onUnmounted(stopTimer)
</script>

<template>
  <div class="kana-proficiency card">
    <template v-if="phase === PHASES.START">
      <div class="test-intro">
        <h3>每天随机测一遍</h3>
        <p>看假名选读音、听读音选假名，两种题型随机混合。正确率达到 90% 为达标，建议连续 3 天稳定通过。</p>
      </div>

      <div v-if="latestResult" class="test-summary">
        <div>
          <strong>{{ latestResult.percent }}</strong>
          <span>上次得分</span>
        </div>
        <div>
          <strong>{{ passingStreak }}</strong>
          <span>连续达标天数</span>
        </div>
        <div>
          <strong>{{ testHistory.length }}</strong>
          <span>已保存测试</span>
        </div>
      </div>

      <div class="test-mode-grid">
        <button type="button" class="test-mode" @click="startTest(TEST_MODES.DAILY)">
          <strong>每日复习</strong>
          <span>20 题 · 约 3 分钟</span>
          <small>随机抽查，适合每天快速复习</small>
        </button>
        <button
          type="button"
          class="test-mode test-mode-primary"
          @click="startTest(TEST_MODES.FULL)"
        >
          <strong>完整达标测试</strong>
          <span>46 题 · 约 5 分钟</span>
          <small>覆盖全部 46 个清音，至少答对 42 题</small>
        </button>
      </div>

      <p class="test-note">本测试评估认读与听辨，不评价发音和书写；书写请配合上一课字帖。成绩仅保存在当前浏览器，不会上传。</p>

      <div v-if="testHistory.length" class="test-history">
        <h4>最近成绩</h4>
        <div
          v-for="record in recentHistory"
          :key="record.timestamp"
          class="test-history-row"
        >
          <span>{{ formatDate(record.timestamp) }} · {{ record.total }} 题</span>
          <span>{{ record.correct }}/{{ record.total }} · {{ formatDuration(record.seconds) }}</span>
          <strong :class="record.passed ? 'is-pass' : 'is-fail'">{{ record.percent }} 分</strong>
        </div>
      </div>
    </template>

    <template v-else-if="phase === PHASES.RUNNING && currentQuestion">
      <div class="test-running-head">
        <span>第 {{ currentIndex + 1 }} / {{ questions.length }} 题</span>
        <span>当前答对 {{ correctCount }} 题</span>
      </div>
      <div class="test-progress" aria-hidden="true">
        <span :style="{ width: `${progressPercent}%` }"></span>
      </div>

      <div class="test-question">
        <template v-if="currentQuestion.type === QUESTION_TYPES.RECOGNITION">
          <p>这个假名读什么？</p>
          <div class="test-kana">{{ currentKana }}</div>
          <span>{{ currentScriptLabel }}</span>
        </template>
        <template v-else>
          <p>听读音，选择对应的假名组合</p>
          <div class="test-listening">
            <AudioButton
              :text="currentQuestion.item.main"
              lang="ja-JP"
              label="播放本题读音"
            />
            <span>点击播放，可重复听</span>
          </div>
        </template>
      </div>

      <div class="test-options">
        <button
          v-for="option in currentQuestion.options"
          :key="option.main"
          type="button"
          class="test-option"
          :class="optionStateClass(option)"
          :disabled="!!selectedOption"
          @click="chooseOption(option)"
        >
          {{ optionLabel(option) }}
        </button>
      </div>

      <div v-if="currentAnswer" class="test-feedback" aria-live="polite">
        <strong :class="currentAnswer.correct ? 'is-pass' : 'is-fail'">
          {{ feedbackText }}
        </strong>
        <button type="button" class="test-next" @click="nextQuestion">
          {{ nextButtonLabel }}
        </button>
      </div>
    </template>

    <template v-else>
      <div class="test-result">
        <span class="test-result-label">{{ isPassing ? '本次达标' : '继续复习，再测一次' }}</span>
        <strong class="test-result-score" :class="isPassing ? 'is-pass' : 'is-fail'">
          {{ score }}<small>分</small>
        </strong>
        <p>{{ resultMessage }}</p>
      </div>

      <div class="test-summary test-result-summary">
        <div>
          <strong>{{ correctCount }}/{{ questions.length }}</strong>
          <span>答对题数</span>
        </div>
        <div>
          <strong>{{ wrongAnswers.length }}</strong>
          <span>错题数</span>
        </div>
        <div>
          <strong>{{ formatDuration(elapsedSeconds) }}</strong>
          <span>本次用时</span>
        </div>
      </div>

      <div class="test-wrong">
        <h4>错题回顾</h4>
        <p v-if="!wrongAnswers.length" class="is-pass">全部答对，没有错题。</p>
        <div
          v-for="(answer, index) in wrongAnswers"
          :key="index"
          class="test-wrong-row"
        >
          <span>{{ answer.question.item.main }}・{{ answer.question.item.sub }}</span>
          <span>你的答案：{{ answer.chosen }}</span>
          <strong>正确：{{ answer.answer }}</strong>
        </div>
      </div>

      <div class="test-result-actions">
        <button type="button" class="test-next" @click="retryCurrentTest">再测一次</button>
        <button type="button" class="test-back" @click="returnToStart">返回测试选择</button>
      </div>
      <p class="test-note">成绩已保存在本机。连续达标天数按自然日计算，同一天重复测试不会重复累计。</p>
    </template>
  </div>
</template>

<style scoped>
.kana-proficiency {
  padding: 22px;
}

.test-intro h3 {
  margin: 0;
  color: var(--text);
  font-size: 19px;
}

.test-intro p {
  margin: 7px 0 0;
  color: var(--text-2);
  font-size: 14px;
  line-height: 1.7;
}

.test-summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 18px;
}

.test-summary > div {
  padding: 13px 8px;
  border-radius: 10px;
  background: var(--bg-soft);
  text-align: center;
}

.test-summary strong {
  display: block;
  color: var(--accent);
  font-size: 23px;
  line-height: 1.2;
}

.test-summary span {
  display: block;
  margin-top: 5px;
  color: var(--text-2);
  font-size: 12px;
}

.test-mode-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;
}

.test-mode {
  padding: 18px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg-soft);
  color: var(--text);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.test-mode:hover {
  border-color: var(--accent);
  transform: translateY(-1px);
}

.test-mode-primary {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.test-mode strong,
.test-mode span,
.test-mode small {
  display: block;
}

.test-mode strong {
  color: var(--accent);
  font-size: 17px;
}

.test-mode span {
  margin-top: 6px;
  font-size: 14px;
  font-weight: 700;
}

.test-mode small {
  margin-top: 5px;
  color: var(--text-2);
  font-size: 12px;
  line-height: 1.5;
}

.test-note {
  margin: 14px 0 0;
  color: var(--text-3);
  font-size: 12px;
  line-height: 1.7;
}

.test-history {
  margin-top: 20px;
}

.test-history h4,
.test-wrong h4 {
  margin: 0 0 10px;
  color: var(--text);
  font-size: 15px;
}

.test-history-row {
  display: grid;
  grid-template-columns: 1.3fr 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-top: 1px solid var(--border);
  color: var(--text-2);
  font-size: 13px;
}

.test-history-row strong {
  font-size: 14px;
}

.test-running-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: var(--text-2);
  font-size: 13px;
  font-weight: 700;
}

.test-progress {
  height: 7px;
  margin-top: 10px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--track-bg);
}

.test-progress span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--accent);
  transition: width 0.2s ease;
}

.test-question {
  padding: 28px 16px;
  text-align: center;
}

.test-question p {
  margin: 0 0 12px;
  color: var(--text-2);
  font-size: 14px;
}

.test-kana {
  color: var(--accent);
  font-size: 76px;
  font-weight: 700;
  line-height: 1.2;
}

.test-question > div + span {
  color: var(--text-3);
  font-size: 12px;
}

.test-listening {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 100px;
  color: var(--text-2);
  font-size: 14px;
}

.test-listening :deep(.audio-btn) {
  width: 54px;
  height: 54px;
  background: var(--accent-soft);
}

.test-listening :deep(.audio-btn svg) {
  width: 25px;
  height: 25px;
}

.test-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.test-option {
  min-height: 56px;
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--bg-soft);
  color: var(--text);
  font: inherit;
  font-size: 21px;
  font-weight: 700;
  cursor: pointer;
}

.test-option:not(:disabled):hover {
  border-color: var(--accent);
  color: var(--accent);
}

.test-option:disabled {
  cursor: default;
  opacity: 1;
}

.test-option.is-correct {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: var(--accent);
  box-shadow: inset 0 0 0 1px var(--accent);
}

.test-option.is-wrong {
  border-color: #f87171;
  background: rgba(248, 113, 113, 0.09);
  color: #f87171;
}

.test-feedback {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-top: 16px;
}

.test-feedback strong {
  font-size: 14px;
  line-height: 1.5;
}

.is-pass {
  color: var(--accent);
}

.is-fail {
  color: #f87171;
}

.test-next,
.test-back {
  padding: 10px 18px;
  border-radius: 9px;
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.test-next {
  flex: none;
  border: 1px solid var(--accent);
  background: var(--accent);
  color: #fff;
}

.test-back {
  border: 1px solid var(--border);
  background: var(--card);
  color: var(--text);
}

.test-result {
  padding: 10px 0 0;
  text-align: center;
}

.test-result-label {
  color: var(--text-2);
  font-size: 15px;
  font-weight: 700;
}

.test-result-score {
  display: block;
  margin-top: 6px;
  font-size: 64px;
  line-height: 1.15;
}

.test-result-score small {
  margin-left: 5px;
  font-size: 20px;
}

.test-result p {
  margin: 8px auto 0;
  max-width: 520px;
  color: var(--text-2);
  font-size: 14px;
  line-height: 1.7;
}

.test-result-summary strong {
  font-size: 18px;
}

.test-wrong {
  margin-top: 20px;
}

.test-wrong-row {
  display: grid;
  grid-template-columns: 100px 1fr 1.3fr;
  gap: 12px;
  padding: 11px 0;
  border-top: 1px solid var(--border);
  color: var(--text-2);
  font-size: 13px;
}

.test-wrong-row > span:first-child {
  color: var(--text);
  font-size: 19px;
  font-weight: 700;
}

.test-wrong-row strong {
  color: var(--accent);
}

.test-result-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

@media (max-width: 600px) {
  .kana-proficiency {
    padding: 16px;
  }

  .test-mode-grid {
    grid-template-columns: 1fr;
  }

  .test-summary {
    gap: 7px;
  }

  .test-summary strong {
    font-size: 19px;
  }

  .test-summary span {
    font-size: 11px;
  }

  .test-history-row {
    grid-template-columns: 1fr auto;
    gap: 4px 10px;
  }

  .test-history-row > span:nth-child(2) {
    grid-column: 1;
    grid-row: 2;
  }

  .test-history-row strong {
    grid-column: 2;
    grid-row: 1 / 3;
  }

  .test-question {
    padding: 24px 8px;
  }

  .test-kana {
    font-size: 64px;
  }

  .test-option {
    font-size: 19px;
  }

  .test-feedback {
    align-items: stretch;
    flex-direction: column;
  }

  .test-next {
    width: 100%;
  }

  .test-wrong-row {
    grid-template-columns: 70px 1fr;
    gap: 5px 10px;
  }

  .test-wrong-row strong {
    grid-column: 2;
  }

  .test-result-actions {
    flex-direction: column;
  }

  .test-back {
    width: 100%;
  }
}
</style>
