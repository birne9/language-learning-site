<script setup>
const levels = [
  { name: '五十音', detail: '发音入门' },
  { name: 'N5', detail: '初级上册' },
  { name: 'N4', detail: '初级下册' },
  { name: 'N3', detail: '中级衔接' },
  { name: 'N2', detail: '专项冲刺' },
]

const stages = [
  {
    period: '第 1～4 个月',
    level: '入门 → N5',
    title: '五十音与初级上册',
    material: '《新版标准日本语》初级上册 1～24 课＋配套音频',
    description: '前两周集中突破假名和发音，之后平均每周学习 2 课，建立词汇、句型与动词变形基础。',
    tasks: ['假名认读与书写', 'ます・て・ない・た形', '课文跟读与听写', '每课闭卷造句'],
    milestone: '完成初级上册，N5 模拟正确率达到约 80%；不必急着报名 N5。',
  },
  {
    period: '第 5～8 个月',
    level: 'N4',
    title: '初级下册与基础闭环',
    material: '《新版标准日本语》初级下册 25～48 课＋配套练习',
    description: '继续每周 2 课，重点理解长句修饰关系和常用句型，同时保持课文听力与短篇阅读。',
    tasks: ['条件・可能・被动・使役', '授受表达与基础敬语', '短篇计时阅读', '每周混合复习'],
    milestone: '完成初级上下册，N4 模拟正确率稳定在约 70% 以上，再进入 N3。',
  },
  {
    period: '第 9～12 个月',
    level: 'N3',
    title: '中级衔接与首次能力检验',
    material: '《新版标准日本语》中级上册＋一套 N3 词汇、语法专项',
    description: '从单句学习转向段落理解，积累书面表达和接续词，逐步适应正常语速与较长文章。',
    tasks: ['N3 核心词汇语法', '长句结构拆解', '短篇与中篇阅读', '真题分项精听'],
    milestone: '可把第 12 个月附近的 N3 作为可选首证；未报考也用完整模拟题验收。',
  },
  {
    period: '第 13～17 个月',
    level: 'N3 → N2',
    title: 'N2 主体学习',
    material: '《新版标准日本语》中级下册＋N2 词汇、语法专项',
    description: '系统覆盖 N2 核心知识，不急于整套刷题；每个语法都要掌握接续、含义、使用场景和近义辨析。',
    tasks: ['N2 高频词汇语法', '中长文精读', '会话与说明文精听', '建立错题分类'],
    milestone: '完成 N2 主体内容，能读懂一般社会、生活和工作话题文章的主要观点。',
  },
  {
    period: '第 18～21 个月',
    level: 'N2 专项',
    title: '阅读、听力与语言知识强化',
    material: 'N2 分项练习＋历年真题，按题型限时训练',
    description: '依据错题分配时间，弱项多练、强项保温；做完必须复盘，不用刷题数量代替掌握程度。',
    tasks: ['文字词汇语境辨析', '语法排序与文章语法', '中长文与信息检索', '听力五类题型'],
    milestone: '各专项均能按时完成，语言知识、阅读和听力没有明显短板。',
  },
  {
    period: '第 22～24 个月',
    level: 'N2 冲刺',
    title: '整卷模拟与考前查漏',
    material: '近年 N2 真题＋个人错题本',
    description: '每周完成 1 套限时整卷或等量分科模拟，下一周集中修补暴露的问题，考前减少新资料。',
    tasks: ['严格计时模拟', '逐题标注错因', '重做错题与听力原文', '固定答题节奏'],
    milestone: '连续 3 套模拟达到自己设定的安全线且单项过线，再按当次官方安排报考 N2。',
  },
]

const videosByStage = [
  [
    { label: '标日初级第 1～48 课', url: 'https://www.bilibili.com/video/BV1eJ411b7yF/' },
    { label: '圆圆：初级上册语法、课文与单词', url: 'https://www.bilibili.com/list/ml1596480162' },
  ],
  [
    { label: '标日初级第 1～48 课（学习第 25～48 课）', url: 'https://www.bilibili.com/video/BV1eJ411b7yF/' },
  ],
  [
    { label: '出口仁语法合集（选看 N3 部分）', url: 'https://www.bilibili.com/list/ml2613191510' },
  ],
  [
    { label: '标日中级下册精讲－N2（B 站课堂·付费）', url: 'https://m.bilibili.com/cheese/play/ss8288' },
    { label: '出口仁语法合集（选看 N2 部分）', url: 'https://www.bilibili.com/list/ml2613191510' },
  ],
  [
    { label: '出口仁 N2 语法补弱', url: 'https://www.bilibili.com/list/ml2613191510' },
    { label: 'N2 考前冲刺与听力精听', url: 'https://www.bilibili.com/list/3493116195638034' },
  ],
  [
    { label: 'N2 考前冲刺与听力精听', url: 'https://www.bilibili.com/list/3493116195638034' },
  ],
]

const dailyPlans = [
  {
    title: 'N5～N4 打基础',
    tag: '教材为主',
    items: [
      { time: '15 分钟', text: '复习旧词，学习本课核心词汇' },
      { time: '25 分钟', text: '学习课文、语法并完成练习' },
      { time: '15 分钟', text: '听课文音频，跟读或听写' },
      { time: '5 分钟', text: '用本课句型口头造句' },
    ],
  },
  {
    title: 'N3～N2 主体学习',
    tag: '输入并重',
    items: [
      { time: '15 分钟', text: '间隔复习词汇与语法' },
      { time: '20 分钟', text: '中级教材或等级专项学习' },
      { time: '15 分钟', text: '精读文章并拆解长句' },
      { time: '10 分钟', text: '盲听、精听或复述音频' },
    ],
  },
  {
    title: 'N2 专项与冲刺',
    tag: '真题为主',
    items: [
      { time: '20 分钟', text: '限时完成一个专项题组' },
      { time: '20 分钟', text: '核对答案并分析错因' },
      { time: '15 分钟', text: '听力精听或阅读精读' },
      { time: '5 分钟', text: '登记下次复习任务' },
    ],
  },
]

const materials = [
  { title: '初级上册', range: '第 1～4 个月', text: '五十音、基础句型、动词变形和日常表达。' },
  { title: '初级下册', range: '第 5～8 个月', text: '完成 N4 核心语法，开始短篇阅读与混合复习。' },
  { title: '中级上下册', range: '第 9～17 个月', text: '衔接 N3、N2，提升长句、段落和正常语速听力。' },
  { title: 'N2 专项与真题', range: '第 13～24 个月', text: '与中级教材并行进入专项，最后 3 个月以整卷和错题为主。' },
]

const skills = [
  {
    title: '文字・词汇',
    items: ['结合句子和搭配记忆，不只背中文释义', '重点整理汉字读音、副词、复合词和近义词', '按“错词 → 例句 → 间隔复习”循环巩固'],
  },
  {
    title: '语法',
    items: ['同时掌握接续、含义、语气和使用场景', '将近义句型放在一起比较，不只孤立背诵', '专项练习句子排序与文章语法，训练上下文判断'],
  },
  {
    title: '阅读',
    items: ['先拆主语、谓语、修饰关系和接续词', '短文在准确基础上提速，中长文追踪观点变化', '错题注明是词汇、指代、定位还是主旨误判'],
  },
  {
    title: '听力',
    items: ['按盲听做题、核对答案、原文精听、再次盲听训练', '记录转折、原因、请求和说话人的最终决定', '从教材音频逐步过渡到真题和正常语速材料'],
  },
]

const checkpoints = [
  '每周学习 6 天，第 7 天用于词汇抽查、语法回忆、错题重做和听力复听。',
  '连续两周未完成任务，或阶段验收明显不达标，就延长当前阶段，不带着漏洞赶下一级。',
  'N5、N4 不必逐级报名；N3 可作为阶段性首证，最终目标仍是 N2。',
  '从 2026 年 11 月附近起步，可把 2028 年 12 月 N2 作为紧凑参考节点；进度不足则顺延到 2029 年 7 月。',
  '模拟分数只用于学习诊断，正式考试日期、报名时间和合格规则以当次官方公告为准。',
]
</script>

<template>
  <div class="theme-ja">
    <div class="container">
      <nav class="crumbs" aria-label="面包屑">
        <router-link to="/">首页</router-link>
        <span class="sep">/</span>
        <span class="cur">日语 N2 路线</span>
      </nav>

      <section class="lang-hero">
        <div class="lang-hero-deco" aria-hidden="true"></div>
        <div class="lang-hero-inner">
          <div class="lang-hero-eyebrow">JLPT N2 ROADMAP</div>
          <h1 class="lang-hero-native">日语 N2 路线</h1>
          <p class="lang-hero-tagline">从零基础到中高级，每天 1 小时</p>
          <p class="lang-hero-desc">
            以《新版标准日本语》为主线，先完成 N5、N4 基础，再通过 N3 衔接 N2 主体学习、专项训练和真题冲刺。
          </p>
          <div class="exam-hero-facts">
            <div class="exam-fact"><span class="ef-label">参考周期</span><span class="ef-value">24 个月</span></div>
            <div class="exam-fact"><span class="ef-label">每日投入</span><span class="ef-value">1 小时</span></div>
            <div class="exam-fact"><span class="ef-label">路线划分</span><span class="ef-value">6 个阶段</span></div>
            <div class="exam-fact"><span class="ef-label">最终目标</span><span class="ef-value">JLPT N2</span></div>
          </div>
        </div>
      </section>

      <p class="exam-note">
        这是适合稳定自学的紧凑路线，不是通关保证。参考首考节点为 <strong>2028 年 12 月</strong>；如果基础阶段或模拟验收未达标，优先顺延到 2029 年 7 月，而不是压缩复习和听力时间。
      </p>

      <section aria-labelledby="n2-level-path">
        <div class="page-head">
          <h2 id="n2-level-path" class="page-title">完整学习路径</h2>
          <p class="page-sub">N5、N4 用来打牢基础，N3 用来适应中级输入，最后再集中攻克 N2，不建议零基础直接背 N2 资料。</p>
        </div>
        <ol class="n2-level-path" aria-label="五十音到 N2 的学习顺序">
          <li v-for="(level, index) in levels" :key="level.name">
            <span class="n2-level-index">{{ index + 1 }}</span>
            <strong>{{ level.name }}</strong>
            <small>{{ level.detail }}</small>
          </li>
        </ol>
      </section>

      <section aria-labelledby="n2-stages">
        <div class="page-head">
          <h2 id="n2-stages" class="page-title">24 个月阶段计划</h2>
          <p class="page-sub">月份从正式开始学习起计算。每个阶段先验收再前进，实际进度可上下浮动。</p>
        </div>
        <ol class="n2-stage-list">
          <li v-for="(stage, index) in stages" :key="stage.period" class="n2-stage">
            <div class="n2-stage-side">
              <span class="n2-stage-number">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="n2-stage-level">{{ stage.level }}</span>
              <strong>{{ stage.period }}</strong>
            </div>
            <article class="n2-stage-card card">
              <h3>{{ stage.title }}</h3>
              <p class="n2-stage-material">{{ stage.material }}</p>
              <p class="n2-stage-description">{{ stage.description }}</p>
              <div class="n2-stage-tasks">
                <span v-for="task in stage.tasks" :key="task">{{ task }}</span>
              </div>
              <div class="n2-stage-videos">
                <strong>配套视频</strong>
                <div class="n2-stage-video-links">
                  <a
                    v-for="video in videosByStage[index]"
                    :key="video.label"
                    :href="video.url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ video.label }}<span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
              <p class="n2-stage-milestone"><strong>阶段验收</strong>{{ stage.milestone }}</p>
            </article>
          </li>
        </ol>
      </section>

      <section aria-labelledby="n2-daily">
        <div class="page-head">
          <h2 id="n2-daily" class="page-title">每天 1 小时怎么分配</h2>
          <p class="page-sub">不同阶段的任务比例会变化，但词汇复习、听力输入和错题复盘始终保留。</p>
        </div>
        <div class="n2-daily-grid">
          <article v-for="plan in dailyPlans" :key="plan.title" class="n2-daily-card card">
            <span class="tag">{{ plan.tag }}</span>
            <h3>{{ plan.title }}</h3>
            <div v-for="item in plan.items" :key="item.time" class="n2-daily-item">
              <strong>{{ item.time }}</strong>
              <span>{{ item.text }}</span>
            </div>
          </article>
        </div>
      </section>

      <section aria-labelledby="n2-materials">
        <div class="page-head">
          <h2 id="n2-materials" class="page-title">教材与练习顺序</h2>
          <p class="page-sub">一套主教材走完体系，再配对应等级的专项和真题，避免同时铺开多套课程。</p>
        </div>
        <div class="n2-material-grid">
          <article v-for="(material, index) in materials" :key="material.title" class="n2-material-card card">
            <span class="n2-material-step">顺序 {{ index + 1 }}</span>
            <h3>{{ material.title }}</h3>
            <strong>{{ material.range }}</strong>
            <p>{{ material.text }}</p>
          </article>
        </div>
      </section>

      <section aria-labelledby="n2-skills">
        <div class="page-head">
          <h2 id="n2-skills" class="page-title">N2 四项专项怎么练</h2>
          <p class="page-sub">N2 没有口语和写作题，但日常跟读、复述和造句仍能帮助巩固语法与听力。</p>
        </div>
        <div class="n2-skill-grid">
          <article v-for="skill in skills" :key="skill.title" class="n2-skill-card card">
            <h3>{{ skill.title }}</h3>
            <ul>
              <li v-for="item in skill.items" :key="item">{{ item }}</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="n2-checkpoint card" aria-labelledby="n2-checkpoints">
        <div class="page-head">
          <h2 id="n2-checkpoints" class="page-title">复盘、验收与报考规则</h2>
          <p class="page-sub">路线以掌握程度为准，日期只是参考；不要因为接近考试就跳过基础补救。</p>
        </div>
        <div class="n2-checkpoint-list">
          <div v-for="(item, index) in checkpoints" :key="item" class="tip-item">
            <span class="tip-num">{{ index + 1 }}</span>
            <span class="tip-text">{{ item }}</span>
          </div>
        </div>
      </section>

      <div class="exam-back">
        <router-link to="/ja" class="exam-back-link">
          <span>现在开始：日语入门课程</span><span class="start-arrow">→</span>
        </router-link>
        <router-link to="/exams/jlpt" class="exam-back-home">查看 JLPT 等级与报名指引</router-link>
      </div>
    </div>
  </div>
</template>
