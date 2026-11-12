// 韩语课程数据（4 个模块各 1 课）
//
// 每节课可选配一段讲解视频（LessonVideo 组件用 iframe 嵌入，零托管成本）：
//   video: { provider: 'bilibili', id: 'BV1xx4y1xxx', page: 1 }
//   video: { provider: 'youtube',  id: 'dQw4w9WgXcQ' }
// 有 video 时，详情页顶部会显示视频播放器并隐藏 lesson.image 封面。

export default {
  pronunciation: [
    {
      id: 'ko-p1',
      image: 'images/lessons/ko-p1.webp',
      // video: { provider: 'bilibili', id: 'BV请替换成真实BV号' },
      title: '韩文字母（谚文）入门：21 元音 19 辅音',
      subtitle: '会拼就能读',
      minutes: 15,
      intro: [
        '韩文是拼音文字，一共 40 个字母：元音 21 个、辅音 19 个。学会字母和拼读规则，你就能读出任何一个韩文单词，即使不知道意思。',
        '本课先掌握 10 个基本元音和 14 个基本辅音，再用“辅音 + 元音”的组合练拼读。点击喇叭可以听每个字母的标准发音。',
      ],
      sections: [
        {
          type: 'chart',
          title: '辅音音图 · 按发音部位与方法',
          corner: '发音方式',
          cols: ['双唇音', '齿龈音', '龈后音', '软腭音', '声门音'],
          rows: [
            { label: '塞音 · 平音', cells: [
              { main: 'ㅂ', romaji: 'b / p' },
              { main: 'ㄷ', romaji: 'd / t' },
              null,
              { main: 'ㄱ', romaji: 'g / k' },
              null,
            ]},
            { label: '塞音 · 激音', cells: [
              { main: 'ㅍ', romaji: 'p' },
              { main: 'ㅌ', romaji: 't' },
              null,
              { main: 'ㅋ', romaji: 'k' },
              null,
            ]},
            { label: '塞擦音 · 平音', cells: [
              null,
              null,
              { main: 'ㅈ', romaji: 'j' },
              null,
              null,
            ]},
            { label: '塞擦音 · 激音', cells: [
              null,
              null,
              { main: 'ㅊ', romaji: 'ch' },
              null,
              null,
            ]},
            { label: '擦音', cells: [
              null,
              { main: 'ㅅ', romaji: 's' },
              null,
              null,
              { main: 'ㅎ', romaji: 'h' },
            ]},
            { label: '鼻音', cells: [
              { main: 'ㅁ', romaji: 'm' },
              { main: 'ㄴ', romaji: 'n' },
              null,
              { main: 'ㅇ', romaji: 'ng / 不发音' },
              null,
            ]},
            { label: '边音', cells: [
              null,
              { main: 'ㄹ', romaji: 'r / l' },
              null,
              null,
              null,
            ]},
          ],
        },
        {
          type: 'chart',
          title: '元音音图 · 按阴阳中性',
          corner: '分类',
          cols: ['阳性', '阴性', '中性'],
          rows: [
            { label: '基本元音', cells: [
              { main: 'ㅏ', romaji: 'a' },
              { main: 'ㅓ', romaji: 'eo' },
              { main: 'ㅡ', romaji: 'eu' },
            ]},
            { label: '圆唇元音', cells: [
              { main: 'ㅗ', romaji: 'o' },
              { main: 'ㅜ', romaji: 'u' },
              { main: 'ㅣ', romaji: 'i' },
            ]},
            { label: '야 · 여 系', cells: [
              { main: 'ㅑ', romaji: 'ya' },
              { main: 'ㅕ', romaji: 'yeo' },
              null,
            ]},
            { label: '요 · 유 系', cells: [
              { main: 'ㅛ', romaji: 'yo' },
              { main: 'ㅠ', romaji: 'yu' },
              null,
            ]},
          ],
        },
        {
          type: 'char',
          title: '基本元音（10 个）',
          items: [
            { main: 'ㅏ', reading: 'a', tip: '嘴巴自然张大，像“啊”' },
            { main: 'ㅑ', reading: 'ya', tip: 'ㅏ 前面加 y 音' },
            { main: 'ㅓ', reading: 'eo', tip: '嘴巴半开，介于“哦”和“啊”之间' },
            { main: 'ㅕ', reading: 'yeo', tip: 'ㅓ 前面加 y 音' },
            { main: 'ㅗ', reading: 'o', tip: '嘴唇收圆，像“哦”' },
            { main: 'ㅛ', reading: 'yo', tip: 'ㅗ 前面加 y 音' },
            { main: 'ㅜ', reading: 'u', tip: '嘴唇用力收圆，像“呜”' },
            { main: 'ㅠ', reading: 'yu', tip: 'ㅜ 前面加 y 音' },
            { main: 'ㅡ', reading: 'eu', tip: '嘴唇放松成一条横线' },
            { main: 'ㅣ', reading: 'i', tip: '像“衣”，嘴角向两边咧' },
          ],
        },
        {
          type: 'char',
          title: '基本辅音（14 个）',
          items: [
            { main: 'ㄱ', reading: 'g / k', tip: 'g 与 k 之间，词首偏 k' },
            { main: 'ㄴ', reading: 'n', tip: '像“呢”的声母' },
            { main: 'ㄷ', reading: 'd / t', tip: 'd 与 t 之间，词首偏 t' },
            { main: 'ㄹ', reading: 'r / l', tip: '介于 r 和 l 之间' },
            { main: 'ㅁ', reading: 'm', tip: '像“摸”的声母' },
            { main: 'ㅂ', reading: 'b / p', tip: 'b 与 p 之间，词首偏 p' },
            { main: 'ㅅ', reading: 's', tip: '像“思”的声母' },
            { main: 'ㅇ', reading: 'ng / 不发音', tip: '作收音读 ng，作首音不发音' },
            { main: 'ㅈ', reading: 'j', tip: '像“资”但轻一些' },
            { main: 'ㅊ', reading: 'ch', tip: '送气音，像“次”' },
            { main: 'ㅋ', reading: 'k', tip: '送气音，像“克”' },
            { main: 'ㅌ', reading: 't', tip: '送气音，像“特”' },
            { main: 'ㅍ', reading: 'p', tip: '送气音，像“坡”' },
            { main: 'ㅎ', reading: 'h', tip: '像“喝”的声母，较轻' },
          ],
        },
        {
          type: 'char',
          title: '拼读示例：辅音 + 元音',
          items: [
            { main: '가', reading: 'ga', tip: 'ㄱ + ㅏ' },
            { main: '나', reading: 'na', tip: 'ㄴ + ㅏ' },
            { main: '다', reading: 'da', tip: 'ㄷ + ㅏ' },
            { main: '라', reading: 'ra', tip: 'ㄹ + ㅏ' },
            { main: '마', reading: 'ma', tip: 'ㅁ + ㅏ' },
            { main: '바', reading: 'ba', tip: 'ㅂ + ㅏ' },
            { main: '사', reading: 'sa', tip: 'ㅅ + ㅏ' },
            { main: '아', reading: 'a', tip: 'ㅇ(不发音) + ㅏ' },
            { main: '자', reading: 'ja', tip: 'ㅈ + ㅏ' },
            { main: '하', reading: 'ha', tip: 'ㅎ + ㅏ' },
            { main: '구', reading: 'gu', tip: 'ㄱ + ㅜ，上辅下元' },
            { main: '과', reading: 'gwa', tip: 'ㄱ + ㅗ + ㅏ 组合' },
          ],
        },
        {
          type: 'text',
          title: '拼读规则',
          paragraphs: [
            '韩文一个音节写成一个方块字，由辅音和元音拼成。写法有三种：辅音在左、元音在右（如 가 = ㄱ + ㅏ）；辅音在上、元音在下（如 구 = ㄱ + ㅜ）；辅音在左、复合元音在右（如 과 = ㄱ + ㅗ + ㅏ）。',
            '收音（받침）：音节末尾还可以再加一个辅音，如 강 = ㄱ + ㅏ + ㅇ，读 gang。收音的发音规则入门阶段先记住：ㄱ/ㄲ/ㅋ 都收成 k，ㄷ/ㅅ/ㅈ/ㅊ/ㅌ/ㅎ 都收成 t，ㅂ/ㅍ 都收成 p。',
          ],
        },
      ],
    },
  ],

  vocabulary: [
    {
      id: 'ko-v1',
      image: 'images/lessons/ko-v1.webp',
      title: '韩语两套数字：固有词 vs 汉字词',
      subtitle: '什么时候用哪一套，一次讲清',
      minutes: 12,
      intro: [
        '韩语有两套数字系统：固有词（하나、둘、셋……）和汉字词（일、이、삼……）。这是初学者最容易晕的地方，规则其实很简单：',
        '固有词用于数个数、说年龄和说“几点”；汉字词用于日期、月份、分钟、金额和电话号码。两套都要背，但用法不混。',
      ],
      sections: [
        {
          type: 'word',
          title: '固有词 1-10（数数用）',
          items: [
            { main: '하나', reading: 'hana', meaning: '一', example: '사과 하나', exampleCn: '一个苹果' },
            { main: '둘', reading: 'dul', meaning: '二', example: '사람 둘', exampleCn: '两个人' },
            { main: '셋', reading: 'set', meaning: '三', example: '커피 셋', exampleCn: '三杯咖啡' },
            { main: '넷', reading: 'net', meaning: '四' },
            { main: '다섯', reading: 'daseot', meaning: '五' },
            { main: '여섯', reading: 'yeoseot', meaning: '六' },
            { main: '일곱', reading: 'ilgop', meaning: '七' },
            { main: '여덟', reading: 'yeodeol', meaning: '八' },
            { main: '아홉', reading: 'ahop', meaning: '九' },
            { main: '열', reading: 'yeol', meaning: '十' },
          ],
        },
        {
          type: 'word',
          title: '汉字词 1-10（日期/金额用）',
          items: [
            { main: '일', reading: 'il', meaning: '一', example: '일월', exampleCn: '一月' },
            { main: '이', reading: 'i', meaning: '二', example: '이월', exampleCn: '二月' },
            { main: '삼', reading: 'sam', meaning: '三', example: '삼월', exampleCn: '三月' },
            { main: '사', reading: 'sa', meaning: '四', example: '사월', exampleCn: '四月' },
            { main: '오', reading: 'o', meaning: '五', example: '오월', exampleCn: '五月' },
            { main: '육', reading: 'yuk', meaning: '六', example: '육월', exampleCn: '六月' },
            { main: '칠', reading: 'chil', meaning: '七', example: '칠월', exampleCn: '七月' },
            { main: '팔', reading: 'pal', meaning: '八', example: '팔월', exampleCn: '八月' },
            { main: '구', reading: 'gu', meaning: '九', example: '구월', exampleCn: '九月' },
            { main: '십', reading: 'sip', meaning: '十', example: '시월', exampleCn: '十月' },
          ],
        },
        {
          type: 'word',
          title: '入门必备问候词汇',
          items: [
            { main: '안녕하세요', reading: 'annyeonghaseyo', meaning: '你好', example: '안녕하세요?', exampleCn: '你好？' },
            { main: '감사합니다', reading: 'gamsahamnida', meaning: '谢谢', example: '감사합니다!', exampleCn: '谢谢！' },
            { main: '죄송합니다', reading: 'joesonghamnida', meaning: '对不起', example: '죄송합니다.', exampleCn: '对不起。' },
            { main: '네', reading: 'ne', meaning: '是', example: '네, 맞아요.', exampleCn: '是的，没错。' },
            { main: '아니요', reading: 'aniyo', meaning: '不', example: '아니요, 괜찮아요.', exampleCn: '不，没关系。' },
            { main: '안녕히 가세요', reading: 'annyeonghi gaseyo', meaning: '再见（对离开的人）', example: '안녕히 가세요!', exampleCn: '请慢走！' },
            { main: '안녕히 계세요', reading: 'annyeonghi gyeseyo', meaning: '再见（对留下的人）', example: '안녕히 계세요!', exampleCn: '请留步！' },
            { main: '주세요', reading: 'juseyo', meaning: '请给我', example: '물 주세요.', exampleCn: '请给我水。' },
          ],
        },
        {
          type: 'text',
          title: '记忆提示',
          paragraphs: [
            '固有词和汉字词的分工记成一句话：数数量、说年龄、说几点用固有词；说日期、月份、分钟、金额、电话用汉字词。比如“三点三十分”是 세 시 삼십 분——“三点”用固有词，“三十分”用汉字词。',
            '固有词 하나/둘/셋/넷 后面接量词时要变形成 한/두/세/네，例如“一个”是 한 개，不是 하나 개。',
          ],
        },
      ],
    },
  ],

  sentences: [
    {
      id: 'ko-s1',
      image: 'images/lessons/ko-s1.webp',
      title: '韩语自我介绍与问候：9 个高频句型',
      subtitle: '见面开口的第一套话术',
      minutes: 8,
      intro: [
        '韩语有敬语体系，对第一次见面的人要用礼貌体（-요 / -니다 结尾）。本课 9 个句型全部使用礼貌表达，可以放心用于任何初次见面的场合。',
      ],
      sections: [
        {
          type: 'pattern',
          title: '打招呼',
          items: [
            { main: '안녕하세요?', meaning: '你好', example: '안녕하세요? 처음 뵙겠습니다.', exampleCn: '你好，初次见面。', note: '句尾升调表疑问，平调表陈述，都很礼貌。' },
            { main: '안녕히 주무세요.', meaning: '晚安', example: '안녕히 주무세요.', exampleCn: '晚安。', note: '对长辈或不太熟的人道晚安。' },
          ],
        },
        {
          type: 'pattern',
          title: '自我介绍',
          items: [
            { main: '저는 ...입니다.', meaning: '我是……', example: '저는 왕밍입니다.', exampleCn: '我是王明。', note: '저는 是“我”的谦称加主题助词，比 나는 更礼貌，初次见面用 저는。' },
            { main: '저는 중국 사람입니다.', meaning: '我是中国人。', example: '저는 중국 사람입니다.', exampleCn: '我是中国人。' },
            { main: '만나서 반갑습니다.', meaning: '很高兴见到你。', example: '만나서 반갑습니다.', exampleCn: '很高兴见到你。', note: '见面必说的客套话。' },
            { main: '잘 부탁드립니다.', meaning: '请多关照。', example: '앞으로 잘 부탁드립니다.', exampleCn: '今后请多关照。', note: '韩语中非常高频的礼貌用语。' },
          ],
        },
        {
          type: 'pattern',
          title: '询问对方',
          items: [
            { main: '이름이 뭐예요?', meaning: '你叫什么名字？', example: '이름이 뭐예요?', exampleCn: '你叫什么名字？', note: '对平辈或晚辈可用，对长辈要用 성함이 어떻게 되세요?' },
            { main: '어디에서 왔어요?', meaning: '你从哪里来？', example: '어디에서 왔어요?', exampleCn: '你从哪里来？' },
            { main: '무슨 일을 해요?', meaning: '你做什么工作？', example: '무슨 일을 해요?', exampleCn: '你做什么工作？' },
          ],
        },
        {
          type: 'pattern',
          title: '道别',
          items: [
            { main: '안녕히 가세요.', meaning: '再见（对方离开时）', example: '안녕히 가세요!', exampleCn: '请慢走！', note: '字面意思是“请平安地走”。' },
            { main: '안녕히 계세요.', meaning: '再见（自己离开时）', example: '안녕히 계세요!', exampleCn: '请留步！', note: '字面意思是“请平安地留”。' },
          ],
        },
      ],
    },
  ],

  grammar: [
    {
      id: 'ko-g1',
      image: 'images/lessons/ko-g1.webp',
      title: '이에요/예요 与 은/는：韩语句子的地基',
      subtitle: '体词谓语句 + 主题助词',
      minutes: 12,
      intro: [
        '韩语里“我是学生”“这是书”这类句子，动词位置上放的不是动词，而是名词加 이에요 / 예요，这叫体词谓语句。它是韩语最基础的句型。',
        '本课再认识一个高频助词 은/는（主题助词），相当于“至于……的话”，是韩语口语中出现频率最高的助词之一。',
      ],
      sections: [
        {
          type: 'grammar',
          title: '体词谓语句：名词 + 이에요 / 예요',
          items: [
            {
              title: '基本规则',
              explanation: '名词最后一个字有收音（以辅音结尾）用 이에요；没有收音（以元音结尾）用 예요。',
              examples: [
                { text: '저는 학생이에요.', cn: '我是学生。（학생 有收音 ㄱ → 이에요）' },
                { text: '저는 의사예요.', cn: '我是医生。（의사 无收音 → 예요）' },
                { text: '이것은 책이에요.', cn: '这是书。' },
              ],
            },
            {
              title: '否定：이/가 아니에요',
              explanation: '否定时在名词后加 이/가 아니에요，同样看收音：有收音加 이，无收音加 가。',
              examples: [
                { text: '저는 선생님이 아니에요.', cn: '我不是老师。' },
                { text: '이것은 제 것이 아니에요.', cn: '这不是我的。' },
              ],
            },
            {
              title: '疑问：句尾升调',
              explanation: '陈述句和疑问句写法一样，疑问句只需句尾升调，或者用 뭐예요（是什么）。',
              examples: [
                { text: '이름이 뭐예요?', cn: '你叫什么名字？' },
                { text: '이게 뭐예요?', cn: '这是什么？' },
              ],
            },
          ],
        },
        {
          type: 'grammar',
          title: '主题助词 은/는',
          items: [
            {
              title: '基本规则',
              explanation: '有收音的名词后加 은，无收音加 는。作用是标出话题，相当于“说到……”。',
              examples: [
                { text: '저는 중국 사람이에요.', cn: '（说到）我，（我是）中国人。' },
                { text: '오늘은 날씨가 좋아요.', cn: '今天（的话），天气很好。' },
                { text: '한국어는 재미있어요.', cn: '韩语（的话），很有趣。' },
              ],
            },
            {
              title: '对比强调用法',
              explanation: '은/는 还常用来做对比：甲是 A，乙是 B。',
              examples: [
                { text: '저는 학생이고, 동생은 회사원이에요.', cn: '我是学生，弟弟是公司职员。' },
                { text: '사과는 좋아하는데, 바나나는 안 좋아해요.', cn: '苹果我喜欢，香蕉不喜欢。' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
