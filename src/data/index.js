// 语言与模块的元信息 + 课程数据聚合

export const languages = {
  en: {
    code: 'en',
    name: '英语',
    native: 'English',
    color: '#2563eb',
    speechLang: 'en-US',
    tagline: '从音标到基础时态',
    desc: '国际音标、核心词汇、高频句型与基础时态，4 节课带你入门英语。',
  },
  ko: {
    code: 'ko',
    name: '韩语',
    native: '한국어',
    color: '#e11d48',
    speechLang: 'ko-KR',
    tagline: '从谚文到礼貌用语',
    desc: '韩文字母、两套数字体系、自我介绍句型与体词谓语句，4 节课带你入门韩语。',
  },
  ja: {
    code: 'ja',
    name: '日语',
    native: '日本語',
    color: '#059669',
    speechLang: 'ja-JP',
    tagline: '从五十音到です・ます体',
    desc: '五十音图、数字与问候、自我介绍句型与礼貌体语法，4 节课带你入门日语。',
  },
}

export const modules = [
  { id: 'pronunciation', name: '发音入门', icon: '音', desc: '字母、音标与拼读规则' },
  { id: 'vocabulary', name: '基础词汇', icon: '词', desc: '数字、问候等高频主题词' },
  { id: 'sentences', name: '常用句型', icon: '句', desc: '自我介绍与日常问候' },
  { id: 'grammar', name: '语法讲解', icon: '法', desc: '入门必会的基础语法点' },
]

import en from './en'
import ko from './ko'
import ja from './ja'

export const lessons = { en, ko, ja }

// 取某个语言某个模块下的课程列表
export function moduleLessons(lang, moduleId) {
  return lessons[lang]?.[moduleId] || []
}

// 取具体一节课
export function findLesson(lang, moduleId, lessonId) {
  const list = moduleLessons(lang, moduleId)
  const idx = list.findIndex((l) => l.id === lessonId)
  return { lesson: list[idx], index: idx, list }
}
