<script setup>
import { computed, ref } from 'vue'
import { nce1Units } from '../data/nce1Lessons'

const selectedStage = ref(1)
const filteredUnits = computed(() => nce1Units.filter((unit) => unit.stage === selectedStage.value))

const stages = [
  {
    range: 'Lesson 1–30',
    title: '搭建句子骨架',
    focus: 'be 动词、代词、冠词、名词单复数、疑问句、There be、祈使句',
    topics: '人物身份、日常物品、家庭与房屋',
    output: '介绍人物，询问物品归属，描述人和物的位置。',
  },
  {
    range: 'Lesson 31–60',
    title: '表达现在与日常生活',
    focus: '现在进行时、be going to、一般现在时、can、可数与不可数名词、some / any',
    topics: '天气、日常作息、饮食与购物',
    output: '描述正在发生的事、日常习惯、天气和饮食需求。',
  },
  {
    range: 'Lesson 61–80',
    title: '开始叙述过去',
    focus: 'must、时间日期、be 动词过去式、一般过去时、规则与不规则动词、副词',
    topics: '健康、周末、预约与日常采购',
    output: '谈论身体状况、预约安排以及过去发生的事情。',
  },
  {
    range: 'Lesson 81–100',
    title: '表达经历与计划',
    focus: '现在完成时、just / already / yet、ever / never、for / since、will、物主代词',
    topics: '旅行、度假、事故、搬家与行李',
    output: '谈论去过哪里、做过什么，以及接下来的计划。',
  },
  {
    range: 'Lesson 101–120',
    title: '扩展句子与叙事',
    focus: '初步转述、动词不定式、too / enough、比较级和最高级、不定代词、过去进行时、过去完成时',
    topics: '书信、考试、购物、金钱与故事',
    output: '比较事物、转述别人的话，按时间顺序讲简短故事。',
  },
  {
    range: 'Lesson 121–144',
    title: '建立复合句意识',
    focus: '定语从句、情态动词推测、间接引语、if 条件句、时间状语从句、被动语态',
    topics: '旅行、名人、交通、新闻与环境',
    output: '使用较复杂的句子描述人物、消息、条件和事件。',
  },
]

const vocabularyTopics = [
  { title: '人物与身份', items: ['称呼与家庭', '国籍与职业', '外貌与状态'] },
  { title: '日常物品与服饰', items: ['随身物品', '服装与颜色', '归属与选择'] },
  { title: '房屋与位置', items: ['房间与家具', '方位介词', '村庄与建筑'] },
  { title: '时间与天气', items: ['时刻与日期', '星期月份季节', '天气与气候'] },
  { title: '饮食与购物', items: ['食物与饮料', '数量与价格', '购物与付款'] },
  { title: '健康与就医', items: ['身体与疾病', '预约与就诊', '建议与禁忌'] },
  { title: '交通与旅行', items: ['交通工具', '车票与行李', '问路与度假'] },
  { title: '工作与社会生活', items: ['工作与学校', '书信与电话', '考试与新闻'] },
  { title: '描述与功能词', items: ['形容词与副词', '数量词', '介词与固定搭配'] },
]

const grammarSystems = [
  {
    title: '句子结构',
    items: ['主语＋be＋表语', '主语＋实义动词＋其他', '陈述句、疑问句与否定句', 'There be 与祈使句'],
  },
  {
    title: '名词、代词与限定词',
    items: ['可数与不可数、名词单复数', '人称、物主、指示与不定代词', 'a / an / the 的基础使用', 'some、any、much、many 等数量表达'],
  },
  {
    title: '动词与时态',
    items: ['一般现在时与现在进行时', '一般过去时与一般将来时', '现在完成时', '过去进行时、过去完成时及初步过去将来时'],
  },
  {
    title: '情态动词',
    items: ['can：能力与可能性', 'must / have to：必须', "needn't / don't need to：不必", "may / might / must / can't：推测"],
  },
  {
    title: '修饰与比较',
    items: ['形容词描述人或物', '副词修饰动作', '比较级、最高级与 as...as', 'too、enough 与程度表达'],
  },
  {
    title: '从句、转述与语态',
    items: ['宾语从句与间接引语', 'who / which / that 引导的定语从句', 'if 条件句与基础时间状语从句', 'be＋过去分词构成被动语态'],
  },
]

const tenses = [
  { name: '一般现在时', use: '习惯、规律与事实', signal: 'every day · usually' },
  { name: '现在进行时', use: '现在正在发生的事情', signal: 'now · at the moment' },
  { name: 'be going to', use: '打算或准备做某事', signal: 'tomorrow · next week' },
  { name: '一般将来时 will', use: '未来、预测与临时决定', signal: 'tomorrow · soon' },
  { name: '一般过去时', use: '过去发生并结束的事情', signal: 'yesterday · ago · last week' },
  { name: '现在完成时', use: '经历、已完成及对现在的影响', signal: 'just · already · yet · ever' },
  { name: '过去进行时', use: '过去某个时刻正在发生', signal: 'while · at that time' },
  { name: '过去完成时', use: '发生在另一个过去动作之前', signal: 'before · after · when' },
]

const functions = [
  '问候与介绍', '询问国籍和职业', '询问物品归属', '请求帮助与重复',
  '描述人物和位置', '谈论天气和作息', '购物、询价与选择', '表达喜欢和需要',
  '就医与描述症状', '预约和询问时间', '谈论计划与经历', '转述消息与表达推测',
]

const skills = [
  { name: '听力', path: '听懂大意 → 抓关键句 → 短句听写 → 听懂小故事' },
  { name: '口语', path: '跟读 → 替换造句 → 回答问题 → 脱离课文复述' },
  { name: '阅读', path: '找人物和事件 → 理解顺序 → 根据上下文猜词' },
  { name: '写作', path: '写正确单句 → 连接句子 → 写简短连贯段落' },
]

const sounds = ['音标与口型', '字母及常见组合', '音节与单词重音', '句子重音', '连读与弱读', '基本语调']

const mastery = [
  '能根据时间选择基本时态，并保持动词形式正确。',
  '能正确使用常见代词、介词、单复数和数量词。',
  '能独立进行常见疑问句与否定句转换。',
  '能介绍自己、描述日常生活并谈论一次过去经历。',
  '能听懂慢速、清晰的日常对话并抓住主要信息。',
  '能脱离原文复述短课文，写出简短连贯的句群。',
]
</script>

<template>
  <div class="container">
    <nav class="crumbs" aria-label="面包屑">
      <router-link to="/">首页</router-link>
      <span class="sep">/</span>
      <span class="cur">新概念一</span>
    </nav>

    <section class="lang-hero">
      <div class="lang-hero-deco" aria-hidden="true"></div>
      <div class="lang-hero-inner">
        <div class="lang-hero-eyebrow">NEW CONCEPT ENGLISH 1</div>
        <h1 class="lang-hero-native">新概念英语第一册</h1>
        <p class="lang-hero-tagline">全册知识框架</p>
        <p class="lang-hero-desc">
          从句子骨架到复合句，先了解 144 课在学什么，再逐课掌握词汇、语法、发音与表达。
        </p>
        <div class="nce1-hero-facts">
          <div class="exam-fact"><span class="ef-label">全册</span><span class="ef-value">144 课</span></div>
          <div class="exam-fact"><span class="ef-label">课文＋操练</span><span class="ef-value">72 组</span></div>
          <div class="exam-fact"><span class="ef-label">整体路线</span><span class="ef-value">6 个阶段</span></div>
          <div class="exam-fact"><span class="ef-label">综合能力</span><span class="ef-value">听说读写</span></div>
        </div>
      </div>
    </section>

    <section aria-labelledby="nce1-directory">
      <div class="page-head">
        <h2 id="nce1-directory" class="page-title">144 课学习目录</h2>
        <p class="page-sub">每两课为一组：奇数课进行场景输入，偶数课进行句型操练。选择阶段后逐课学习。</p>
      </div>
      <div class="nce1-directory-tabs" role="group" aria-label="按学习阶段筛选课程">
        <button
          v-for="(stage, index) in stages"
          :key="stage.range"
          type="button"
          :class="{ active: selectedStage === index + 1 }"
          :aria-pressed="selectedStage === index + 1"
          @click="selectedStage = index + 1"
        >
          <span>阶段 {{ index + 1 }}</span>
          <small>{{ stage.range }}</small>
        </button>
      </div>
      <p class="nce1-directory-count">本阶段 {{ filteredUnits.length }} 组 · {{ filteredUnits.length * 2 }} 课</p>
      <div class="nce1-unit-grid">
        <article v-for="unit in filteredUnits" :key="unit.id" class="nce1-unit-card card">
          <div class="nce1-unit-head">
            <span class="tag">Lesson {{ unit.startLesson }}–{{ unit.startLesson + 1 }}</span>
            <span class="nce1-unit-no">{{ String(unit.id).padStart(2, '0') }}</span>
          </div>
          <h3>{{ unit.titles[0] }}</h3>
          <p class="nce1-unit-pair">{{ unit.titles[1] }}</p>
          <p class="nce1-unit-theme">{{ unit.theme }}</p>
          <p class="nce1-unit-grammar">{{ unit.grammar }}</p>
          <div class="nce1-unit-links">
            <router-link :to="`/nce1/${unit.startLesson}`">
              <span>Lesson {{ unit.startLesson }}</span>场景输入 →
            </router-link>
            <router-link :to="`/nce1/${unit.startLesson + 1}`">
              <span>Lesson {{ unit.startLesson + 1 }}</span>句型操练 →
            </router-link>
          </div>
        </article>
      </div>
    </section>

    <section aria-labelledby="nce1-stages">
      <div class="page-head">
        <h2 id="nce1-stages" class="page-title">六个学习阶段</h2>
        <p class="page-sub">阶段划分用于整体学习与复习，并非教材官方单元；核心是按顺序建立句子、时态和叙事能力。</p>
      </div>
      <div class="nce1-stage-grid">
        <article v-for="(stage, index) in stages" :key="stage.range" class="nce1-stage-card card">
          <span class="nce1-stage-no">{{ String(index + 1).padStart(2, '0') }}</span>
          <div>
            <span class="tag">{{ stage.range }}</span>
            <h3 class="nce1-stage-title">{{ stage.title }}</h3>
            <p class="nce1-stage-focus">{{ stage.focus }}</p>
            <p class="nce1-stage-topics"><strong>词汇场景</strong>{{ stage.topics }}</p>
            <p class="nce1-stage-output"><strong>阶段输出</strong>{{ stage.output }}</p>
          </div>
        </article>
      </div>
    </section>

    <section aria-labelledby="nce1-vocabulary">
      <div class="page-head">
        <h2 id="nce1-vocabulary" class="page-title">词汇主题地图</h2>
        <p class="page-sub">词汇以日常生活为主，按主题和搭配记忆，比按首字母孤立背诵更容易使用。</p>
      </div>
      <div class="nce1-vocab-rule card">
        <strong>每个词的学习路径</strong>
        <div class="nce1-vocab-flow" aria-label="单词、搭配、句型、口头输出">
          <span>单词</span><b>→</b><span>搭配</span><b>→</b><span>句型</span><b>→</b><span>口头输出</span>
        </div>
        <p>例如：holiday → go on holiday → We are going on holiday next month.</p>
      </div>
      <div class="nce1-topic-grid">
        <article v-for="(topic, index) in vocabularyTopics" :key="topic.title" class="nce1-topic-card card">
          <span class="nce1-topic-num">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ topic.title }}</h3>
          <div class="nce1-topic-items">
            <span v-for="item in topic.items" :key="item">{{ item }}</span>
          </div>
        </article>
      </div>
    </section>

    <section aria-labelledby="nce1-grammar">
      <div class="page-head">
        <h2 id="nce1-grammar" class="page-title">语法体系</h2>
        <p class="page-sub">语法主线是：句子骨架 → 名词与代词 → 时态 → 情态动词 → 比较与修饰 → 从句、转述和语态。</p>
      </div>
      <div class="nce1-grammar-grid">
        <article v-for="system in grammarSystems" :key="system.title" class="nce1-grammar-card card">
          <h3>{{ system.title }}</h3>
          <ul>
            <li v-for="item in system.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>

      <h3 class="nce1-subtitle">时态主线</h3>
      <div class="nce1-tense-wrap card">
        <table class="nce1-tense-table">
          <thead>
            <tr><th>时态或结构</th><th>主要作用</th><th>常见时间提示</th></tr>
          </thead>
          <tbody>
            <tr v-for="tense in tenses" :key="tense.name">
              <td>{{ tense.name }}</td><td>{{ tense.use }}</td><td>{{ tense.signal }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="nce1-table-note">过去将来时主要在间接引语中初步接触，例如转述时 will 变为 would。</p>
    </section>

    <section aria-labelledby="nce1-use">
      <div class="page-head">
        <h2 id="nce1-use" class="page-title">交际功能与能力训练</h2>
        <p class="page-sub">学完一个句型后，要把它放进真实场景中，而不只是完成语法练习。</p>
      </div>
      <div class="nce1-two-col">
        <article class="nce1-use-card card">
          <h3>日常交际功能</h3>
          <div class="nce1-function-cloud">
            <span v-for="item in functions" :key="item">{{ item }}</span>
          </div>
        </article>
        <article class="nce1-use-card card">
          <h3>听说读写进阶</h3>
          <div class="nce1-skill-list">
            <div v-for="skill in skills" :key="skill.name" class="nce1-skill-item">
              <strong>{{ skill.name }}</strong><span>{{ skill.path }}</span>
            </div>
          </div>
        </article>
      </div>
      <article class="nce1-sound-card card">
        <div>
          <h3>发音学习线</h3>
          <p>音标与课文同步学习；跟读时不仅模仿单词，还要注意句子重音、连读和语调。</p>
        </div>
        <div class="nce1-sound-steps">
          <span v-for="(sound, index) in sounds" :key="sound"><b>{{ index + 1 }}</b>{{ sound }}</span>
        </div>
      </article>
    </section>

    <section class="nce1-mastery card" aria-labelledby="nce1-mastery-title">
      <div class="page-head">
        <h2 id="nce1-mastery-title" class="page-title">怎样判断真正掌握</h2>
        <p class="page-sub">不是背完全部课文就算完成，而是能够离开原文理解和表达。</p>
      </div>
      <div class="nce1-mastery-grid">
        <div v-for="item in mastery" :key="item" class="nce1-mastery-item">
          <span aria-hidden="true">✓</span><p>{{ item }}</p>
        </div>
      </div>
      <p class="nce1-ielts-note">
        <strong>与雅思的关系：</strong>第一册主要建立英语基础系统。学完后仍需通过第二册加强阅读、语法和写作，再逐步衔接雅思词汇与听说读写专项训练。
      </p>
    </section>
  </div>
</template>
