// 日语课程数据（4 个模块各 1 课）
//
// 每节课可选配一段讲解视频（LessonVideo 组件用 iframe 嵌入，零托管成本）：
//   video: { provider: 'bilibili', id: 'BV1xx4y1xxx', page: 1 }   // B 站分 P 可省 page（默认 1）
//   video: { provider: 'youtube',  id: 'dQw4w9WgXcQ' }            // YouTube 视频 ID
// 有 video 时，详情页顶部会显示视频播放器并隐藏 lesson.image 封面。

export default {
  pronunciation: [
    {
      id: 'ja-p1',
      image: 'images/lessons/ja-p1.webp',
      // video: { provider: 'bilibili', id: 'BV请替换成真实BV号' },
      video: { provider: 'bilibili', id: 'BV11s411U7Li', page: 1 },
      title: '五十音图入门：平假名 46 个',
      subtitle: '清音 · 浊音 · 拗音',
      minutes: 15,
      intro: [
        '日语假名分平假名（ひらがな）和片假名（カタカナ），各 46 个。平假名用于一般书写，片假名用于外来语和拟声词。初学者先拿下平假名五十音图。',
        '五十音按“五段十行”排列，先背行（每行一个辅音），再背段。点击喇叭可以听每个假名的标准发音。',
      ],
      sections: [
        {
          type: 'chart',
          title: '五十音图 · 清音（平假名 / 片假名 / 罗马音）',
          corner: '假名',
          cols: ['あ段', 'い段', 'う段', 'え段', 'お段'],
          rows: [
            { label: 'あ行', cells: [
              { main: 'あ', sub: 'ア', romaji: 'a' },
              { main: 'い', sub: 'イ', romaji: 'i' },
              { main: 'う', sub: 'ウ', romaji: 'u' },
              { main: 'え', sub: 'エ', romaji: 'e' },
              { main: 'お', sub: 'オ', romaji: 'o' },
            ]},
            { label: 'か行', cells: [
              { main: 'か', sub: 'カ', romaji: 'ka' },
              { main: 'き', sub: 'キ', romaji: 'ki' },
              { main: 'く', sub: 'ク', romaji: 'ku' },
              { main: 'け', sub: 'ケ', romaji: 'ke' },
              { main: 'こ', sub: 'コ', romaji: 'ko' },
            ]},
            { label: 'さ行', cells: [
              { main: 'さ', sub: 'サ', romaji: 'sa' },
              { main: 'し', sub: 'シ', romaji: 'shi' },
              { main: 'す', sub: 'ス', romaji: 'su' },
              { main: 'せ', sub: 'セ', romaji: 'se' },
              { main: 'そ', sub: 'ソ', romaji: 'so' },
            ]},
            { label: 'た行', cells: [
              { main: 'た', sub: 'タ', romaji: 'ta' },
              { main: 'ち', sub: 'チ', romaji: 'chi' },
              { main: 'つ', sub: 'ツ', romaji: 'tsu' },
              { main: 'て', sub: 'テ', romaji: 'te' },
              { main: 'と', sub: 'ト', romaji: 'to' },
            ]},
            { label: 'な行', cells: [
              { main: 'な', sub: 'ナ', romaji: 'na' },
              { main: 'に', sub: 'ニ', romaji: 'ni' },
              { main: 'ぬ', sub: 'ヌ', romaji: 'nu' },
              { main: 'ね', sub: 'ネ', romaji: 'ne' },
              { main: 'の', sub: 'ノ', romaji: 'no' },
            ]},
            { label: 'は行', cells: [
              { main: 'は', sub: 'ハ', romaji: 'ha' },
              { main: 'ひ', sub: 'ヒ', romaji: 'hi' },
              { main: 'ふ', sub: 'フ', romaji: 'fu' },
              { main: 'へ', sub: 'ヘ', romaji: 'he' },
              { main: 'ほ', sub: 'ホ', romaji: 'ho' },
            ]},
            { label: 'ま行', cells: [
              { main: 'ま', sub: 'マ', romaji: 'ma' },
              { main: 'み', sub: 'ミ', romaji: 'mi' },
              { main: 'む', sub: 'ム', romaji: 'mu' },
              { main: 'め', sub: 'メ', romaji: 'me' },
              { main: 'も', sub: 'モ', romaji: 'mo' },
            ]},
            { label: 'や行', cells: [
              { main: 'や', sub: 'ヤ', romaji: 'ya' },
              null,
              { main: 'ゆ', sub: 'ユ', romaji: 'yu' },
              null,
              { main: 'よ', sub: 'ヨ', romaji: 'yo' },
            ]},
            { label: 'ら行', cells: [
              { main: 'ら', sub: 'ラ', romaji: 'ra' },
              { main: 'り', sub: 'リ', romaji: 'ri' },
              { main: 'る', sub: 'ル', romaji: 'ru' },
              { main: 'れ', sub: 'レ', romaji: 're' },
              { main: 'ろ', sub: 'ロ', romaji: 'ro' },
            ]},
            { label: 'わ行', cells: [
              { main: 'わ', sub: 'ワ', romaji: 'wa' },
              null,
              null,
              null,
              { main: 'を', sub: 'ヲ', romaji: 'wo' },
            ]},
            { label: '拨音', single: true, cells: [
              { main: 'ん', sub: 'ン', romaji: 'n' },
            ]},
          ],
        },
        {
          type: 'char',
          title: 'あ行 · か行 · さ行',
          items: [
            { main: 'あ', reading: 'a', tip: '嘴巴张大，像“啊”' },
            { main: 'い', reading: 'i', tip: '像“衣”' },
            { main: 'う', reading: 'u', tip: '嘴唇不突出，介于“乌”和“衣”之间' },
            { main: 'え', reading: 'e', tip: '像“诶”' },
            { main: 'お', reading: 'o', tip: '像“哦”' },
            { main: 'か', reading: 'ka', tip: '像“咔”' },
            { main: 'き', reading: 'ki', tip: '像“ki”' },
            { main: 'く', reading: 'ku', tip: '像“哭”但嘴唇放松' },
            { main: 'け', reading: 'ke', tip: '像“开”的声母加 e' },
            { main: 'こ', reading: 'ko', tip: '像“抠”' },
            { main: 'さ', reading: 'sa', tip: '像“撒”' },
            { main: 'し', reading: 'shi', tip: '像“西”' },
            { main: 'す', reading: 'su', tip: '像“丝”但嘴唇放松' },
            { main: 'せ', reading: 'se', tip: '像“塞”' },
            { main: 'そ', reading: 'so', tip: '像“搜”' },
          ],
        },
        {
          type: 'char',
          title: 'た行 · な行 · は行',
          items: [
            { main: 'た', reading: 'ta', tip: '像“他”' },
            { main: 'ち', reading: 'chi', tip: '像“七”' },
            { main: 'つ', reading: 'tsu', tip: '像“次”但短促' },
            { main: 'て', reading: 'te', tip: '像“胎”的声母加 e' },
            { main: 'と', reading: 'to', tip: '像“偷”' },
            { main: 'な', reading: 'na', tip: '像“那”' },
            { main: 'に', reading: 'ni', tip: '像“妮”' },
            { main: 'ぬ', reading: 'nu', tip: '像“奴”' },
            { main: 'ね', reading: 'ne', tip: '像“内”的声母加 e' },
            { main: 'の', reading: 'no', tip: '像“喏”' },
            { main: 'は', reading: 'ha', tip: '像“哈”' },
            { main: 'ひ', reading: 'hi', tip: '像“嘿”的声母加 i' },
            { main: 'ふ', reading: 'fu', tip: '双唇轻触吹气，不像“夫”' },
            { main: 'へ', reading: 'he', tip: '像“黑”的声母加 e' },
            { main: 'ほ', reading: 'ho', tip: '像“吼”的声母' },
          ],
        },
        {
          type: 'char',
          title: 'ま行 · や行 · ら行 · わ行',
          items: [
            { main: 'ま', reading: 'ma', tip: '像“妈”' },
            { main: 'み', reading: 'mi', tip: '像“咪”' },
            { main: 'む', reading: 'mu', tip: '像“木”' },
            { main: 'め', reading: 'me', tip: '像“妹”的声母加 e' },
            { main: 'も', reading: 'mo', tip: '像“摸”' },
            { main: 'や', reading: 'ya', tip: '像“呀”' },
            { main: 'ゆ', reading: 'yu', tip: '像“优”' },
            { main: 'よ', reading: 'yo', tip: '像“哟”' },
            { main: 'ら', reading: 'ra', tip: '舌尖轻弹上齿龈，像“拉”' },
            { main: 'り', reading: 'ri', tip: '像“哩”' },
            { main: 'る', reading: 'ru', tip: '像“噜”' },
            { main: 'れ', reading: 're', tip: '像“嘞”' },
            { main: 'ろ', reading: 'ro', tip: '像“咯”' },
            { main: 'わ', reading: 'wa', tip: '像“哇”' },
            { main: 'を', reading: 'o', tip: '只作助词，读 o' },
            { main: 'ん', reading: 'n', tip: '鼻音收尾，像“嗯”' },
          ],
        },
        {
          type: 'text',
          title: '浊音、拗音与学习建议',
          paragraphs: [
            '清音加两点变浊音：か行 → が行（ga gi gu ge go）、さ行 → ざ行（za ji zu ze zo）、た行 → だ行（da ji zu de do）、は行 → ば行（ba bi bu be bo）；加小圆圈变半浊音：ぱ行（pa pi pu pe po）。',
            '拗音是辅音 + や/ゆ/よ 小写组合，如 きゃ kya、しゅ shu、ちょ cho。',
            '学习建议：每天默写一行假名，配合单词记忆（如 あい = 爱）。先平假名后片假名，两周内可以拿下一套五十音。',
          ],
        },
      ],
    },
  ],

  vocabulary: [
    {
      id: 'ja-v1',
      image: 'images/lessons/ja-v1.webp',
      video: { provider: 'bilibili', id: 'BV1jA411A7uM', page: 1 },
      title: '日语数字与问候词汇',
      subtitle: '数字 1-10 · 百千万 · 高频问候',
      minutes: 10,
      intro: [
        '日语数字 4、7、9 各有两个读法，初学者先记住常用读法即可。问候词汇是每天必用的，本课一并拿下。',
      ],
      sections: [
        {
          type: 'word',
          title: '数字 1-10',
          items: [
            { main: 'いち', reading: 'ichi', meaning: '一', example: 'いち、に、さん', exampleCn: '一、二、三' },
            { main: 'に', reading: 'ni', meaning: '二' },
            { main: 'さん', reading: 'san', meaning: '三' },
            { main: 'し / よん', reading: 'shi / yon', meaning: '四', example: 'よん', exampleCn: '四（常用读法）' },
            { main: 'ご', reading: 'go', meaning: '五' },
            { main: 'ろく', reading: 'roku', meaning: '六' },
            { main: 'しち / なな', reading: 'shichi / nana', meaning: '七', example: 'なな', exampleCn: '七（常用读法）' },
            { main: 'はち', reading: 'hachi', meaning: '八' },
            { main: 'きゅう / く', reading: 'kyuu / ku', meaning: '九' },
            { main: 'じゅう', reading: 'juu', meaning: '十' },
          ],
        },
        {
          type: 'word',
          title: '大数',
          items: [
            { main: 'ひゃく', reading: 'hyaku', meaning: '百', example: 'にひゃく', exampleCn: '二百' },
            { main: 'せん', reading: 'sen', meaning: '千', example: 'さんぜん', exampleCn: '三千' },
            { main: 'まん', reading: 'man', meaning: '万', example: 'いちまん', exampleCn: '一万' },
            { main: 'じゅういち', reading: 'juuichi', meaning: '十一', example: 'じゅういち', exampleCn: '十一' },
            { main: 'にじゅう', reading: 'nijuu', meaning: '二十', example: 'にじゅう', exampleCn: '二十' },
          ],
        },
        {
          type: 'word',
          title: '高频问候词汇',
          items: [
            { main: 'おはようございます', reading: 'ohayou gozaimasu', meaning: '早上好', example: 'おはようございます。', exampleCn: '早上好。' },
            { main: 'こんにちは', reading: 'konnichiwa', meaning: '你好（白天）', example: 'こんにちは。', exampleCn: '你好。' },
            { main: 'こんばんは', reading: 'konbanwa', meaning: '晚上好', example: 'こんばんは。', exampleCn: '晚上好。' },
            { main: 'ありがとうございます', reading: 'arigatou gozaimasu', meaning: '谢谢', example: 'ありがとうございます。', exampleCn: '谢谢。' },
            { main: 'すみません', reading: 'sumimasen', meaning: '对不起 / 劳驾', example: 'すみません。', exampleCn: '对不起。' },
            { main: 'さようなら', reading: 'sayounara', meaning: '再见', example: 'さようなら。', exampleCn: '再见。' },
            { main: 'はい', reading: 'hai', meaning: '是', example: 'はい、そうです。', exampleCn: '是的，没错。' },
            { main: 'いいえ', reading: 'iie', meaning: '不', example: 'いいえ。', exampleCn: '不。' },
          ],
        },
        {
          type: 'text',
          title: '记忆提示',
          paragraphs: [
            'こんにちは 和 こんばんは 的 は 写作 ha 但读作 wa，这是历史读音保留，见到直接读 wa 即可。',
            '数字接量词时会发生音变（如 三百 = さんびゃく），入门阶段先记住 1-10 和整十，音变规则后续再学。',
          ],
        },
      ],
    },
  ],

  sentences: [
    {
      id: 'ja-s1',
      image: 'images/lessons/ja-s1.webp',
      video: { provider: 'bilibili', id: 'BV1Dh411J7KS', page: 1 },
      title: '日语自我介绍与问候：9 个高频句型',
      subtitle: 'はじめまして から始める',
      minutes: 8,
      intro: [
        '初次见面用です/ます 礼貌体。本课 9 个句型覆盖见面、自我介绍、询问对方和道别，全部是日本人日常使用的自然表达。',
      ],
      sections: [
        {
          type: 'pattern',
          title: '打招呼',
          items: [
            { main: 'こんにちは。', meaning: '你好。', example: 'こんにちは。', exampleCn: '你好。', note: '白天通用，早晚分别用おはよう/こんばんは。' },
            { main: 'おはようございます。', meaning: '早上好。', example: 'おはようございます。', exampleCn: '早上好。', note: '对熟人可以说おはよう。' },
            { main: 'こんばんは。', meaning: '晚上好。', example: 'こんばんは。', exampleCn: '晚上好。' },
          ],
        },
        {
          type: 'pattern',
          title: '自我介绍',
          items: [
            { main: 'はじめまして。', meaning: '初次见面。', example: 'はじめまして。', exampleCn: '初次见面。', note: '见面第一句固定用语。' },
            { main: 'わたしは ... です。', meaning: '我是……', example: 'わたしは 王明です。', exampleCn: '我是王明。', note: 'は 读作 wa，わたし 是“我”的礼貌通用说法。' },
            { main: '... から 来ました。', meaning: '我来自……', example: '中国から 来ました。', exampleCn: '我来自中国。', note: 'から 表示起点“从”。' },
            { main: 'どうぞ よろしく お願いします。', meaning: '请多关照。', example: 'どうぞ よろしく お願いします。', exampleCn: '请多关照。', note: '自我介绍结尾必说。' },
          ],
        },
        {
          type: 'pattern',
          title: '询问对方与道别',
          items: [
            { main: 'お名前は？', meaning: '你叫什么名字？', example: 'お名前は？', exampleCn: '您贵姓？', note: '名前前加お表示礼貌。' },
            { main: 'お仕事は何ですか？', meaning: '你做什么工作？', example: 'お仕事は何ですか？', exampleCn: '您做什么工作？' },
            { main: 'ありがとうございます。', meaning: '谢谢。', example: 'ありがとうございます。', exampleCn: '谢谢。' },
            { main: 'さようなら。', meaning: '再见。', example: 'さようなら。', exampleCn: '再见。', note: '日常口语更常用またね（对熟人）。' },
          ],
        },
      ],
    },
  ],

  grammar: [
    {
      id: 'ja-g1',
      image: 'images/lessons/ja-g1.webp',
      video: { provider: 'bilibili', id: 'BV1aU4y1o7V4', page: 1 },
      title: 'です/ます 礼貌体与 は 助词',
      subtitle: '日语礼貌表达的起点',
      minutes: 12,
      intro: [
        '日语按说话对象分“礼貌体”和“简体”。对不熟的人、长辈、工作场合都用礼貌体，标志就是句尾的です（名词/形容词句）和ます（动词句）。',
        '本课还讲出现频率最高的助词は：提示主题，相当于“说到……”。',
      ],
      sections: [
        {
          type: 'grammar',
          title: 'です：名词谓语句',
          items: [
            {
              title: '肯定',
              explanation: '名词 + です = “是……”。です 相当于“是”，表示断定。',
              examples: [
                { text: 'わたしは 学生です。', cn: '我是学生。' },
                { text: 'これは 本です。', cn: '这是书。' },
                { text: '今日は 月曜日です。', cn: '今天是星期一。' },
              ],
            },
            {
              title: '否定：ではありません',
              explanation: '名词 + ではありません = “不是……”。口语中常用じゃありません或じゃないです。',
              examples: [
                { text: 'わたしは 先生ではありません。', cn: '我不是老师。' },
                { text: 'これは 私のではありません。', cn: '这不是我的。' },
              ],
            },
            {
              title: '疑问：ですか',
              explanation: 'です 变 か 结尾即疑问，句尾用升调。',
              examples: [
                { text: 'あなたは 学生ですか？', cn: '你是学生吗？' },
                { text: 'これは 何ですか？', cn: '这是什么？' },
              ],
            },
          ],
        },
        {
          type: 'grammar',
          title: 'ます：动词礼貌体',
          items: [
            {
              title: '基本用法',
              explanation: '动词连用形 + ます。入门先记常见动词的ます形：行きます（去）、来ます（来）、食べます（吃）、見ます（看）。',
              examples: [
                { text: '学校へ 行きます。', cn: '我去学校。' },
                { text: 'ご飯を 食べます。', cn: '我吃饭。' },
                { text: 'テレビを 見ます。', cn: '我看电视。' },
              ],
            },
            {
              title: '否定与疑问',
              explanation: 'ます 变ません表否定，变ますか表疑问。',
              examples: [
                { text: 'コーヒーは 飲みません。', cn: '我不喝咖啡。' },
                { text: '何を 食べますか？', cn: '你吃什么？' },
              ],
            },
          ],
        },
        {
          type: 'grammar',
          title: 'は：主题助词',
          items: [
            {
              title: '基本用法',
              explanation: 'は 写作 ha、读作 wa，提示句子主题：“说到……的话”。',
              examples: [
                { text: 'わたしは 中国人です。', cn: '（说到）我，（我是）中国人。' },
                { text: '今日は 暑いです。', cn: '今天（的话），很热。' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
