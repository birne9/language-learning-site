# 三语学习站 · 英语 / 韩语 / 日语

面向中文母语学习者的入门语言学习网站。每门语言 4 节课，覆盖发音入门、基础词汇、常用句型、语法讲解四大模块，共 12 节课。词卡和句型卡支持浏览器 TTS 读音（点击喇叭图标）。

## 技术栈

Vue 3 + Vite 6 + Vue Router 4，纯静态数据（JSON 结构写在 `src/data/` 下），无后端依赖。

## 运行

```bash
nvm use 24        # 或任何 20+ 的 Node
npm install
npm run dev       # http://127.0.0.1:5174
npm run build     # 产出 dist/，可直接静态部署
```

## 目录结构

- `src/data/`：课程内容。`index.js` 是语言/模块元信息，`en.js` / `ko.js` / `ja.js` 是三语课程数据
- `src/views/`：首页、语言首页（/en /ko /ja）、模块页、课程页
- `src/components/`：顶栏、TTS 读音按钮
- `src/router/index.js`：路由与参数校验（非法语言/模块自动回首页）

## 路由（每种语言独立页面）

- `/` 首页
- `/en` `/ko` `/ja` 语言首页
- `/:lang/pronunciation | vocabulary | sentences | grammar` 模块页
- `/:lang/:module/:lessonId` 课程详情页

## 如何扩充内容

课程数据是纯 JS 对象，在 `src/data/en.js`（或 ko/ja）对应模块的数组里加一节课即可，无需改任何组件。每节课的结构：

```js
{
  id: 'en-v2',                 // 唯一 ID
  title: '课程标题',
  subtitle: '副标题',
  minutes: 10,                 // 预计学习时长
  intro: ['中文讲解段落...'],   // 课程导语
  sections: [
    // type: 'text' 段落讲解 | 'char' 字母/音标卡 | 'word' 词汇卡
    //     | 'pattern' 句型卡 | 'grammar' 语法卡
    { type: 'word', title: '小节标题', items: [
      { main: '单词', reading: '读音', meaning: '释义', example: '例句', exampleCn: '例句翻译' }
    ]}
  ]
}
```

## 读音（TTS）

使用浏览器内置 `speechSynthesis`，按语言自动选择语音（en-US / ko-KR / ja-JP），零依赖。macOS/Windows 均自带对应语音；个别系统若缺少某语种语音则静默无声音，不影响使用。
