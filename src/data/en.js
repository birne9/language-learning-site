// 英语课程数据（4 个模块各 1 课）
// section 类型：text=段落讲解 / char=字母音标卡 / word=词汇卡 / pattern=句型卡 / grammar=语法卡 / chart=音图
//
// 每节课可选配一段讲解视频（LessonVideo 组件用 iframe 嵌入，零托管成本）：
//   video: { provider: 'bilibili', id: 'BV1xx4y1xxx', page: 1 }
//   video: { provider: 'youtube',  id: 'dQw4w9WgXcQ' }
// 有 video 时，详情页顶部会显示视频播放器并隐藏 lesson.image 封面。

export default {
  pronunciation: [
    {
      id: 'en-p1',
      image: 'images/lessons/en-p1.webp',
      // video: { provider: 'bilibili', id: 'BV请替换成真实BV号' },
      title: '英语音标入门：48 个音标一次认识',
      subtitle: '元音 20 个 · 辅音 28 个',
      minutes: 12,
      intro: [
        '音标是英语单词的“拼音”。学会 48 个国际音标（IPA），你就能自己拼读任何一个生词。48 个音标分两大类：元音（20 个，发音时气流不受阻挡）和辅音（28 个，气流在口腔中受阻）。',
        '下面先认识最常用的音标，每个音标配一个示范单词。点击喇叭图标可以听示范单词的标准读音。',
      ],
      sections: [
        {
          type: 'chart',
          title: '辅音音图 · 按发音部位与方法',
          corner: '发音方式',
          cols: ['双唇', '唇齿', '齿', '齿龈', '龈后·硬腭', '软腭', '声门'],
          rows: [
            { label: '塞音 · 清', cells: [
              { main: '/p/', romaji: 'pen', speak: 'pen' },
              null, null,
              { main: '/t/', romaji: 'ten', speak: 'ten' },
              null,
              { main: '/k/', romaji: 'cat', speak: 'cat' },
              null,
            ]},
            { label: '塞音 · 浊', cells: [
              { main: '/b/', romaji: 'bag', speak: 'bag' },
              null, null,
              { main: '/d/', romaji: 'dog', speak: 'dog' },
              null,
              { main: '/ɡ/', romaji: 'go', speak: 'go' },
              null,
            ]},
            { label: '擦音 · 清', cells: [
              null,
              { main: '/f/', romaji: 'five', speak: 'five' },
              { main: '/θ/', romaji: 'think', speak: 'think' },
              { main: '/s/', romaji: 'see', speak: 'see' },
              { main: '/ʃ/', romaji: 'she', speak: 'she' },
              null,
              { main: '/h/', romaji: 'he', speak: 'he' },
            ]},
            { label: '擦音 · 浊', cells: [
              null,
              { main: '/v/', romaji: 'very', speak: 'very' },
              { main: '/ð/', romaji: 'this', speak: 'this' },
              { main: '/z/', romaji: 'zoo', speak: 'zoo' },
              { main: '/ʒ/', romaji: 'vision', speak: 'vision' },
              null, null,
            ]},
            { label: '塞擦音 · 清', cells: [
              null, null, null,
              { main: '/ts/ /tr/', romaji: 'hats · train', speak: 'train' },
              { main: '/tʃ/', romaji: 'chair', speak: 'chair' },
              null, null,
            ]},
            { label: '塞擦音 · 浊', cells: [
              null, null, null,
              { main: '/dz/ /dr/', romaji: 'goods · drive', speak: 'drive' },
              { main: '/dʒ/', romaji: 'jump', speak: 'jump' },
              null, null,
            ]},
            { label: '鼻音', cells: [
              { main: '/m/', romaji: 'man', speak: 'man' },
              null, null,
              { main: '/n/', romaji: 'no', speak: 'no' },
              null,
              { main: '/ŋ/', romaji: 'sing', speak: 'sing' },
              null,
            ]},
            { label: '近音', cells: [
              { main: '/w/', romaji: 'we', speak: 'we' },
              null, null,
              { main: '/r/', romaji: 'red', speak: 'red' },
              { main: '/j/', romaji: 'yes', speak: 'yes' },
              null, null,
            ]},
            { label: '边音', cells: [
              null, null, null,
              { main: '/l/', romaji: 'leg', speak: 'leg' },
              null, null, null,
            ]},
          ],
        },
        {
          type: 'chart',
          title: '单元音音图 · 按舌位前后与高低',
          corner: '舌位高度',
          cols: ['前元音', '中元音', '后元音'],
          rows: [
            { label: '闭元音', cells: [
              { main: '/iː/', romaji: 'see', speak: 'see' },
              null,
              { main: '/uː/', romaji: 'food', speak: 'food' },
            ]},
            { label: '近闭元音', cells: [
              { main: '/ɪ/', romaji: 'sit', speak: 'sit' },
              null,
              { main: '/ʊ/', romaji: 'book', speak: 'book' },
            ]},
            { label: '半高元音', cells: [
              { main: '/e/', romaji: 'bed', speak: 'bed' },
              { main: '/ɜː/', romaji: 'bird', speak: 'bird' },
              { main: '/ɔː/', romaji: 'door', speak: 'door' },
            ]},
            { label: '半低元音', cells: [
              { main: '/æ/', romaji: 'cat', speak: 'cat' },
              { main: '/ʌ/', romaji: 'cup', speak: 'cup' },
              { main: '/ɒ/', romaji: 'hot', speak: 'hot' },
            ]},
            { label: '开元音', cells: [
              null,
              { main: '/ə/', romaji: 'about', speak: 'about' },
              { main: '/ɑː/', romaji: 'car', speak: 'car' },
            ]},
          ],
        },
        {
          type: 'chart',
          title: '双元音音图 · 按起点与终点',
          corner: '起点',
          cols: ['合至 /ɪ/', '合至 /ʊ/', '合至 /ə/'],
          rows: [
            { label: 'e 起', cells: [
              { main: '/eɪ/', romaji: 'day', speak: 'day' },
              null,
              { main: '/eə/', romaji: 'air', speak: 'air' },
            ]},
            { label: 'a 起', cells: [
              { main: '/aɪ/', romaji: 'my', speak: 'my' },
              { main: '/aʊ/', romaji: 'now', speak: 'now' },
              null,
            ]},
            { label: 'ɔ 起', cells: [
              { main: '/ɔɪ/', romaji: 'boy', speak: 'boy' },
              null, null,
            ]},
            { label: 'ə 起', cells: [
              null,
              { main: '/əʊ/', romaji: 'go', speak: 'go' },
              null,
            ]},
            { label: 'ʊ 起', cells: [
              null, null,
              { main: '/ʊə/', romaji: 'tour', speak: 'tour' },
            ]},
            { label: 'ɪ 起', cells: [
              null, null,
              { main: '/ɪə/', romaji: 'here', speak: 'here' },
            ]},
          ],
        },
        {
          type: 'char',
          title: '单元音（12 个）',
          items: [
            { main: '/iː/', reading: 'see', tip: '长音，嘴角向两边咧开' },
            { main: '/ɪ/', reading: 'sit', tip: '短音，轻松短促' },
            { main: '/e/', reading: 'bed', tip: '嘴巴微微张开' },
            { main: '/æ/', reading: 'cat', tip: '嘴巴张大，下巴往下' },
            { main: '/ɑː/', reading: 'car', tip: '长音，嘴巴张最大' },
            { main: '/ʌ/', reading: 'cup', tip: '短促有力' },
            { main: '/ɔː/', reading: 'door', tip: '长音，嘴唇收圆' },
            { main: '/ʊ/', reading: 'book', tip: '短音，嘴唇稍圆' },
            { main: '/uː/', reading: 'food', tip: '长音，嘴唇用力收圆' },
            { main: '/ɜː/', reading: 'bird', tip: '长音，舌头放平' },
            { main: '/ə/', reading: 'about', tip: '弱读元音，最省力' },
            { main: '/ɒ/', reading: 'hot', tip: '英式音，嘴巴张圆' },
          ],
        },
        {
          type: 'char',
          title: '双元音（8 个）',
          items: [
            { main: '/eɪ/', reading: 'name', tip: '从 e 滑向 ɪ' },
            { main: '/aɪ/', reading: 'like', tip: '从 a 滑向 ɪ' },
            { main: '/ɔɪ/', reading: 'boy', tip: '从 ɔ 滑向 ɪ' },
            { main: '/əʊ/', reading: 'go', tip: '从 ə 滑向 ʊ' },
            { main: '/aʊ/', reading: 'now', tip: '从 a 滑向 ʊ' },
            { main: '/ɪə/', reading: 'near', tip: '从 ɪ 滑向 ə' },
            { main: '/eə/', reading: 'hair', tip: '从 e 滑向 ə' },
            { main: '/ʊə/', reading: 'sure', tip: '从 ʊ 滑向 ə' },
          ],
        },
        {
          type: 'char',
          title: '难点辅音（10 个）',
          items: [
            { main: '/θ/', reading: 'think', tip: '舌尖轻触上齿，吹气出声' },
            { main: '/ð/', reading: 'this', tip: '同 /θ/，但声带振动' },
            { main: '/ʃ/', reading: 'she', tip: '像“嘘”的口型' },
            { main: '/ʒ/', reading: 'vision', tip: '/ʃ/ 的浊音版' },
            { main: '/tʃ/', reading: 'chair', tip: '像“吃”但不送气过多' },
            { main: '/dʒ/', reading: 'job', tip: '/tʃ/ 的浊音版' },
            { main: '/ŋ/', reading: 'sing', tip: '鼻音，舌根抵软腭' },
            { main: '/r/', reading: 'red', tip: '舌尖卷起，不碰口腔' },
            { main: '/l/', reading: 'like', tip: '舌尖抵上齿龈' },
            { main: '/h/', reading: 'hot', tip: '轻轻哈气' },
          ],
        },
        {
          type: 'text',
          title: '学习建议',
          paragraphs: [
            '清浊成对记忆：/p/-/b/、/t/-/d/、/k/-/g/、/s/-/z/ 每一对口型完全相同，区别只在声带是否振动。把手放在喉咙上感受一下：发 /b/ 时喉咙会震动，发 /p/ 时不会。',
            '每天挑 5 个音标，跟着示范单词朗读 10 遍，一周内就能过完 48 个音标。遇到生词先查音标、再拼读，比直接记“谐音”更可靠。',
          ],
        },
      ],
    },
  ],

  vocabulary: [
    {
      id: 'en-v1',
      image: 'images/lessons/en-v1.webp',
      title: '数字与时间：最常用的 40 个词',
      subtitle: '基数词 · 序数词 · 时间表达',
      minutes: 10,
      intro: [
        '数字和时间是日常交流的“基础设施”。本课把最常用的基数词、序数词和时间表达整理成卡片，按组记忆效率更高。',
      ],
      sections: [
        {
          type: 'word',
          title: '基数词 1-20',
          items: [
            { main: 'one', reading: '/wʌn/', meaning: '一' },
            { main: 'two', reading: '/tuː/', meaning: '二' },
            { main: 'three', reading: '/θriː/', meaning: '三' },
            { main: 'four', reading: '/fɔːr/', meaning: '四' },
            { main: 'five', reading: '/faɪv/', meaning: '五' },
            { main: 'six', reading: '/sɪks/', meaning: '六' },
            { main: 'seven', reading: '/ˈsevn/', meaning: '七' },
            { main: 'eight', reading: '/eɪt/', meaning: '八' },
            { main: 'nine', reading: '/naɪn/', meaning: '九' },
            { main: 'ten', reading: '/ten/', meaning: '十' },
            { main: 'eleven', reading: '/ɪˈlevn/', meaning: '十一' },
            { main: 'twelve', reading: '/twelv/', meaning: '十二' },
            { main: 'thirteen', reading: '/ˌθɜːrˈtiːn/', meaning: '十三' },
            { main: 'fourteen', reading: '/ˌfɔːrˈtiːn/', meaning: '十四' },
            { main: 'fifteen', reading: '/ˌfɪfˈtiːn/', meaning: '十五' },
            { main: 'sixteen', reading: '/ˌsɪksˈtiːn/', meaning: '十六' },
            { main: 'seventeen', reading: '/ˌsevnˈtiːn/', meaning: '十七' },
            { main: 'eighteen', reading: '/ˌeɪˈtiːn/', meaning: '十八' },
            { main: 'nineteen', reading: '/ˌnaɪnˈtiːn/', meaning: '十九' },
            { main: 'twenty', reading: '/ˈtwenti/', meaning: '二十' },
          ],
        },
        {
          type: 'word',
          title: '大数与序数词',
          items: [
            { main: 'thirty', reading: '/ˈθɜːrti/', meaning: '三十' },
            { main: 'forty', reading: '/ˈfɔːrti/', meaning: '四十' },
            { main: 'fifty', reading: '/ˈfɪfti/', meaning: '五十' },
            { main: 'sixty', reading: '/ˈsɪksti/', meaning: '六十' },
            { main: 'seventy', reading: '/ˈsevnti/', meaning: '七十' },
            { main: 'eighty', reading: '/ˈeɪti/', meaning: '八十' },
            { main: 'ninety', reading: '/ˈnaɪnti/', meaning: '九十' },
            { main: 'hundred', reading: '/ˈhʌndrəd/', meaning: '百', example: 'two hundred', exampleCn: '二百' },
            { main: 'thousand', reading: '/ˈθaʊznd/', meaning: '千', example: 'three thousand', exampleCn: '三千' },
            { main: 'first', reading: '/fɜːrst/', meaning: '第一', example: 'the first day', exampleCn: '第一天' },
            { main: 'second', reading: '/ˈsekənd/', meaning: '第二', example: 'the second floor', exampleCn: '二楼' },
            { main: 'third', reading: '/θɜːrd/', meaning: '第三', example: 'the third time', exampleCn: '第三次' },
          ],
        },
        {
          type: 'word',
          title: '时间表达',
          items: [
            { main: 'morning', reading: '/ˈmɔːrnɪŋ/', meaning: '早上', example: 'Good morning.', exampleCn: '早上好。' },
            { main: 'afternoon', reading: '/ˌæftərˈnuːn/', meaning: '下午', example: 'in the afternoon', exampleCn: '在下午' },
            { main: 'evening', reading: '/ˈiːvnɪŋ/', meaning: '傍晚', example: 'in the evening', exampleCn: '在傍晚' },
            { main: 'night', reading: '/naɪt/', meaning: '夜晚', example: 'at night', exampleCn: '在夜里' },
            { main: 'today', reading: '/təˈdeɪ/', meaning: '今天', example: 'Today is Monday.', exampleCn: '今天是星期一。' },
            { main: 'tomorrow', reading: '/təˈmɑːroʊ/', meaning: '明天', example: 'See you tomorrow.', exampleCn: '明天见。' },
            { main: 'yesterday', reading: '/ˈjestərdeɪ/', meaning: '昨天', example: 'yesterday morning', exampleCn: '昨天早上' },
            { main: 'now', reading: '/naʊ/', meaning: '现在', example: 'right now', exampleCn: '立刻、现在' },
            { main: "o'clock", reading: '/əˈklɑːk/', meaning: '整点', example: "at nine o'clock", exampleCn: '在九点整' },
            { main: 'hour', reading: '/ˈaʊər/', meaning: '小时', example: 'one hour', exampleCn: '一小时' },
            { main: 'minute', reading: '/ˈmɪnɪt/', meaning: '分钟', example: 'five minutes', exampleCn: '五分钟' },
          ],
        },
      ],
    },
  ],

  sentences: [
    {
      id: 'en-s1',
      image: 'images/lessons/en-s1.webp',
      title: '自我介绍与问候：9 个高频句型',
      subtitle: '见面开口的第一套话术',
      minutes: 8,
      intro: [
        '第一次见面怎么开口？本课 9 个句型覆盖打招呼、自我介绍、询问对方和道别四个场景，背下来就能完成一次完整的初次对话。',
      ],
      sections: [
        {
          type: 'pattern',
          title: '打招呼',
          items: [
            { main: 'Hello! / Hi!', meaning: '你好！', example: 'Hello, everyone.', exampleCn: '大家好。', note: 'Hello 稍正式，Hi 更随意，日常都能用。' },
            { main: 'Good morning / afternoon / evening.', meaning: '早上好 / 下午好 / 晚上好。', example: 'Good morning, Mr. Smith.', exampleCn: '早上好，史密斯先生。', note: '三句分别对应早、中、晚三个时段。' },
          ],
        },
        {
          type: 'pattern',
          title: '自我介绍',
          items: [
            { main: 'My name is ...', meaning: '我叫……', example: 'My name is Wang Ming.', exampleCn: '我叫王明。', note: '也可以用 I\u2019m Wang Ming.，更口语。' },
            { main: 'I\u2019m from ...', meaning: '我来自……', example: 'I\u2019m from Shanghai.', exampleCn: '我来自上海。', note: 'from 后面接国家或城市。' },
            { main: 'Nice to meet you.', meaning: '很高兴认识你。', example: 'Nice to meet you, too.', exampleCn: '我也很高兴认识你。', note: '对方说完后回 too 表示“也”。' },
          ],
        },
        {
          type: 'pattern',
          title: '询问对方与介绍他人',
          items: [
            { main: 'How are you?', meaning: '你好吗？', example: 'I\u2019m fine, thank you.', exampleCn: '我很好，谢谢。', note: '这是问候不是提问，回答“好”即可。' },
            { main: 'What\u2019s your name?', meaning: '你叫什么名字？', example: 'My name is Lily.', exampleCn: '我叫莉莉。' },
            { main: 'This is my friend, ...', meaning: '这是我的朋友……', example: 'This is my friend, Lily.', exampleCn: '这是我的朋友莉莉。', note: '介绍他人时用 This is，而不是 He/She is。' },
          ],
        },
        {
          type: 'pattern',
          title: '道别',
          items: [
            { main: 'See you tomorrow / later.', meaning: '明天见 / 回头见。', example: 'See you tomorrow!', exampleCn: '明天见！' },
            { main: 'Goodbye! / Bye!', meaning: '再见！', example: 'Goodbye, everyone.', exampleCn: '大家再见。' },
          ],
        },
      ],
    },
  ],

  grammar: [
    {
      id: 'en-g1',
      image: 'images/lessons/en-g1.webp',
      title: '一般现在时 vs 现在进行时',
      subtitle: '英语最常用的两种时态',
      minutes: 12,
      intro: [
        '时态是英语动词的“时间标记”。入门阶段最重要的是分清两种：一般现在时（描述习惯、事实）和现在进行时（描述此刻正在发生的事）。',
        '一句话记忆：经常做的事用一般现在时，正在做的事用现在进行时。',
      ],
      sections: [
        {
          type: 'grammar',
          title: '一般现在时：习惯与事实',
          items: [
            {
              title: '基本结构',
              explanation: '主语 + 动词原形；主语是第三人称单数（he/she/it）时，动词加 s 或 es。',
              examples: [
                { text: 'I get up at seven every day.', cn: '我每天七点起床。（习惯）' },
                { text: 'She works in Shanghai.', cn: '她在上海工作。（常态）' },
                { text: 'The sun rises in the east.', cn: '太阳从东方升起。（事实）' },
              ],
            },
            {
              title: '第三人称单数变化规则',
              explanation: '一般加 s（work → works）；以 s/x/ch/sh/o 结尾加 es（watch → watches, go → goes）；辅音字母 + y 结尾变 y 为 i 加 es（study → studies）。',
              examples: [
                { text: 'He watches TV every evening.', cn: '他每天晚上看电视。' },
                { text: 'She goes to school by bus.', cn: '她坐公交车上学。' },
              ],
            },
            {
              title: '否定与疑问',
              explanation: '否定用 don\u2019t / doesn\u2019t + 动词原形；疑问用 Do / Does 开头。注意：加了 doesn\u2019t / Does 之后动词要变回原形。',
              examples: [
                { text: 'I don\u2019t like coffee.', cn: '我不喜欢咖啡。' },
                { text: 'She doesn\u2019t work on Sundays.', cn: '她周日不工作。' },
                { text: 'Do you speak English?', cn: '你会说英语吗？' },
              ],
            },
          ],
        },
        {
          type: 'grammar',
          title: '现在进行时：此刻正在发生',
          items: [
            {
              title: '基本结构',
              explanation: '主语 + be（am/is/are）+ 动词 ing 形式。',
              examples: [
                { text: 'I am studying English now.', cn: '我现在正在学英语。' },
                { text: 'He is playing basketball.', cn: '他正在打篮球。' },
                { text: 'They are having lunch.', cn: '他们正在吃午饭。' },
              ],
            },
            {
              title: '动词 ing 变化规则',
              explanation: '一般直接加 ing（read → reading）；以不发音 e 结尾去 e 加 ing（make → making）；重读闭音节双写末尾辅音字母（run → running, sit → sitting）。',
              examples: [
                { text: 'She is making a cake.', cn: '她正在做蛋糕。' },
                { text: 'The baby is sleeping.', cn: '宝宝正在睡觉。' },
              ],
            },
          ],
        },
        {
          type: 'grammar',
          title: '两种时态对比',
          items: [
            {
              title: '判断口诀',
              explanation: '看时间标志词：usually / always / every day 等用一般现在时；now / look / listen / at the moment 等用现在进行时。',
              examples: [
                { text: 'I read books every night.', cn: '我每晚读书。（习惯）' },
                { text: 'I am reading a book now.', cn: '我现在正在读一本书。（此刻）' },
                { text: 'Look! It is raining.', cn: '看！正在下雨。' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
