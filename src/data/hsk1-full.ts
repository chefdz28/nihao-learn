// HSK Standard Course 1 - Complete 15 Lessons
// Extracted from: HSK标准教程1 (HSK Standard Course 1)
// Publisher: Beijing Language and Culture University Press
// Based on official HSK 1 syllabus (150 words)

import type { Lesson } from '@/types';

export const hsk1FullLessons: Lesson[] = [
  // ============================================================
  // LESSON 1: 你好 Hello
  // ============================================================
  {
    id: 'hsk1-01',
    levelId: 'level-1',
    order: 1,
    titleEn: 'Hello',
    titleAr: 'مرحبا',
    objectiveEn: 'Learn basic greetings and polite expressions in Chinese',
    objectiveAr: 'تعلم التحيات الأساسية والعبارات المهذبة بالصينية',
    estimatedMinutes: 20,
    vocabulary: [
      { id: 'h1-v1', chinese: '你', pinyin: 'nǐ', arabic: 'أنت', english: 'you' },
      { id: 'h1-v2', chinese: '好', pinyin: 'hǎo', arabic: 'جيد', english: 'good' },
      { id: 'h1-v3', chinese: '您', pinyin: 'nín', arabic: 'أنت (مهذب)', english: 'you (polite)' },
      { id: 'h1-v4', chinese: '你们', pinyin: 'nǐmen', arabic: 'أنتم', english: 'you (plural)' },
      { id: 'h1-v5', chinese: '对不起', pinyin: 'duìbuqǐ', arabic: 'آسف / معذرة', english: 'sorry' },
      { id: 'h1-v6', chinese: '没关系', pinyin: 'méi guānxi', arabic: 'لا مشكلة', english: "it's okay / never mind" },
    ],
    sentences: [
      { id: 'h1-s1', chinese: '你好！', pinyin: 'Nǐ hǎo!', arabic: 'مرحباً!', english: 'Hello!' },
      { id: 'h1-s2', chinese: '您好！', pinyin: 'Nín hǎo!', arabic: 'مرحباً (مهذب)!', english: 'Hello! (polite)' },
      { id: 'h1-s3', chinese: '你们好！', pinyin: 'Nǐmen hǎo!', arabic: 'مرحباً بكم!', english: 'Hello everyone!' },
      { id: 'h1-s4', chinese: '对不起！', pinyin: 'Duìbuqǐ!', arabic: 'آسف!', english: 'Sorry!' },
      { id: 'h1-s5', chinese: '没关系。', pinyin: 'Méi guānxi.', arabic: 'لا مشكلة.', english: "It's okay." },
    ],
    exercise: {
      id: 'hsk1-ex01',
      questions: [
        { id: 'h1-q1', type: 'multiple_choice', questionEn: 'What does "你好" mean?', questionAr: 'ماذا يعني "你好"؟', options: [{ id: 'a', textEn: 'Goodbye', textAr: 'وداعاً' }, { id: 'b', textEn: 'Hello', textAr: 'مرحباً' }, { id: 'c', textEn: 'Thank you', textAr: 'شكراً' }, { id: 'd', textEn: 'Sorry', textAr: 'آسف' }], correctOptionId: 'b' },
        { id: 'h1-q2', type: 'multiple_choice', questionEn: '"对不起" means:', questionAr: '"对不起" تعني:', options: [{ id: 'a', textEn: 'Hello', textAr: 'مرحباً' }, { id: 'b', textEn: 'Sorry', textAr: 'آسف' }, { id: 'c', textEn: 'Goodbye', textAr: 'وداعاً' }, { id: 'd', textEn: 'Thank you', textAr: 'شكراً' }], correctOptionId: 'b' },
        { id: 'h1-q3', type: 'multiple_choice', questionEn: 'How do you respond to "对不起"?', questionAr: 'كيف ترد على "对不起"؟', options: [{ id: 'a', textEn: '你好', textAr: '你好' }, { id: 'b', textEn: '没关系', textAr: '没关系' }, { id: 'c', textEn: '谢谢', textAr: '谢谢' }, { id: 'd', textEn: '再见', textAr: '再见' }], correctOptionId: 'b' },
        { id: 'h1-q4', type: 'pinyin', questionEn: 'What is the Pinyin for "好"?', questionAr: 'ما هو البينيين لـ "好"؟', options: [{ id: 'a', textEn: 'nǐ', textAr: 'nǐ' }, { id: 'b', textEn: 'hǎo', textAr: 'hǎo' }, { id: 'c', textEn: 'nín', textAr: 'nín' }, { id: 'd', textEn: 'nǐmen', textAr: 'nǐmen' }], correctOptionId: 'b' },
        { id: 'h1-q5', type: 'fill_blank', questionEn: 'Complete: "___ 好！" (Hello!)', questionAr: 'أكمل: "___ 好!" (مرحباً!)', options: [{ id: 'a', textEn: '你', textAr: '你' }, { id: 'b', textEn: '好', textAr: '好' }, { id: 'c', textEn: '吗', textAr: '吗' }, { id: 'd', textEn: '不', textAr: '不' }], correctOptionId: 'a' },
      ],
    },
  },

  // ============================================================
  // LESSON 2: 谢谢你 Thank you
  // ============================================================
  {
    id: 'hsk1-02',
    levelId: 'level-1',
    order: 2,
    titleEn: 'Thank You',
    titleAr: 'شكراً لك',
    objectiveEn: 'Learn to express thanks, apologies, and say goodbye',
    objectiveAr: 'تعلم التعبير عن الشكر والاعتذار والوداع',
    estimatedMinutes: 20,
    vocabulary: [
      { id: 'h2-v1', chinese: '谢谢', pinyin: 'xièxie', arabic: 'شكراً', english: 'thank you' },
      { id: 'h2-v2', chinese: '不', pinyin: 'bù', arabic: 'لا', english: 'not / no' },
      { id: 'h2-v3', chinese: '不客气', pinyin: 'bú kèqi', arabic: 'على الرحب والسعة', english: "you're welcome" },
      { id: 'h2-v4', chinese: '再见', pinyin: 'zàijiàn', arabic: 'إلى اللقاء', english: 'goodbye' },
    ],
    sentences: [
      { id: 'h2-s1', chinese: '谢谢你！', pinyin: 'Xièxie nǐ!', arabic: 'شكراً لك!', english: 'Thank you!' },
      { id: 'h2-s2', chinese: '不客气！', pinyin: 'Bú kèqi!', arabic: 'على الرحب والسعة!', english: "You're welcome!" },
      { id: 'h2-s3', chinese: '再见！', pinyin: 'Zàijiàn!', arabic: 'إلى اللقاء!', english: 'Goodbye!' },
      { id: 'h2-s4', chinese: '谢谢，再见！', pinyin: 'Xièxie, zàijiàn!', arabic: 'شكراً، إلى اللقاء!', english: 'Thank you, goodbye!' },
    ],
    exercise: {
      id: 'hsk1-ex02',
      questions: [
        { id: 'h2-q1', type: 'multiple_choice', questionEn: '"谢谢" means:', questionAr: '"谢谢" تعني:', options: [{ id: 'a', textEn: 'Sorry', textAr: 'آسف' }, { id: 'b', textEn: 'Thank you', textAr: 'شكراً' }, { id: 'c', textEn: 'Goodbye', textAr: 'وداعاً' }, { id: 'd', textEn: 'Welcome', textAr: 'أهلاً' }], correctOptionId: 'b' },
        { id: 'h2-q2', type: 'multiple_choice', questionEn: 'How do you respond to "谢谢"?', questionAr: 'كيف ترد على "谢谢"؟', options: [{ id: 'a', textEn: '对不起', textAr: '对不起' }, { id: 'b', textEn: '不客气', textAr: '不客气' }, { id: 'c', textEn: '没关系', textAr: '没关系' }, { id: 'd', textEn: '你好', textAr: '你好' }], correctOptionId: 'b' },
        { id: 'h2-q3', type: 'multiple_choice', questionEn: '"再见" means:', questionAr: '"再见" تعني:', options: [{ id: 'a', textEn: 'Hello', textAr: 'مرحباً' }, { id: 'b', textEn: 'Goodbye', textAr: 'إلى اللقاء' }, { id: 'c', textEn: 'Thank you', textAr: 'شكراً' }, { id: 'd', textEn: 'Sorry', textAr: 'آسف' }], correctOptionId: 'b' },
        { id: 'h2-q4', type: 'pinyin', questionEn: 'What is the Pinyin for "不"?', questionAr: 'ما هو البينيين لـ "不"؟', options: [{ id: 'a', textEn: 'bù', textAr: 'bù' }, { id: 'b', textEn: 'bú', textAr: 'bú' }, { id: 'c', textEn: 'bǔ', textAr: 'bǔ' }, { id: 'd', textEn: 'bū', textAr: 'bū' }], correctOptionId: 'a' },
        { id: 'h2-q5', type: 'fill_blank', questionEn: 'Complete: "___ 客气！" (You\'re welcome!)', questionAr: 'أكمل: "___ 客气!" (على الرحب والسعة!)', options: [{ id: 'a', textEn: '不', textAr: '不' }, { id: 'b', textEn: '没', textAr: '没' }, { id: 'c', textEn: '很', textAr: '很' }, { id: 'd', textEn: '太', textAr: '太' }], correctOptionId: 'a' },
      ],
    },
  },

  // ============================================================
  // LESSON 3: 你叫什么名字 What's your name
  // ============================================================
  {
    id: 'hsk1-03',
    levelId: 'level-1',
    order: 3,
    titleEn: "What's Your Name",
    titleAr: 'ما اسمك',
    objectiveEn: 'Learn to ask and answer names, and use basic question particles',
    objectiveAr: 'تعلم السؤال والإجابة عن الأسماء واستخدام جسيمات الاستفهام',
    estimatedMinutes: 25,
    vocabulary: [
      { id: 'h3-v1', chinese: '叫', pinyin: 'jiào', arabic: 'يدعى / ينادي', english: 'to be called / to call' },
      { id: 'h3-v2', chinese: '什么', pinyin: 'shénme', arabic: 'ماذا / ما', english: 'what' },
      { id: 'h3-v3', chinese: '名字', pinyin: 'míngzi', arabic: 'اسم', english: 'name' },
      { id: 'h3-v4', chinese: '我', pinyin: 'wǒ', arabic: 'أنا', english: 'I / me' },
      { id: 'h3-v5', chinese: '是', pinyin: 'shì', arabic: 'يكون', english: 'to be (am/is/are)' },
      { id: 'h3-v6', chinese: '老师', pinyin: 'lǎoshī', arabic: 'مدرس', english: 'teacher' },
      { id: 'h3-v7', chinese: '吗', pinyin: 'ma', arabic: '؟ (جسيم استفهام)', english: '(question particle)' },
      { id: 'h3-v8', chinese: '学生', pinyin: 'xuésheng', arabic: 'طالب', english: 'student' },
      { id: 'h3-v9', chinese: '人', pinyin: 'rén', arabic: 'شخص', english: 'person / people' },
    ],
    sentences: [
      { id: 'h3-s1', chinese: '你叫什么名字？', pinyin: 'Nǐ jiào shénme míngzi?', arabic: 'ما اسمك؟', english: "What's your name?" },
      { id: 'h3-s2', chinese: '我叫大卫。', pinyin: 'Wǒ jiào Dàwèi.', arabic: 'اسمي ديفيد.', english: 'My name is David.' },
      { id: 'h3-s3', chinese: '你是老师吗？', pinyin: 'Nǐ shì lǎoshī ma?', arabic: 'هل أنت مدرس؟', english: 'Are you a teacher?' },
      { id: 'h3-s4', chinese: '我是学生。', pinyin: 'Wǒ shì xuésheng.', arabic: 'أنا طالب.', english: 'I am a student.' },
      { id: 'h3-s5', chinese: '你是中国人吗？', pinyin: 'Nǐ shì Zhōngguó rén ma?', arabic: 'هل أنت صيني؟', english: 'Are you Chinese?' },
    ],
    exercise: {
      id: 'hsk1-ex03',
      questions: [
        { id: 'h3-q1', type: 'multiple_choice', questionEn: '"什么" means:', questionAr: '"什么" تعني:', options: [{ id: 'a', textEn: 'Who', textAr: 'من' }, { id: 'b', textEn: 'What', textAr: 'ماذا' }, { id: 'c', textEn: 'Where', textAr: 'أين' }, { id: 'd', textEn: 'When', textAr: 'متى' }], correctOptionId: 'b' },
        { id: 'h3-q2', type: 'multiple_choice', questionEn: '"老师" means:', questionAr: '"老师" تعني:', options: [{ id: 'a', textEn: 'Student', textAr: 'طالب' }, { id: 'b', textEn: 'Teacher', textAr: 'مدرس' }, { id: 'c', textEn: 'Doctor', textAr: 'طبيب' }, { id: 'd', textEn: 'Friend', textAr: 'صديق' }], correctOptionId: 'b' },
        { id: 'h3-q3', type: 'multiple_choice', questionEn: 'Which particle turns a statement into a yes/no question?', questionAr: 'أي جسيم يحول الجملة إلى سؤال بنعم/لا؟', options: [{ id: 'a', textEn: '什么', textAr: '什么' }, { id: 'b', textEn: '吗', textAr: '吗' }, { id: 'c', textEn: '不', textAr: '不' }, { id: 'd', textEn: '很', textAr: '很' }], correctOptionId: 'b' },
        { id: 'h3-q4', type: 'pinyin', questionEn: 'What is the Pinyin for "学生"?', questionAr: 'ما هو البينيين لـ "学生"؟', options: [{ id: 'a', textEn: 'xuésheng', textAr: 'xuésheng' }, { id: 'b', textEn: 'lǎoshī', textAr: 'lǎoshī' }, { id: 'c', textEn: 'míngzi', textAr: 'míngzi' }, { id: 'd', textEn: 'shénme', textAr: 'shénme' }], correctOptionId: 'a' },
        { id: 'h3-q5', type: 'fill_blank', questionEn: 'Complete: "___ 叫 什么 名字？"', questionAr: 'أكمل: "___ 叫 什么 名字؟"', options: [{ id: 'a', textEn: '你', textAr: '你' }, { id: 'b', textEn: '我', textAr: '我' }, { id: 'c', textEn: '他', textAr: '他' }, { id: 'd', textEn: '她', textAr: '她' }], correctOptionId: 'a' },
      ],
    },
  },

  // ============================================================
  // LESSON 4: 她是我的汉语老师 She is my Chinese teacher
  // ============================================================
  {
    id: 'hsk1-04',
    levelId: 'level-1',
    order: 4,
    titleEn: 'She Is My Chinese Teacher',
    titleAr: 'هي مدرستي للصينية',
    objectiveEn: 'Learn pronouns, possessive particle, and nationality questions',
    objectiveAr: 'تعلم الضمائر وجسيم الملكية وأسئلة الجنسية',
    estimatedMinutes: 25,
    vocabulary: [
      { id: 'h4-v1', chinese: '她', pinyin: 'tā', arabic: 'هي', english: 'she / her' },
      { id: 'h4-v2', chinese: '谁', pinyin: 'shéi', arabic: 'من', english: 'who' },
      { id: 'h4-v3', chinese: '的', pinyin: 'de', arabic: 'ـ (ملكية)', english: '(possessive particle)' },
      { id: 'h4-v4', chinese: '汉语', pinyin: 'Hànyǔ', arabic: 'اللغة الصينية', english: 'Chinese (language)' },
      { id: 'h4-v5', chinese: '哪', pinyin: 'nǎ', arabic: 'أي', english: 'which' },
      { id: 'h4-v6', chinese: '国', pinyin: 'guó', arabic: 'بلد', english: 'country' },
      { id: 'h4-v7', chinese: '呢', pinyin: 'ne', arabic: '؟ (جسيم استفهام)', english: '(question particle)' },
      { id: 'h4-v8', chinese: '他', pinyin: 'tā', arabic: 'هو', english: 'he / him' },
      { id: 'h4-v9', chinese: '同学', pinyin: 'tóngxué', arabic: 'زميل دراسة', english: 'classmate' },
      { id: 'h4-v10', chinese: '朋友', pinyin: 'péngyou', arabic: 'صديق', english: 'friend' },
    ],
    sentences: [
      { id: 'h4-s1', chinese: '她是谁？', pinyin: 'Tā shì shéi?', arabic: 'من هي؟', english: 'Who is she?' },
      { id: 'h4-s2', chinese: '她是我的汉语老师。', pinyin: 'Tā shì wǒ de Hànyǔ lǎoshī.', arabic: 'هي مدرستي للصينية.', english: 'She is my Chinese teacher.' },
      { id: 'h4-s3', chinese: '你是哪国人？', pinyin: 'Nǐ shì nǎ guó rén?', arabic: 'من أي بلد أنت؟', english: 'Which country are you from?' },
      { id: 'h4-s4', chinese: '我是中国人。你呢？', pinyin: 'Wǒ shì Zhōngguó rén. Nǐ ne?', arabic: 'أنا صيني. وأنت؟', english: 'I am Chinese. What about you?' },
      { id: 'h4-s5', chinese: '他是我的朋友。', pinyin: 'Tā shì wǒ de péngyou.', arabic: 'هو صديقي.', english: 'He is my friend.' },
    ],
    exercise: {
      id: 'hsk1-ex04',
      questions: [
        { id: 'h4-q1', type: 'multiple_choice', questionEn: '"她" means:', questionAr: '"她" تعني:', options: [{ id: 'a', textEn: 'He', textAr: 'هو' }, { id: 'b', textEn: 'She', textAr: 'هي' }, { id: 'c', textEn: 'You', textAr: 'أنت' }, { id: 'd', textEn: 'I', textAr: 'أنا' }], correctOptionId: 'b' },
        { id: 'h4-q2', type: 'multiple_choice', questionEn: '"谁" means:', questionAr: '"谁" تعني:', options: [{ id: 'a', textEn: 'What', textAr: 'ماذا' }, { id: 'b', textEn: 'Who', textAr: 'من' }, { id: 'c', textEn: 'Where', textAr: 'أين' }, { id: 'd', textEn: 'When', textAr: 'متى' }], correctOptionId: 'b' },
        { id: 'h4-q3', type: 'multiple_choice', questionEn: '"朋友" means:', questionAr: '"朋友" تعني:', options: [{ id: 'a', textEn: 'Teacher', textAr: 'مدرس' }, { id: 'b', textEn: 'Classmate', textAr: 'زميل' }, { id: 'c', textEn: 'Friend', textAr: 'صديق' }, { id: 'd', textEn: 'Student', textAr: 'طالب' }], correctOptionId: 'c' },
        { id: 'h4-q4', type: 'fill_blank', questionEn: 'Complete: "她是我___汉语老师。"', questionAr: 'أكمل: "她是我___汉语老师。"', options: [{ id: 'a', textEn: '的', textAr: '的' }, { id: 'b', textEn: '是', textAr: '是' }, { id: 'c', textEn: '吗', textAr: '吗' }, { id: 'd', textEn: '呢', textAr: '呢' }], correctOptionId: 'a' },
        { id: 'h4-q5', type: 'pinyin', questionEn: 'What is the Pinyin for "同学"?', questionAr: 'ما هو البينيين لـ "同学"؟', options: [{ id: 'a', textEn: 'tóngxué', textAr: 'tóngxué' }, { id: 'b', textEn: 'péngyou', textAr: 'péngyou' }, { id: 'c', textEn: 'lǎoshī', textAr: 'lǎoshī' }, { id: 'd', textEn: 'xuésheng', textAr: 'xuésheng' }], correctOptionId: 'a' },
      ],
    },
  },

  // ============================================================
  // LESSON 5: 她女儿今年二十岁 Her daughter is 20 years old
  // ============================================================
  {
    id: 'hsk1-05',
    levelId: 'level-1',
    order: 5,
    titleEn: 'Her Daughter Is 20 Years Old',
    titleAr: 'ابنتها عمرها عشرون سنة',
    objectiveEn: 'Learn numbers, age expressions, and family vocabulary',
    objectiveAr: 'تعلم الأرقام وتعبيرات العمر ومفردات العائلة',
    estimatedMinutes: 30,
    vocabulary: [
      { id: 'h5-v1', chinese: '家', pinyin: 'jiā', arabic: 'بيت / عائلة', english: 'family / home' },
      { id: 'h5-v2', chinese: '有', pinyin: 'yǒu', arabic: 'يوجد / لدي', english: 'to have / there is' },
      { id: 'h5-v3', chinese: '女儿', pinyin: 'nǚ\'ér', arabic: 'ابنة', english: 'daughter' },
      { id: 'h5-v4', chinese: '儿', pinyin: 'ér', arabic: 'ابن (لاحقة)', english: 'son / child (suffix)' },
      { id: 'h5-v5', chinese: '岁', pinyin: 'suì', arabic: 'سنة (عمر)', english: 'years old' },
      { id: 'h5-v6', chinese: '了', pinyin: 'le', arabic: 'ـ (جسيم تغيير)', english: '(change particle)' },
      { id: 'h5-v7', chinese: '今年', pinyin: 'jīnnián', arabic: 'هذا العام', english: 'this year' },
      { id: 'h5-v8', chinese: '多', pinyin: 'duō', arabic: 'كم / كثير', english: 'how much / many' },
      { id: 'h5-v9', chinese: '大', pinyin: 'dà', arabic: 'كبير', english: 'big / old' },
      { id: 'h5-v10', chinese: '几', pinyin: 'jǐ', arabic: 'كم (أرقام صغيرة)', english: 'how many (small numbers)' },
    ],
    sentences: [
      { id: 'h5-s1', chinese: '你家有几口人？', pinyin: 'Nǐ jiā yǒu jǐ kǒu rén?', arabic: 'كم شخص في عائلتك؟', english: 'How many people are there in your family?' },
      { id: 'h5-s2', chinese: '我家有五口人。', pinyin: 'Wǒ jiā yǒu wǔ kǒu rén.', arabic: 'في عائلتي خمسة أشخاص.', english: 'There are five people in my family.' },
      { id: 'h5-s3', chinese: '她女儿今年二十岁了。', pinyin: 'Tā nǚ\'ér jīnnián èrshí suì le.', arabic: 'ابنتها عمرها عشرون سنة هذا العام.', english: 'Her daughter is 20 years old this year.' },
      { id: 'h5-s4', chinese: '你多大？', pinyin: 'Nǐ duō dà?', arabic: 'كم عمرك؟', english: 'How old are you?' },
      { id: 'h5-s5', chinese: '我十八岁了。', pinyin: 'Wǒ shíbā suì le.', arabic: 'عمري ثمانية عشر سنة.', english: 'I am 18 years old.' },
    ],
    exercise: {
      id: 'hsk1-ex05',
      questions: [
        { id: 'h5-q1', type: 'multiple_choice', questionEn: '"岁" is used to express:', questionAr: '"岁" تستخدم للتعبير عن:', options: [{ id: 'a', textEn: 'Time', textAr: 'الوقت' }, { id: 'b', textEn: 'Age', textAr: 'العمر' }, { id: 'c', textEn: 'Money', textAr: 'المال' }, { id: 'd', textEn: 'Date', textAr: 'التاريخ' }], correctOptionId: 'b' },
        { id: 'h5-q2', type: 'multiple_choice', questionEn: '"女儿" means:', questionAr: '"女儿" تعني:', options: [{ id: 'a', textEn: 'Son', textAr: 'ابن' }, { id: 'b', textEn: 'Daughter', textAr: 'ابنة' }, { id: 'c', textEn: 'Mother', textAr: 'أم' }, { id: 'd', textEn: 'Father', textAr: 'أب' }], correctOptionId: 'b' },
        { id: 'h5-q3', type: 'multiple_choice', questionEn: '"多大" is used to ask about:', questionAr: '"多大" تُستخدم للسؤال عن:', options: [{ id: 'a', textEn: 'Name', textAr: 'الاسم' }, { id: 'b', textEn: 'Age', textAr: 'العمر' }, { id: 'c', textEn: 'Country', textAr: 'البلد' }, { id: 'd', textEn: 'Job', textAr: 'الوظيفة' }], correctOptionId: 'b' },
        { id: 'h5-q4', type: 'pinyin', questionEn: 'What is the Pinyin for "今年"?', questionAr: 'ما هو البينيين لـ "今年"؟', options: [{ id: 'a', textEn: 'jīnnián', textAr: 'jīnnián' }, { id: 'b', textEn: 'qùnián', textAr: 'qùnián' }, { id: 'c', textEn: 'míngnián', textAr: 'míngnián' }, { id: 'd', textEn: 'zuótiān', textAr: 'zuótiān' }], correctOptionId: 'a' },
        { id: 'h5-q5', type: 'fill_blank', questionEn: 'Complete: "我___十八___了。" (I am 18 years old.)', questionAr: 'أكمل: "我___十八___了。" (عمري ١٨ سنة.)', options: [{ id: 'a', textEn: '是, 岁', textAr: '是, 岁' }, { id: 'b', textEn: '有, 岁', textAr: '有, 岁' }, { id: 'c', textEn: '很, 大', textAr: '很, 大' }, { id: 'd', textEn: '不, 岁', textAr: '不, 岁' }], correctOptionId: 'b' },
      ],
    },
  },

  // ============================================================
  // LESSON 6: 我会说汉语 I can speak Chinese
  // ============================================================
  {
    id: 'hsk1-06',
    levelId: 'level-1',
    order: 6,
    titleEn: 'I Can Speak Chinese',
    titleAr: 'أستطيع التكلم بالصينية',
    objectiveEn: 'Learn modal verb 会, ability expressions, and adjective predicates',
    objectiveAr: 'تعلم الفعل المساعد 会 وتعبيرات القدرة والصفات',
    estimatedMinutes: 25,
    vocabulary: [
      { id: 'h6-v1', chinese: '会', pinyin: 'huì', arabic: 'يستطيع / يعرف', english: 'can / know how to' },
      { id: 'h6-v2', chinese: '说', pinyin: 'shuō', arabic: 'يتكلم', english: 'to speak' },
      { id: 'h6-v3', chinese: '妈妈', pinyin: 'māma', arabic: 'أم', english: 'mother' },
      { id: 'h6-v4', chinese: '菜', pinyin: 'cài', arabic: 'طبق / خضار', english: 'dish / vegetable' },
      { id: 'h6-v5', chinese: '很', pinyin: 'hěn', arabic: 'جداً', english: 'very' },
      { id: 'h6-v6', chinese: '好吃', pinyin: 'hǎochī', arabic: 'لذيذ', english: 'delicious' },
      { id: 'h6-v7', chinese: '做', pinyin: 'zuò', arabic: 'يصنع / يطبخ', english: 'to make / to cook' },
      { id: 'h6-v8', chinese: '写', pinyin: 'xiě', arabic: 'يكتب', english: 'to write' },
      { id: 'h6-v9', chinese: '汉字', pinyin: 'Hànzì', arabic: 'الحروف الصينية', english: 'Chinese characters' },
      { id: 'h6-v10', chinese: '字', pinyin: 'zì', arabic: 'حرف / كلمة', english: 'character / word' },
      { id: 'h6-v11', chinese: '怎么', pinyin: 'zěnme', arabic: 'كيف', english: 'how' },
      { id: 'h6-v12', chinese: '读', pinyin: 'dú', arabic: 'يقرأ', english: 'to read' },
    ],
    sentences: [
      { id: 'h6-s1', chinese: '我会说汉语。', pinyin: 'Wǒ huì shuō Hànyǔ.', arabic: 'أستطيع التكلم بالصينية.', english: 'I can speak Chinese.' },
      { id: 'h6-s2', chinese: '妈妈做的菜很好吃。', pinyin: 'Māma zuò de cài hěn hǎochī.', arabic: 'الأطباق التي تطبخها الأم لذيذة جداً.', english: 'The dishes mom cooks are very delicious.' },
      { id: 'h6-s3', chinese: '你会写汉字吗？', pinyin: 'Nǐ huì xiě Hànzì ma?', arabic: 'هل تستطيع كتابة الحروف الصينية؟', english: 'Can you write Chinese characters?' },
      { id: 'h6-s4', chinese: '这个字怎么读？', pinyin: 'Zhè ge zì zěnme dú?', arabic: 'كيف تقرأ هذا الحرف؟', english: 'How do you read this character?' },
      { id: 'h6-s5', chinese: '我不会说英语。', pinyin: 'Wǒ bú huì shuō Yīngyǔ.', arabic: 'لا أستطيع التكلم بالإنجليزية.', english: "I can't speak English." },
    ],
    exercise: {
      id: 'hsk1-ex06',
      questions: [
        { id: 'h6-q1', type: 'multiple_choice', questionEn: '"会" expresses:', questionAr: '"会" تعبر عن:', options: [{ id: 'a', textEn: 'Want', textAr: 'الرغبة' }, { id: 'b', textEn: 'Ability / Can', textAr: 'القدرة / الاستطاعة' }, { id: 'c', textEn: 'Need', textAr: 'الحاجة' }, { id: 'd', textEn: 'Like', textAr: 'الإعجاب' }], correctOptionId: 'b' },
        { id: 'h6-q2', type: 'multiple_choice', questionEn: '"好吃" means:', questionAr: '"好吃" تعني:', options: [{ id: 'a', textEn: 'Good to eat / Delicious', textAr: 'لذيذ' }, { id: 'b', textEn: 'Easy to cook', textAr: 'سهل الطبخ' }, { id: 'c', textEn: 'Hot food', textAr: 'طعام ساخن' }, { id: 'd', textEn: 'Expensive', textAr: 'غالي' }], correctOptionId: 'a' },
        { id: 'h6-q3', type: 'multiple_choice', questionEn: '"怎么" means:', questionAr: '"怎么" تعني:', options: [{ id: 'a', textEn: 'What', textAr: 'ماذا' }, { id: 'b', textEn: 'How', textAr: 'كيف' }, { id: 'c', textEn: 'Why', textAr: 'لماذا' }, { id: 'd', textEn: 'Where', textAr: 'أين' }], correctOptionId: 'b' },
        { id: 'h6-q4', type: 'pinyin', questionEn: 'What is the Pinyin for "汉字"?', questionAr: 'ما هو البينيين لـ "汉字"؟', options: [{ id: 'a', textEn: 'Hànzì', textAr: 'Hànzì' }, { id: 'b', textEn: 'Hànyǔ', textAr: 'Hànyǔ' }, { id: 'c', textEn: 'zìmǔ', textAr: 'zìmǔ' }, { id: 'd', textEn: 'wénzì', textAr: 'wénzì' }], correctOptionId: 'a' },
        { id: 'h6-q5', type: 'fill_blank', questionEn: 'Complete: "我___说汉语。" (I can speak Chinese.)', questionAr: 'أكمل: "我___说汉语。" (أستطيع التكلم بالصينية.)', options: [{ id: 'a', textEn: '会', textAr: '会' }, { id: 'b', textEn: '很', textAr: '很' }, { id: 'c', textEn: '不', textAr: '不' }, { id: 'd', textEn: '吗', textAr: '吗' }], correctOptionId: 'a' },
      ],
    },
  },

  // ============================================================
  // LESSON 7: 今天几号 What's the date today
  // ============================================================
  {
    id: 'hsk1-07',
    levelId: 'level-1',
    order: 7,
    titleEn: "What's the Date Today",
    titleAr: 'ما هو التاريخ اليوم',
    objectiveEn: 'Learn date expressions, days of the week, and time words',
    objectiveAr: 'تعلم تعبيرات التاريخ وأيام الأسبوع وكلمات الوقت',
    estimatedMinutes: 30,
    vocabulary: [
      { id: 'h7-v1', chinese: '请', pinyin: 'qǐng', arabic: 'من فضلك', english: 'please' },
      { id: 'h7-v2', chinese: '问', pinyin: 'wèn', arabic: 'يسأل', english: 'to ask' },
      { id: 'h7-v3', chinese: '今天', pinyin: 'jīntiān', arabic: 'اليوم', english: 'today' },
      { id: 'h7-v4', chinese: '号', pinyin: 'hào', arabic: 'رقم / تاريخ', english: 'date / number' },
      { id: 'h7-v5', chinese: '月', pinyin: 'yuè', arabic: 'شهر', english: 'month' },
      { id: 'h7-v6', chinese: '星期', pinyin: 'xīngqī', arabic: 'أسبوع', english: 'week' },
      { id: 'h7-v7', chinese: '昨天', pinyin: 'zuótiān', arabic: 'أمس', english: 'yesterday' },
      { id: 'h7-v8', chinese: '明天', pinyin: 'míngtiān', arabic: 'غداً', english: 'tomorrow' },
      { id: 'h7-v9', chinese: '去', pinyin: 'qù', arabic: 'يذهب', english: 'to go' },
      { id: 'h7-v10', chinese: '学校', pinyin: 'xuéxiào', arabic: 'مدرسة', english: 'school' },
      { id: 'h7-v11', chinese: '看', pinyin: 'kàn', arabic: 'ينظر / يشاهد', english: 'to look / to watch' },
      { id: 'h7-v12', chinese: '书', pinyin: 'shū', arabic: 'كتاب', english: 'book' },
    ],
    sentences: [
      { id: 'h7-s1', chinese: '今天几号？', pinyin: 'Jīntiān jǐ hào?', arabic: 'ما هو تاريخ اليوم؟', english: "What's the date today?" },
      { id: 'h7-s2', chinese: '今天十二月二十五号。', pinyin: 'Jīntiān shí\'èr yuè èrshíwǔ hào.', arabic: 'اليوم الخامس والعشرون من ديسمبر.', english: "Today is December 25th." },
      { id: 'h7-s3', chinese: '今天星期几？', pinyin: 'Jīntiān xīngqī jǐ?', arabic: 'ما هو يوم الأسبوع اليوم؟', english: 'What day is it today?' },
      { id: 'h7-s4', chinese: '明天我去学校。', pinyin: 'Míngtiān wǒ qù xuéxiào.', arabic: 'غداً سأذهب إلى المدرسة.', english: 'Tomorrow I will go to school.' },
      { id: 'h7-s5', chinese: '昨天我看书了。', pinyin: 'Zuótiān wǒ kàn shū le.', arabic: 'أمس قرأت كتاباً.', english: 'Yesterday I read a book.' },
    ],
    exercise: {
      id: 'hsk1-ex07',
      questions: [
        { id: 'h7-q1', type: 'multiple_choice', questionEn: '"今天" means:', questionAr: '"今天" تعني:', options: [{ id: 'a', textEn: 'Yesterday', textAr: 'أمس' }, { id: 'b', textEn: 'Today', textAr: 'اليوم' }, { id: 'c', textEn: 'Tomorrow', textAr: 'غداً' }, { id: 'd', textEn: 'Next week', textAr: 'الأسبوع القادم' }], correctOptionId: 'b' },
        { id: 'h7-q2', type: 'multiple_choice', questionEn: '"明天" means:', questionAr: '"明天" تعني:', options: [{ id: 'a', textEn: 'Today', textAr: 'اليوم' }, { id: 'b', textEn: 'Tomorrow', textAr: 'غداً' }, { id: 'c', textEn: 'Yesterday', textAr: 'أمس' }, { id: 'd', textEn: 'Now', textAr: 'الآن' }], correctOptionId: 'b' },
        { id: 'h7-q3', type: 'multiple_choice', questionEn: '"学校" means:', questionAr: '"学校" تعني:', options: [{ id: 'a', textEn: 'Hospital', textAr: 'مستشفى' }, { id: 'b', textEn: 'School', textAr: 'مدرسة' }, { id: 'c', textEn: 'Office', textAr: 'مكتب' }, { id: 'd', textEn: 'Restaurant', textAr: 'مطعم' }], correctOptionId: 'b' },
        { id: 'h7-q4', type: 'pinyin', questionEn: 'What is the Pinyin for "星期"?', questionAr: 'ما هو البينيين لـ "星期"؟', options: [{ id: 'a', textEn: 'xīngqī', textAr: 'xīngqī' }, { id: 'b', textEn: 'yuèfèn', textAr: 'yuèfèn' }, { id: 'c', textEn: 'niánfèn', textAr: 'niánfèn' }, { id: 'd', textEn: 'tiānqì', textAr: 'tiānqì' }], correctOptionId: 'a' },
        { id: 'h7-q5', type: 'fill_blank', questionEn: 'Complete: "___ 天我去学校。" (Tomorrow I go to school.)', questionAr: 'أكمل: "___ 天我去学校。" (غداً سأذهب للمدرسة.)', options: [{ id: 'a', textEn: '明', textAr: '明' }, { id: 'b', textEn: '昨', textAr: '昨' }, { id: 'c', textEn: '今', textAr: '今' }, { id: 'd', textEn: '前', textAr: '前' }], correctOptionId: 'a' },
      ],
    },
  },

  // ============================================================
  // LESSON 8: 我想喝茶 I'd like some tea
  // ============================================================
  {
    id: 'hsk1-08',
    levelId: 'level-1',
    order: 8,
    titleEn: "I'd Like Some Tea",
    titleAr: 'أود شرب بعض الشاي',
    objectiveEn: 'Learn food/drink vocabulary, shopping expressions, and measure words',
    objectiveAr: 'تعلم مفردات الطعام والشراب وتعبيرات التسوق وعدادات الكلمات',
    estimatedMinutes: 30,
    vocabulary: [
      { id: 'h8-v1', chinese: '想', pinyin: 'xiǎng', arabic: 'يريد / يفكر', english: 'to want / to think' },
      { id: 'h8-v2', chinese: '喝', pinyin: 'hē', arabic: 'يشرب', english: 'to drink' },
      { id: 'h8-v3', chinese: '茶', pinyin: 'chá', arabic: 'شاي', english: 'tea' },
      { id: 'h8-v4', chinese: '吃', pinyin: 'chī', arabic: 'يأكل', english: 'to eat' },
      { id: 'h8-v5', chinese: '米饭', pinyin: 'mǐfàn', arabic: 'أرز', english: 'rice' },
      { id: 'h8-v6', chinese: '下午', pinyin: 'xiàwǔ', arabic: 'بعد الظهر', english: 'afternoon' },
      { id: 'h8-v7', chinese: '商店', pinyin: 'shāngdiàn', arabic: 'محل / متجر', english: 'shop / store' },
      { id: 'h8-v8', chinese: '买', pinyin: 'mǎi', arabic: 'يشتري', english: 'to buy' },
      { id: 'h8-v9', chinese: '个', pinyin: 'ge', arabic: 'ـ (عداد عام)', english: '(general measure word)' },
      { id: 'h8-v10', chinese: '杯子', pinyin: 'bēizi', arabic: 'كوب', english: 'cup / glass' },
      { id: 'h8-v11', chinese: '这', pinyin: 'zhè', arabic: 'هذا', english: 'this' },
      { id: 'h8-v12', chinese: '多少', pinyin: 'duōshao', arabic: 'كم (العدد)', english: 'how much / how many' },
      { id: 'h8-v13', chinese: '钱', pinyin: 'qián', arabic: 'مال', english: 'money' },
      { id: 'h8-v14', chinese: '块', pinyin: 'kuài', arabic: 'يوان (وحدة)', english: '(measure word for money)' },
      { id: 'h8-v15', chinese: '那', pinyin: 'nà', arabic: 'ذاك', english: 'that' },
    ],
    sentences: [
      { id: 'h8-s1', chinese: '我想喝茶。', pinyin: 'Wǒ xiǎng hē chá.', arabic: 'أود شرب الشاي.', english: "I'd like to drink tea." },
      { id: 'h8-s2', chinese: '你吃什么？', pinyin: 'Nǐ chī shénme?', arabic: 'ماذا تأكل؟', english: 'What do you eat?' },
      { id: 'h8-s3', chinese: '我想买这个杯子。', pinyin: 'Wǒ xiǎng mǎi zhè ge bēizi.', arabic: 'أود شراء هذا الكوب.', english: 'I want to buy this cup.' },
      { id: 'h8-s4', chinese: '这个多少钱？', pinyin: 'Zhè ge duōshao qián?', arabic: 'كم سعر هذا؟', english: 'How much is this?' },
      { id: 'h8-s5', chinese: '这个十块钱。', pinyin: 'Zhè ge shí kuài qián.', arabic: 'سعره عشرة يوان.', english: 'This is ten yuan.' },
    ],
    exercise: {
      id: 'hsk1-ex08',
      questions: [
        { id: 'h8-q1', type: 'multiple_choice', questionEn: '"想" expresses:', questionAr: '"想" تعبر عن:', options: [{ id: 'a', textEn: 'Ability', textAr: 'القدرة' }, { id: 'b', textEn: 'Desire / Want', textAr: 'الرغبة' }, { id: 'c', textEn: 'Need', textAr: 'الحاجة' }, { id: 'd', textEn: 'Permission', textAr: 'الإذن' }], correctOptionId: 'b' },
        { id: 'h8-q2', type: 'multiple_choice', questionEn: '"米饭" means:', questionAr: '"米饭" تعني:', options: [{ id: 'a', textEn: 'Noodles', textAr: 'نودلز' }, { id: 'b', textEn: 'Rice', textAr: 'أرز' }, { id: 'c', textEn: 'Bread', textAr: 'خبز' }, { id: 'd', textEn: 'Soup', textAr: 'شوربة' }], correctOptionId: 'b' },
        { id: 'h8-q3', type: 'multiple_choice', questionEn: '"多少钱" is used to ask about:', questionAr: '"多少钱" تُستخدم للسؤال عن:', options: [{ id: 'a', textEn: 'Quantity', textAr: 'الكمية' }, { id: 'b', textEn: 'Price', textAr: 'السعر' }, { id: 'c', textEn: 'Weight', textAr: 'الوزن' }, { id: 'd', textEn: 'Time', textAr: 'الوقت' }], correctOptionId: 'b' },
        { id: 'h8-q4', type: 'pinyin', questionEn: 'What is the Pinyin for "喝茶"?', questionAr: 'ما هو البينيين لـ "喝茶"؟', options: [{ id: 'a', textEn: 'hē chá', textAr: 'hē chá' }, { id: 'b', textEn: 'chī fàn', textAr: 'chī fàn' }, { id: 'c', textEn: 'mǎi dōngxi', textAr: 'mǎi dōngxi' }, { id: 'd', textEn: 'hē shuǐ', textAr: 'hē shuǐ' }], correctOptionId: 'a' },
        { id: 'h8-q5', type: 'fill_blank', questionEn: 'Complete: "我___买___个杯子。" (I want to buy a cup.)', questionAr: 'أكمل: "我___买___个杯子。" (أود شراء كوب.)', options: [{ id: 'a', textEn: '想, 一', textAr: '想, 一' }, { id: 'b', textEn: '会, 二', textAr: '会, 二' }, { id: 'c', textEn: '是, 三', textAr: '是, 三' }, { id: 'd', textEn: '很, 四', textAr: '很, 四' }], correctOptionId: 'a' },
      ],
    },
  },

  // ============================================================
  // LESSON 9: 你儿子在哪儿工作 Where does your son work
  // ============================================================
  {
    id: 'hsk1-09',
    levelId: 'level-1',
    order: 9,
    titleEn: 'Where Does Your Son Work',
    titleAr: 'أين يعمل ابنك',
    objectiveEn: 'Learn location words, prepositions, and job vocabulary',
    objectiveAr: 'تعلم كلمات المكان والحروف الجر ومفردات المهن',
    estimatedMinutes: 30,
    vocabulary: [
      { id: 'h9-v1', chinese: '小', pinyin: 'xiǎo', arabic: 'صغير', english: 'small / little' },
      { id: 'h9-v2', chinese: '猫', pinyin: 'māo', arabic: 'قطة', english: 'cat' },
      { id: 'h9-v3', chinese: '在', pinyin: 'zài', arabic: 'في / يوجد', english: 'at / in / to be at' },
      { id: 'h9-v4', chinese: '那儿', pinyin: 'nàr', arabic: 'هناك', english: 'there' },
      { id: 'h9-v5', chinese: '狗', pinyin: 'gǒu', arabic: 'كلب', english: 'dog' },
      { id: 'h9-v6', chinese: '椅子', pinyin: 'yǐzi', arabic: 'كرسي', english: 'chair' },
      { id: 'h9-v7', chinese: '下面', pinyin: 'xiàmiàn', arabic: 'تحت', english: 'below / under' },
      { id: 'h9-v8', chinese: '哪儿', pinyin: 'nǎr', arabic: 'أين', english: 'where' },
      { id: 'h9-v9', chinese: '工作', pinyin: 'gōngzuò', arabic: 'عمل / يعمل', english: 'work / job' },
      { id: 'h9-v10', chinese: '儿子', pinyin: 'érzi', arabic: 'ابن', english: 'son' },
      { id: 'h9-v11', chinese: '医院', pinyin: 'yīyuàn', arabic: 'مستشفى', english: 'hospital' },
      { id: 'h9-v12', chinese: '医生', pinyin: 'yīshēng', arabic: 'طبيب', english: 'doctor' },
      { id: 'h9-v13', chinese: '爸爸', pinyin: 'bàba', arabic: 'أب', english: 'father' },
    ],
    sentences: [
      { id: 'h9-s1', chinese: '你儿子在哪儿工作？', pinyin: 'Nǐ érzi zài nǎr gōngzuò?', arabic: 'أين يعمل ابنك؟', english: 'Where does your son work?' },
      { id: 'h9-s2', chinese: '他在医院工作。', pinyin: 'Tā zài yīyuàn gōngzuò.', arabic: 'يعمل في المستشفى.', english: 'He works at a hospital.' },
      { id: 'h9-s3', chinese: '猫在椅子下面。', pinyin: 'Māo zài yǐzi xiàmiàn.', arabic: 'القطة تحت الكرسي.', english: 'The cat is under the chair.' },
      { id: 'h9-s4', chinese: '我爸爸是医生。', pinyin: 'Wǒ bàba shì yīshēng.', arabic: 'أبي طبيب.', english: 'My father is a doctor.' },
      { id: 'h9-s5', chinese: '狗在哪儿？', pinyin: 'Gǒu zài nǎr?', arabic: 'أين الكلب؟', english: 'Where is the dog?' },
    ],
    exercise: {
      id: 'hsk1-ex09',
      questions: [
        { id: 'h9-q1', type: 'multiple_choice', questionEn: '"哪儿" means:', questionAr: '"哪儿" تعني:', options: [{ id: 'a', textEn: 'What', textAr: 'ماذا' }, { id: 'b', textEn: 'Where', textAr: 'أين' }, { id: 'c', textEn: 'Who', textAr: 'من' }, { id: 'd', textEn: 'When', textAr: 'متى' }], correctOptionId: 'b' },
        { id: 'h9-q2', type: 'multiple_choice', questionEn: '"医生" means:', questionAr: '"医生" تعني:', options: [{ id: 'a', textEn: 'Teacher', textAr: 'مدرس' }, { id: 'b', textEn: 'Doctor', textAr: 'طبيب' }, { id: 'c', textEn: 'Student', textAr: 'طالب' }, { id: 'd', textEn: 'Worker', textAr: 'عامل' }], correctOptionId: 'b' },
        { id: 'h9-q3', type: 'multiple_choice', questionEn: '"医院" means:', questionAr: '"医院" تعني:', options: [{ id: 'a', textEn: 'School', textAr: 'مدرسة' }, { id: 'b', textEn: 'Hospital', textAr: 'مستشفى' }, { id: 'c', textEn: 'Shop', textAr: 'متجر' }, { id: 'd', textEn: 'Office', textAr: 'مكتب' }], correctOptionId: 'b' },
        { id: 'h9-q4', type: 'pinyin', questionEn: 'What is the Pinyin for "工作"?', questionAr: 'ما هو البينيين لـ "工作"؟', options: [{ id: 'a', textEn: 'gōngzuò', textAr: 'gōngzuò' }, { id: 'b', textEn: 'yīshēng', textAr: 'yīshēng' }, { id: 'c', textEn: 'xuéxiào', textAr: 'xuéxiào' }, { id: 'd', textEn: 'yīyuàn', textAr: 'yīyuàn' }], correctOptionId: 'a' },
        { id: 'h9-q5', type: 'fill_blank', questionEn: 'Complete: "猫在椅子___。" (The cat is under the chair.)', questionAr: 'أكمل: "猫在椅子___。" (القطة تحت الكرسي.)', options: [{ id: 'a', textEn: '下面', textAr: '下面' }, { id: 'b', textEn: '上面', textAr: '上面' }, { id: 'c', textEn: '里面', textAr: '里面' }, { id: 'd', textEn: '前面', textAr: '前面' }], correctOptionId: 'a' },
      ],
    },
  },

  // ============================================================
  // LESSON 10: 我能坐这儿吗 Can I sit here
  // ============================================================
  {
    id: 'hsk1-10',
    levelId: 'level-1',
    order: 10,
    titleEn: 'Can I Sit Here',
    titleAr: 'هل أستطيع الجلوس هنا',
    objectiveEn: 'Learn position words, existence expressions, and permission requests',
    objectiveAr: 'تعلم كلمات الموضع وتعبيرات الوجود وطلب الإذن',
    estimatedMinutes: 30,
    vocabulary: [
      { id: 'h10-v1', chinese: '桌子', pinyin: 'zhuōzi', arabic: 'طاولة', english: 'table / desk' },
      { id: 'h10-v2', chinese: '上', pinyin: 'shàng', arabic: 'فوق / على', english: 'on / above' },
      { id: 'h10-v3', chinese: '电脑', pinyin: 'diànnǎo', arabic: 'حاسوب', english: 'computer' },
      { id: 'h10-v4', chinese: '和', pinyin: 'hé', arabic: 'و', english: 'and' },
      { id: 'h10-v5', chinese: '本', pinyin: 'běn', arabic: 'ـ (عداد الكتب)', english: '(measure word for books)' },
      { id: 'h10-v6', chinese: '里', pinyin: 'lǐ', arabic: 'داخل', english: 'inside' },
      { id: 'h10-v7', chinese: '前面', pinyin: 'qiánmiàn', arabic: 'أمام', english: 'front / ahead' },
      { id: 'h10-v8', chinese: '后面', pinyin: 'hòumiàn', arabic: 'خلف', english: 'back / behind' },
      { id: 'h10-v9', chinese: '这儿', pinyin: 'zhèr', arabic: 'هنا', english: 'here' },
      { id: 'h10-v10', chinese: '没有', pinyin: 'méiyǒu', arabic: 'ليس هناك / لا يوجد', english: 'do not have / there is no' },
      { id: 'h10-v11', chinese: '能', pinyin: 'néng', arabic: 'يستطيع', english: 'can / able to' },
      { id: 'h10-v12', chinese: '坐', pinyin: 'zuò', arabic: 'يجلس', english: 'to sit' },
    ],
    sentences: [
      { id: 'h10-s1', chinese: '我能坐这儿吗？', pinyin: 'Wǒ néng zuò zhèr ma?', arabic: 'هل أستطيع الجلوس هنا؟', english: 'Can I sit here?' },
      { id: 'h10-s2', chinese: '电脑在桌子上。', pinyin: 'Diànnǎo zài zhuōzi shàng.', arabic: 'الحاسوب على الطاولة.', english: 'The computer is on the table.' },
      { id: 'h10-s3', chinese: '书里有什么？', pinyin: 'Shū lǐ yǒu shénme?', arabic: 'ماذا يوجد داخل الكتاب؟', english: 'What is inside the book?' },
      { id: 'h10-s4', chinese: '前面没有椅子。', pinyin: 'Qiánmiàn méiyǒu yǐzi.', arabic: 'لا يوجد كرسي في الأمام.', english: 'There is no chair in front.' },
      { id: 'h10-s5', chinese: '我和他是同学。', pinyin: 'Wǒ hé tā shì tóngxué.', arabic: 'هو وأنا زملاء دراسة.', english: 'He and I are classmates.' },
    ],
    exercise: {
      id: 'hsk1-ex10',
      questions: [
        { id: 'h10-q1', type: 'multiple_choice', questionEn: '"能" expresses:', questionAr: '"能" تعبر عن:', options: [{ id: 'a', textEn: 'Desire', textAr: 'الرغبة' }, { id: 'b', textEn: 'Ability / Permission', textAr: 'القدرة / الإذن' }, { id: 'c', textEn: 'Necessity', textAr: 'الضرورة' }, { id: 'd', textEn: 'Habit', textAr: 'العادة' }], correctOptionId: 'b' },
        { id: 'h10-q2', type: 'multiple_choice', questionEn: '"电脑" means:', questionAr: '"电脑" تعني:', options: [{ id: 'a', textEn: 'Television', textAr: 'تلفاز' }, { id: 'b', textEn: 'Computer', textAr: 'حاسوب' }, { id: 'c', textEn: 'Phone', textAr: 'هاتف' }, { id: 'd', textEn: 'Radio', textAr: 'راديو' }], correctOptionId: 'b' },
        { id: 'h10-q3', type: 'multiple_choice', questionEn: '"和" means:', questionAr: '"和" تعني:', options: [{ id: 'a', textEn: 'Or', textAr: 'أو' }, { id: 'b', textEn: 'And', textAr: 'و' }, { id: 'c', textEn: 'But', textAr: 'لكن' }, { id: 'd', textEn: 'Because', textAr: 'لأن' }], correctOptionId: 'b' },
        { id: 'h10-q4', type: 'pinyin', questionEn: 'What is the Pinyin for "桌子"?', questionAr: 'ما هو البينيين لـ "桌子"؟', options: [{ id: 'a', textEn: 'zhuōzi', textAr: 'zhuōzi' }, { id: 'b', textEn: 'yǐzi', textAr: 'yǐzi' }, { id: 'c', textEn: 'diànnǎo', textAr: 'diànnǎo' }, { id: 'd', textEn: 'qiánmiàn', textAr: 'qiánmiàn' }], correctOptionId: 'a' },
        { id: 'h10-q5', type: 'fill_blank', questionEn: 'Complete: "我___坐这儿___？" (Can I sit here?)', questionAr: 'أكمل: "我___坐这儿___؟" (هل أستطيع الجلوس هنا؟)', options: [{ id: 'a', textEn: '能, 吗', textAr: '能, 吗' }, { id: 'b', textEn: '想, 呢', textAr: '想, 呢' }, { id: 'c', textEn: '会, 吧', textAr: '会, 吧' }, { id: 'd', textEn: '很, 吗', textAr: '很, 吗' }], correctOptionId: 'a' },
      ],
    },
  },

  // ============================================================
  // LESSON 11: 现在几点 What's the time now
  // ============================================================
  {
    id: 'hsk1-11',
    levelId: 'level-2',
    order: 11,
    titleEn: "What's the Time Now",
    titleAr: 'كم الساعة الآن',
    objectiveEn: 'Learn to tell time and use time-related expressions',
    objectiveAr: 'تعلم قراءة الوقت واستخدام تعبيرات الوقت',
    estimatedMinutes: 25,
    vocabulary: [
      { id: 'h11-v1', chinese: '现在', pinyin: 'xiànzài', arabic: 'الآن', english: 'now' },
      { id: 'h11-v2', chinese: '点', pinyin: 'diǎn', arabic: 'ساعة (وحدة)', english: "o'clock" },
      { id: 'h11-v3', chinese: '分', pinyin: 'fēn', arabic: 'دقيقة', english: 'minute' },
      { id: 'h11-v4', chinese: '早上', pinyin: 'zǎoshang', arabic: 'صباحاً', english: 'morning' },
      { id: 'h11-v5', chinese: '晚上', pinyin: 'wǎnshang', arabic: 'مساءً', english: 'evening' },
      { id: 'h11-v6', chinese: '睡', pinyin: 'shuì', arabic: 'ينام', english: 'to sleep' },
      { id: 'h11-v7', chinese: '觉', pinyin: 'jiào', arabic: 'نوم', english: 'sleep' },
      { id: 'h11-v8', chinese: '起床', pinyin: 'qǐ chuáng', arabic: 'يستيقظ', english: 'to get up' },
      { id: 'h11-v9', chinese: '吃早饭', pinyin: 'chī zǎofàn', arabic: 'يتناول الفطور', english: 'to have breakfast' },
      { id: 'h11-v10', chinese: '午饭', pinyin: 'wǔfàn', arabic: 'غداء', english: 'lunch' },
    ],
    sentences: [
      { id: 'h11-s1', chinese: '现在几点？', pinyin: 'Xiànzài jǐ diǎn?', arabic: 'كم الساعة الآن؟', english: "What's the time now?" },
      { id: 'h11-s2', chinese: '现在八点半。', pinyin: 'Xiànzài bā diǎn bàn.', arabic: 'الآن الثامنة والنصف.', english: "It's half past eight now." },
      { id: 'h11-s3', chinese: '早上你几点起床？', pinyin: 'Zǎoshang nǐ jǐ diǎn qǐ chuáng?', arabic: 'في أي ساعة تستيقظ صباحاً؟', english: 'What time do you get up in the morning?' },
      { id: 'h11-s4', chinese: '我六点起床。', pinyin: 'Wǒ liù diǎn qǐ chuáng.', arabic: 'أستيقظ في السادسة.', english: 'I get up at six.' },
      { id: 'h11-s5', chinese: '晚上你几点睡觉？', pinyin: 'Wǎnshang nǐ jǐ diǎn shuìjiào?', arabic: 'في أي ساعة تنام مساءً؟', english: 'What time do you sleep at night?' },
    ],
    exercise: {
      id: 'hsk1-ex11',
      questions: [
        { id: 'h11-q1', type: 'multiple_choice', questionEn: '"现在" means:', questionAr: '"现在" تعني:', options: [{ id: 'a', textEn: 'Yesterday', textAr: 'أمس' }, { id: 'b', textEn: 'Now', textAr: 'الآن' }, { id: 'c', textEn: 'Tomorrow', textAr: 'غداً' }, { id: 'd', textEn: 'Later', textAr: 'لاحقاً' }], correctOptionId: 'b' },
        { id: 'h11-q2', type: 'multiple_choice', questionEn: '"点" is used for:', questionAr: '"点" تُستخدم لـ:', options: [{ id: 'a', textEn: 'Minutes', textAr: 'الدقائق' }, { id: 'b', textEn: "O'clock", textAr: 'الساعة' }, { id: 'c', textEn: 'Seconds', textAr: 'الثواني' }, { id: 'd', textEn: 'Days', textAr: 'الأيام' }], correctOptionId: 'b' },
        { id: 'h11-q3', type: 'multiple_choice', questionEn: '"早上" means:', questionAr: '"早上" تعني:', options: [{ id: 'a', textEn: 'Afternoon', textAr: 'بعد الظهر' }, { id: 'b', textEn: 'Morning', textAr: 'صباحاً' }, { id: 'c', textEn: 'Evening', textAr: 'مساءً' }, { id: 'd', textEn: 'Night', textAr: 'ليلاً' }], correctOptionId: 'b' },
        { id: 'h11-q4', type: 'pinyin', questionEn: 'What is the Pinyin for "起床"?', questionAr: 'ما هو البينيين لـ "起床"؟', options: [{ id: 'a', textEn: 'qǐ chuáng', textAr: 'qǐ chuáng' }, { id: 'b', textEn: 'shuì jiào', textAr: 'shuì jiào' }, { id: 'c', textEn: 'qǐ lái', textAr: 'qǐ lái' }, { id: 'd', textEn: 'qǐ shēn', textAr: 'qǐ shēn' }], correctOptionId: 'a' },
        { id: 'h11-q5', type: 'fill_blank', questionEn: 'Complete: "___ 在几点？" (What time is it now?)', questionAr: 'أكمل: "___ 在几点؟" (كم الساعة الآن؟)', options: [{ id: 'a', textEn: '现在', textAr: '现在' }, { id: 'b', textEn: '今天', textAr: '今天' }, { id: 'c', textEn: '明天', textAr: '明天' }, { id: 'd', textEn: '昨天', textAr: '昨天' }], correctOptionId: 'a' },
      ],
    },
  },

  // ============================================================
  // LESSON 12: 明天天气怎么样 What will the weather be like
  // ============================================================
  {
    id: 'hsk1-12',
    levelId: 'level-2',
    order: 12,
    titleEn: 'What Will the Weather Be Like',
    titleAr: 'كيف سيكون الطقس غداً',
    objectiveEn: 'Learn weather vocabulary and descriptive expressions',
    objectiveAr: 'تعلم مفردات الطقس والتعبيرات الوصفية',
    estimatedMinutes: 25,
    vocabulary: [
      { id: 'h12-v1', chinese: '天气', pinyin: 'tiānqì', arabic: 'طقس', english: 'weather' },
      { id: 'h12-v2', chinese: '怎么样', pinyin: 'zěnmeyàng', arabic: 'كيف الحال', english: 'how about / what about' },
      { id: 'h12-v3', chinese: '太', pinyin: 'tài', arabic: 'جداً / أكثر من اللازم', english: 'too / overly' },
      { id: 'h12-v4', chinese: '热', pinyin: 'rè', arabic: 'حار', english: 'hot' },
      { id: 'h12-v5', chinese: '冷', pinyin: 'lěng', arabic: 'بارد', english: 'cold' },
      { id: 'h12-v6', chinese: '下雨', pinyin: 'xià yǔ', arabic: 'يمطر', english: 'to rain' },
      { id: 'h12-v7', chinese: '雪', pinyin: 'xuě', arabic: 'ثلج', english: 'snow' },
      { id: 'h12-v8', chinese: '风', pinyin: 'fēng', arabic: 'ريح', english: 'wind' },
      { id: 'h12-v9', chinese: '晴天', pinyin: 'qíngtiān', arabic: 'يوم مشمس', english: 'sunny day' },
      { id: 'h12-v10', chinese: '喜欢', pinyin: 'xǐhuan', arabic: 'يحب', english: 'to like' },
    ],
    sentences: [
      { id: 'h12-s1', chinese: '明天天气怎么样？', pinyin: 'Míngtiān tiānqì zěnmeyàng?', arabic: 'كيف سيكون الطقس غداً؟', english: 'What will the weather be like tomorrow?' },
      { id: 'h12-s2', chinese: '明天晴天。', pinyin: 'Míngtiān qíngtiān.', arabic: 'غداً يوم مشمس.', english: 'Tomorrow will be sunny.' },
      { id: 'h12-s3', chinese: '今天太热了。', pinyin: 'Jīntiān tài rè le.', arabic: 'اليوم الجو حار جداً.', english: "It's too hot today." },
      { id: 'h12-s4', chinese: '我喜欢下雪。', pinyin: 'Wǒ xǐhuan xià xuě.', arabic: 'أحب تساقط الثلج.', english: 'I like it when it snows.' },
      { id: 'h12-s5', chinese: '昨天刮风了。', pinyin: 'Zuótiān guā fēng le.', arabic: 'أمس هبّت الرياح.', english: 'It was windy yesterday.' },
    ],
    exercise: {
      id: 'hsk1-ex12',
      questions: [
        { id: 'h12-q1', type: 'multiple_choice', questionEn: '"天气" means:', questionAr: '"天气" تعني:', options: [{ id: 'a', textEn: 'Sky', textAr: 'سماء' }, { id: 'b', textEn: 'Weather', textAr: 'طقس' }, { id: 'c', textEn: 'Season', textAr: 'فصل' }, { id: 'd', textEn: 'Temperature', textAr: 'درجة الحرارة' }], correctOptionId: 'b' },
        { id: 'h12-q2', type: 'multiple_choice', questionEn: '"热" means:', questionAr: '"热" تعني:', options: [{ id: 'a', textEn: 'Cold', textAr: 'بارد' }, { id: 'b', textEn: 'Hot', textAr: 'حار' }, { id: 'c', textEn: 'Warm', textAr: 'دافئ' }, { id: 'd', textEn: 'Cool', textAr: 'معتدل' }], correctOptionId: 'b' },
        { id: 'h12-q3', type: 'multiple_choice', questionEn: '"喜欢" means:', questionAr: '"喜欢" تعني:', options: [{ id: 'a', textEn: 'Hate', textAr: 'يكره' }, { id: 'b', textEn: 'Like', textAr: 'يحب' }, { id: 'c', textEn: 'Want', textAr: 'يريد' }, { id: 'd', textEn: 'Need', textAr: 'يحتاج' }], correctOptionId: 'b' },
        { id: 'h12-q4', type: 'pinyin', questionEn: 'What is the Pinyin for "下雨"?', questionAr: 'ما هو البينيين لـ "下雨"؟', options: [{ id: 'a', textEn: 'xià yǔ', textAr: 'xià yǔ' }, { id: 'b', textEn: 'xià xuě', textAr: 'xià xuě' }, { id: 'c', textEn: 'guā fēng', textAr: 'guā fēng' }, { id: 'd', textEn: 'qíng tiān', textAr: 'qíng tiān' }], correctOptionId: 'a' },
        { id: 'h12-q5', type: 'fill_blank', questionEn: 'Complete: "今天太___了！" (It\'s too hot today!)', questionAr: 'أكمل: "今天太___了!" (اليوم حار جداً!)', options: [{ id: 'a', textEn: '热', textAr: '热' }, { id: 'b', textEn: '冷', textAr: '冷' }, { id: 'c', textEn: '好', textAr: '好' }, { id: 'd', textEn: '大', textAr: '大' }], correctOptionId: 'a' },
      ],
    },
  },

  // ============================================================
  // LESSON 13: 他在学做中国菜呢 He is learning to cook Chinese food
  // ============================================================
  {
    id: 'hsk1-13',
    levelId: 'level-2',
    order: 13,
    titleEn: 'He Is Learning to Cook Chinese Food',
    titleAr: 'إنه يتعلم طبخ الطعام الصيني',
    objectiveEn: 'Learn ongoing actions with 在...呢 and cooking vocabulary',
    objectiveAr: 'تعلم الأفعال المستمرة بـ 在...呢 ومفردات الطبخ',
    estimatedMinutes: 30,
    vocabulary: [
      { id: 'h13-v1', chinese: '来', pinyin: 'lái', arabic: 'يأتي', english: 'to come' },
      { id: 'h13-v2', chinese: '回', pinyin: 'huí', arabic: 'يعود', english: 'to return' },
      { id: 'h13-v3', chinese: '教室', pinyin: 'jiàoshì', arabic: 'فصل دراسي', english: 'classroom' },
      { id: 'h13-v4', chinese: '看见', pinyin: 'kànjiàn', arabic: 'يرى', english: 'to see' },
      { id: 'h13-v5', chinese: '开', pinyin: 'kāi', arabic: 'يفتح', english: 'to open' },
      { id: 'h13-v6', chinese: '关', pinyin: 'guān', arabic: 'يغلق', english: 'to close' },
      { id: 'h13-v7', chinese: '门', pinyin: 'mén', arabic: 'باب', english: 'door' },
      { id: 'h13-v8', chinese: '听', pinyin: 'tīng', arabic: 'يستمع', english: 'to listen' },
      { id: 'h13-v9', chinese: '音乐', pinyin: 'yīnyuè', arabic: 'موسيقى', english: 'music' },
      { id: 'h13-v10', chinese: '说话', pinyin: 'shuōhuà', arabic: 'يتكلم', english: 'to speak / to talk' },
    ],
    sentences: [
      { id: 'h13-s1', chinese: '他在学做中国菜呢。', pinyin: 'Tā zài xué zuò Zhōngguó cài ne.', arabic: 'إنه يتعلم طبخ الطعام الصيني.', english: 'He is learning to cook Chinese food.' },
      { id: 'h13-s2', chinese: '你在做什么？', pinyin: 'Nǐ zài zuò shénme?', arabic: 'ماذا تفعل؟', english: 'What are you doing?' },
      { id: 'h13-s3', chinese: '我在听音乐。', pinyin: 'Wǒ zài tīng yīnyuè.', arabic: 'أنا أستمع للموسيقى.', english: 'I am listening to music.' },
      { id: 'h13-s4', chinese: '请开门。', pinyin: 'Qǐng kāi mén.', arabic: 'افتح الباب من فضلك.', english: 'Please open the door.' },
      { id: 'h13-s5', chinese: '我看见他在教室。', pinyin: 'Wǒ kànjiàn tā zài jiàoshì.', arabic: 'رأيته في الفصل الدراسي.', english: 'I saw him in the classroom.' },
    ],
    exercise: {
      id: 'hsk1-ex13',
      questions: [
        { id: 'h13-q1', type: 'multiple_choice', questionEn: '"在...呢" indicates:', questionAr: '"在...呢" تشير إلى:', options: [{ id: 'a', textEn: 'Past action', textAr: 'فعل ماضي' }, { id: 'b', textEn: 'Ongoing action', textAr: 'فعل مستمر' }, { id: 'c', textEn: 'Future plan', textAr: 'خطة مستقبلية' }, { id: 'd', textEn: 'Ability', textAr: 'قدرة' }], correctOptionId: 'b' },
        { id: 'h13-q2', type: 'multiple_choice', questionEn: '"听音乐" means:', questionAr: '"听音乐" تعني:', options: [{ id: 'a', textEn: 'Watch TV', textAr: 'يشاهد التلفاز' }, { id: 'b', textEn: 'Listen to music', textAr: 'يستمع للموسيقى' }, { id: 'c', textEn: 'Read a book', textAr: 'يقرأ كتاباً' }, { id: 'd', textEn: 'Play games', textAr: 'يلعب ألعاباً' }], correctOptionId: 'b' },
        { id: 'h13-q3', type: 'multiple_choice', questionEn: '"开门" means:', questionAr: '"开门" تعني:', options: [{ id: 'a', textEn: 'Close the door', textAr: 'أغلق الباب' }, { id: 'b', textEn: 'Open the door', textAr: 'افتح الباب' }, { id: 'c', textEn: 'Knock on door', textAr: 'اقرع الباب' }, { id: 'd', textEn: 'Clean the door', textAr: 'نظف الباب' }], correctOptionId: 'b' },
        { id: 'h13-q4', type: 'pinyin', questionEn: 'What is the Pinyin for "教室"?', questionAr: 'ما هو البينيين لـ "教室"؟', options: [{ id: 'a', textEn: 'jiàoshì', textAr: 'jiàoshì' }, { id: 'b', textEn: 'jiàoshī', textAr: 'jiàoshī' }, { id: 'c', textEn: 'jiàoshì', textAr: 'jiàoshì' }, { id: 'd', textEn: 'jiàoxué', textAr: 'jiàoxué' }], correctOptionId: 'a' },
        { id: 'h13-q5', type: 'fill_blank', questionEn: 'Complete: "我在___音乐___。" (I am listening to music.)', questionAr: 'أكمل: "我在___音乐___。" (أنا أستمع للموسيقى.)', options: [{ id: 'a', textEn: '听, 呢', textAr: '听, 呢' }, { id: 'b', textEn: '看, 吗', textAr: '看, 吗' }, { id: 'c', textEn: '读, 吧', textAr: '读, 吧' }, { id: 'd', textEn: '写, 呢', textAr: '写, 呢' }], correctOptionId: 'a' },
      ],
    },
  },

  // ============================================================
  // LESSON 14: 她买了不少衣服 She has bought quite a few clothes
  // ============================================================
  {
    id: 'hsk1-14',
    levelId: 'level-2',
    order: 14,
    titleEn: 'She Has Bought Quite a Few Clothes',
    titleAr: 'لقد اشترت الكثير من الملابس',
    objectiveEn: 'Learn completed actions with 了 and shopping vocabulary',
    objectiveAr: 'تعلم الأفعال المكتملة بـ 了 ومفردات التسوق',
    estimatedMinutes: 30,
    vocabulary: [
      { id: 'h14-v1', chinese: '衣服', pinyin: 'yīfu', arabic: 'ملابس', english: 'clothes' },
      { id: 'h14-v2', chinese: '给', pinyin: 'gěi', arabic: 'يعطي', english: 'to give' },
      { id: 'h14-v3', chinese: '水果', pinyin: 'shuǐguǒ', arabic: 'فاكهة', english: 'fruit' },
      { id: 'h14-v4', chinese: '水', pinyin: 'shuǐ', arabic: 'ماء', english: 'water' },
      { id: 'h14-v5', chinese: '杯', pinyin: 'bēi', arabic: 'كوب (عداد)', english: '(measure word for cup)' },
      { id: 'h14-v6', chinese: '牛奶', pinyin: 'niúnǎi', arabic: 'حليب', english: 'milk' },
      { id: 'h14-v7', chinese: '咖啡', pinyin: 'kāfēi', arabic: 'قهوة', english: 'coffee' },
      { id: 'h14-v8', chinese: '点儿', pinyin: 'diǎnr', arabic: 'قليل', english: 'a little / a bit' },
      { id: 'h14-v9', chinese: '东西', pinyin: 'dōngxi', arabic: 'أشياء', english: 'things / stuff' },
      { id: 'h14-v10', chinese: '穿', pinyin: 'chuān', arabic: 'يرتدي', english: 'to wear' },
    ],
    sentences: [
      { id: 'h14-s1', chinese: '她买了不少衣服。', pinyin: 'Tā mǎi le bù shǎo yīfu.', arabic: 'لقد اشترت الكثير من الملابس.', english: 'She has bought quite a few clothes.' },
      { id: 'h14-s2', chinese: '我想喝杯咖啡。', pinyin: 'Wǒ xiǎng hē bēi kāfēi.', arabic: 'أود شرب كوب قهوة.', english: "I'd like a cup of coffee." },
      { id: 'h14-s3', chinese: '请给我一点儿水。', pinyin: 'Qǐng gěi wǒ yìdiǎnr shuǐ.', arabic: 'أعطني قليلاً من الماء من فضلك.', english: 'Please give me a little water.' },
      { id: 'h14-s4', chinese: '你穿什么衣服？', pinyin: 'Nǐ chuān shénme yīfu?', arabic: 'ماذا ترتدي؟', english: 'What clothes do you wear?' },
      { id: 'h14-s5', chinese: '我喜欢吃水果。', pinyin: 'Wǒ xǐhuan chī shuǐguǒ.', arabic: 'أحب أكل الفاكهة.', english: 'I like eating fruit.' },
    ],
    exercise: {
      id: 'hsk1-ex14',
      questions: [
        { id: 'h14-q1', type: 'multiple_choice', questionEn: '"了" after a verb indicates:', questionAr: '"了" بعد الفعل تشير إلى:', options: [{ id: 'a', textEn: 'Future action', textAr: 'فعل مستقبلي' }, { id: 'b', textEn: 'Completed action', textAr: 'فعل مكتمل' }, { id: 'c', textEn: 'Ongoing action', textAr: 'فعل مستمر' }, { id: 'd', textEn: 'Ability', textAr: 'قدرة' }], correctOptionId: 'b' },
        { id: 'h14-q2', type: 'multiple_choice', questionEn: '"衣服" means:', questionAr: '"衣服" تعني:', options: [{ id: 'a', textEn: 'Shoes', textAr: 'حذاء' }, { id: 'b', textEn: 'Clothes', textAr: 'ملابس' }, { id: 'c', textEn: 'Hat', textAr: 'قبعة' }, { id: 'd', textEn: 'Bag', textAr: 'حقيبة' }], correctOptionId: 'b' },
        { id: 'h14-q3', type: 'multiple_choice', questionEn: '"咖啡" means:', questionAr: '"咖啡" تعني:', options: [{ id: 'a', textEn: 'Tea', textAr: 'شاي' }, { id: 'b', textEn: 'Coffee', textAr: 'قهوة' }, { id: 'c', textEn: 'Milk', textAr: 'حليب' }, { id: 'd', textEn: 'Juice', textAr: 'عصير' }], correctOptionId: 'b' },
        { id: 'h14-q4', type: 'pinyin', questionEn: 'What is the Pinyin for "牛奶"?', questionAr: 'ما هو البينيين لـ "牛奶"؟', options: [{ id: 'a', textEn: 'niúnǎi', textAr: 'niúnǎi' }, { id: 'b', textEn: 'kāfēi', textAr: 'kāfēi' }, { id: 'c', textEn: 'shuǐguǒ', textAr: 'shuǐguǒ' }, { id: 'd', textEn: 'niúnǎi', textAr: 'niúnǎi' }], correctOptionId: 'a' },
        { id: 'h14-q5', type: 'fill_blank', questionEn: 'Complete: "她买___不少衣服___。" (She bought quite a few clothes.)', questionAr: 'أكمل: "她买___不少衣服___。" (اشترت الكثير من الملابس.)', options: [{ id: 'a', textEn: '了, 。', textAr: '了, 。' }, { id: 'b', textEn: '过, 吗', textAr: '过, 吗' }, { id: 'c', textEn: '在, 呢', textAr: '在, 呢' }, { id: 'd', textEn: '会, 。', textAr: '会, 。' }], correctOptionId: 'a' },
      ],
    },
  },

  // ============================================================
  // LESSON 15: 我是坐飞机来的 I came here by air
  // ============================================================
  {
    id: 'hsk1-15',
    levelId: 'level-2',
    order: 15,
    titleEn: 'I Came Here by Air',
    titleAr: 'أتيت هنا بالطائرة',
    objectiveEn: 'Learn transportation vocabulary and the 来/去 directional pattern',
    objectiveAr: 'تعلم مفردات المواصلات ونمط الاتجاه 来/去',
    estimatedMinutes: 30,
    vocabulary: [
      { id: 'h15-v1', chinese: '飞机', pinyin: 'fēijī', arabic: 'طائرة', english: 'airplane' },
      { id: 'h15-v2', chinese: '火车', pinyin: 'huǒchē', arabic: 'قطار', english: 'train' },
      { id: 'h15-v3', chinese: '出租车', pinyin: 'chūzūchē', arabic: 'سيارة أجرة', english: 'taxi' },
      { id: 'h15-v4', chinese: '公共汽车', pinyin: 'gōnggòng qìchē', arabic: 'حافلة', english: 'bus' },
      { id: 'h15-v5', chinese: '走路', pinyin: 'zǒu lù', arabic: 'يسير', english: 'to walk' },
      { id: 'h15-v6', chinese: '自行车', pinyin: 'zìxíngchē', arabic: 'دراجة', english: 'bicycle' },
      { id: 'h15-v7', chinese: '打电话', pinyin: 'dǎ diànhuà', arabic: 'يتصل بالهاتف', english: 'to make a phone call' },
      { id: 'h15-v8', chinese: '多', pinyin: 'duō', arabic: 'كم (طويل)', english: 'how much / many' },
      { id: 'h15-v9', chinese: '久', pinyin: 'jiǔ', arabic: 'طويل (وقت)', english: 'long (time)' },
      { id: 'h15-v10', chinese: '久等', pinyin: 'jiǔděng', arabic: 'انتظر طويلاً', english: 'to wait long' },
    ],
    sentences: [
      { id: 'h15-s1', chinese: '我是坐飞机来的。', pinyin: 'Wǒ shì zuò fēijī lái de.', arabic: 'أتيت بالطائرة.', english: 'I came here by plane.' },
      { id: 'h15-s2', chinese: '你怎么来的？', pinyin: 'Nǐ zěnme lái de?', arabic: 'كيف أتيت؟', english: 'How did you come?' },
      { id: 'h15-s3', chinese: '我坐公共汽车来的。', pinyin: 'Wǒ zuò gōnggòng qìchē lái de.', arabic: 'أتيت بالحافلة.', english: 'I came by bus.' },
      { id: 'h15-s4', chinese: '从北京到上海要多久？', pinyin: 'Cóng Běijīng dào Shànghǎi yào duō jiǔ?', arabic: 'كم الوقت من بكين إلى شنغهاي؟', english: 'How long does it take from Beijing to Shanghai?' },
      { id: 'h15-s5', chinese: '我给你打电话。', pinyin: 'Wǒ gěi nǐ dǎ diànhuà.', arabic: 'سأتصل بك.', english: "I'll call you." },
    ],
    exercise: {
      id: 'hsk1-ex15',
      questions: [
        { id: 'h15-q1', type: 'multiple_choice', questionEn: '"飞机" means:', questionAr: '"飞机" تعني:', options: [{ id: 'a', textEn: 'Train', textAr: 'قطار' }, { id: 'b', textEn: 'Airplane', textAr: 'طائرة' }, { id: 'c', textEn: 'Car', textAr: 'سيارة' }, { id: 'd', textEn: 'Bus', textAr: 'حافلة' }], correctOptionId: 'b' },
        { id: 'h15-q2', type: 'multiple_choice', questionEn: '"火车" means:', questionAr: '"火车" تعني:', options: [{ id: 'a', textEn: 'Bus', textAr: 'حافلة' }, { id: 'b', textEn: 'Train', textAr: 'قطار' }, { id: 'c', textEn: 'Ship', textAr: 'سفينة' }, { id: 'd', textEn: 'Bicycle', textAr: 'دراجة' }], correctOptionId: 'b' },
        { id: 'h15-q3', type: 'multiple_choice', questionEn: '"打电话" means:', questionAr: '"打电话" تعني:', options: [{ id: 'a', textEn: 'Write a letter', textAr: 'يكتب رسالة' }, { id: 'b', textEn: 'Make a phone call', textAr: 'يتصل بالهاتف' }, { id: 'c', textEn: 'Send email', textAr: 'يرسل بريداً' }, { id: 'd', textEn: 'Take photo', textAr: 'يلتقط صورة' }], correctOptionId: 'b' },
        { id: 'h15-q4', type: 'pinyin', questionEn: 'What is the Pinyin for "公共汽车"?', questionAr: 'ما هو البينيين لـ "公共汽车"؟', options: [{ id: 'a', textEn: 'gōnggòng qìchē', textAr: 'gōnggòng qìchē' }, { id: 'b', textEn: 'chūzūchē', textAr: 'chūzūchē' }, { id: 'c', textEn: 'zìxíngchē', textAr: 'zìxíngchē' }, { id: 'd', textEn: 'huǒchē', textAr: 'huǒchē' }], correctOptionId: 'a' },
        { id: 'h15-q5', type: 'fill_blank', questionEn: 'Complete: "我是坐___来___。" (I came by plane.)', questionAr: 'أكمل: "我是坐___来___。" (أتيت بالطائرة.)', options: [{ id: 'a', textEn: '飞机, 的', textAr: '飞机, 的' }, { id: 'b', textEn: '火车, 了', textAr: '火车, 了' }, { id: 'c', textEn: '汽车, 呢', textAr: '汽车, 呢' }, { id: 'd', textEn: '船, 吧', textAr: '船, 吧' }], correctOptionId: 'a' },
      ],
    },
  },
];

// Export vocabulary list
export const hsk1FullVocabulary = hsk1FullLessons.flatMap(l => l.vocabulary);

// Stroke order data for key characters
export const strokeOrderFull: Record<string, { strokes: number; order: string[] }> = {
  '你': { strokes: 7, order: ['撇', '竖', '撇', '横', '竖钩', '撇', '点'] },
  '好': { strokes: 6, order: ['撇点', '撇', '横', '横撇', '竖钩', '横'] },
  '我': { strokes: 7, order: ['撇', '横', '竖钩', '提', '斜钩', '撇', '点'] },
  '是': { strokes: 9, order: ['竖', '横折', '横', '横', '横', '竖', '横', '撇', '捺'] },
  '谢': { strokes: 12, order: ['点', '横折提', '撇', '竖', '横折钩', '横', '横', '横', '撇', '横', '竖钩', '点'] },
  '叫': { strokes: 5, order: ['竖', '横折', '横', '竖提', '竖'] },
  '什': { strokes: 4, order: ['撇', '竖', '横', '竖'] },
  '么': { strokes: 3, order: ['撇', '撇折', '点'] },
  '名': { strokes: 6, order: ['撇', '横撇', '点', '竖', '横折', '横'] },
  '字': { strokes: 6, order: ['点', '点', '横撇', '横撇', '竖钩', '横'] },
  '她': { strokes: 6, order: ['撇点', '撇', '横', '横折钩', '竖', '竖弯钩'] },
  '的': { strokes: 8, order: ['撇', '竖', '横折', '横', '横', '撇', '横折钩', '点'] },
  '家': { strokes: 10, order: ['点', '点', '横撇', '横', '撇', '弯钩', '撇', '撇', '撇', '捺'] },
  '会': { strokes: 6, order: ['撇', '捺', '横', '横', '撇折', '点'] },
  '说': { strokes: 9, order: ['点', '横折提', '点', '撇', '竖', '横折', '横', '撇', '竖弯钩'] },
  '喝': { strokes: 12, order: ['竖', '横折', '横', '竖', '横折', '横', '横', '撇', '横折钩', '撇', '点', '竖折'] },
  '吃': { strokes: 6, order: ['竖', '横折', '横', '撇', '横', '横折弯钩'] },
  '买': { strokes: 6, order: ['横撇', '点', '横', '横', '撇', '点'] },
  '在': { strokes: 6, order: ['横', '撇', '竖', '横', '竖', '横'] },
  '工': { strokes: 3, order: ['横', '竖', '横'] },
  '作': { strokes: 7, order: ['撇', '竖', '撇', '横', '竖', '横', '横'] },
  '坐': { strokes: 7, order: ['撇', '点', '撇', '点', '横', '竖', '横'] },
};
