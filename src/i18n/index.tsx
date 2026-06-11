import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type Language = 'en' | 'ar';

interface I18nContextType {
  lang: Language;
  dir: 'ltr' | 'rtl';
  t: (key: string) => string;
  setLang: (lang: Language) => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('nihao-lang');
    return (saved as Language) || 'en';
  });

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('nihao-lang', newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const t = useCallback((key: string) => {
    return translations[lang][key] || translations['en'][key] || key;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, dir, t, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.courses': 'Courses',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.login': 'Log In',
    'nav.getstarted': 'Get Started',
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'nav.logout': 'Log Out',
    'nav.vocabulary': 'Vocabulary',
    'nav.practice': 'Practice',
    'nav.quiz': 'Quiz',
    'nav.pronunciation': 'Pronunciation',
    'nav.writing': 'Writing',
    'nav.results': 'Results',
    'nav.certificate': 'Certificate',
    'nav.faq': 'FAQ',

    // Hero
    'hero.title': 'Learn Chinese the Easy Way',
    'hero.subtitle': 'Interactive lessons with audio, Pinyin, Arabic & English translations — designed for beginners and young learners',
    'hero.cta.start': 'Start Learning Free',
    'hero.cta.demo': 'Watch Demo',
    'hero.stats.levels': '8 Levels',
    'hero.stats.lessons': '120+ Lessons',
    'hero.stats.students': '5000+ Students',
    'hero.scroll': 'Scroll to explore',

    // Features
    'features.title': 'Everything You Need to Master Chinese',
    'features.subtitle': 'A complete learning toolkit designed for absolute beginners',
    'features.lessons.title': 'Interactive Lessons',
    'features.lessons.desc': 'Step-by-step lessons with Chinese, Pinyin, Arabic & English',
    'features.audio.title': 'Audio Pronunciation',
    'features.audio.desc': 'Listen to native pronunciation for every word and sentence',
    'features.visual.title': 'Visual Learning',
    'features.visual.desc': 'Images and illustrations to help memorize vocabulary',
    'features.writing.title': 'Writing Practice',
    'features.writing.desc': 'Practice writing characters with guided stroke order',
    'features.listening.title': 'Listening Exercises',
    'features.listening.desc': 'Train your ear with audio-based exercises',
    'features.quizzes.title': 'Quizzes & Tests',
    'features.quizzes.desc': 'Test your knowledge with multiple quiz types',
    'features.pronunciation.title': 'Pronunciation AI',
    'features.pronunciation.desc': 'Get instant feedback on your Chinese pronunciation',
    'features.progress.title': 'Progress Tracking',
    'features.progress.desc': 'Track your learning journey with detailed analytics',
    'features.certificates.title': 'Certificates',
    'features.certificates.desc': 'Earn certificates when you complete each level',

    // Levels
    'levels.title': 'Begin Your Journey',
    'levels.subtitle': '8 carefully designed levels to take you from zero to confident',
    'level.chinese-basics': 'Chinese Basics',
    'level.greetings': 'Greetings & Introductions',
    'level.numbers': 'Numbers & Colors',
    'level.family': 'Family & People',
    'level.school': 'School & Classroom',
    'level.food': 'Food & Drinks',
    'level.activities': 'Daily Activities',
    'level.conversations': 'Simple Conversations',
    'level.desc.chinese-basics': 'Learn the fundamentals of Chinese language',
    'level.desc.greetings': 'Master greetings and self-introductions',
    'level.desc.numbers': 'Count and describe colors in Chinese',
    'level.desc.family': 'Talk about family members and people',
    'level.desc.school': 'Navigate school and classroom vocabulary',
    'level.desc.food': 'Order food and describe drinks',
    'level.desc.activities': 'Describe your daily routine',
    'level.desc.conversations': 'Have simple conversations in Chinese',
    'level.start': 'Start Learning',
    'level.continue': 'Continue',
    'level.locked': 'Locked',
    'level.lessons': 'Lessons',

    // How It Works
    'how.title': 'How It Works',
    'how.step1.title': 'Choose a Lesson',
    'how.step1.desc': 'Browse our structured levels and pick a lesson that matches your current skills.',
    'how.step2.title': 'Learn with Audio & Visuals',
    'how.step2.desc': 'Listen to native pronunciation, view images, and read Pinyin, Arabic, and English translations.',
    'how.step3.title': 'Practice Writing & Speaking',
    'how.step3.desc': 'Trace characters on the writing canvas and test your pronunciation with AI feedback.',
    'how.step4.title': 'Take Quizzes & Earn Certificates',
    'how.step4.desc': 'Test your knowledge with interactive quizzes and earn certificates as you progress.',

    // Why Learn Chinese
    'why.title': 'Why Learn Chinese?',
    'why.reason1.title': 'Most Spoken Language',
    'why.reason1.desc': 'Chinese is spoken by over 1.3 billion people worldwide. Learning it opens doors to the world\'s largest language community.',
    'why.reason2.title': 'Cultural Gateway',
    'why.reason2.desc': 'Understand one of the world\'s oldest continuous civilizations — its art, philosophy, cuisine, and traditions.',
    'why.reason3.title': 'Career Advantage',
    'why.reason3.desc': 'China is the world\'s second-largest economy. Chinese language skills are in high demand across business, tech, and diplomacy.',
    'why.reason4.title': 'Brain Benefits',
    'why.reason4.desc': 'Learning Chinese characters enhances memory, visual processing, and cognitive flexibility — great for young minds.',

    // Progress
    'progress.title': 'Track Your Progress',
    'progress.subtitle': 'See how far you\'ve come and what lies ahead',
    'progress.lessons': 'Lessons Completed',
    'progress.streak': 'Current Streak',
    'progress.score': 'Average Score',
    'progress.time': 'Time Studied',
    'progress.view': 'View Full Dashboard',

    // Testimonials
    'testimonials.title': 'What Our Students Say',
    'testimonial.1.text': 'NiHao made learning Chinese so fun for my daughter. She loves the writing practice and the pronunciation tests!',
    'testimonial.1.name': 'Aisha M.',
    'testimonial.1.location': 'Dubai',
    'testimonial.2.text': 'As a complete beginner, I was intimidated by Chinese characters. But the step-by-step lessons with Pinyin and Arabic translations made it so easy.',
    'testimonial.2.name': 'Omar K.',
    'testimonial.2.location': 'Cairo',
    'testimonial.3.text': 'The best Chinese learning platform I\'ve found. The quizzes are challenging but fair, and I love earning certificates!',
    'testimonial.3.name': 'Sarah L.',
    'testimonial.3.location': 'London',

    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.q1': 'Is this platform suitable for absolute beginners?',
    'faq.a1': 'Yes! NiHao is designed specifically for students with zero prior knowledge of Chinese. Our Level 1 starts with the absolute basics.',
    'faq.q2': 'Do I need to know English to use this platform?',
    'faq.a2': 'No. All lessons include full Arabic translations, so Arabic speakers can learn entirely in their native language.',
    'faq.q3': 'How does the pronunciation test work?',
    'faq.a3': 'Our pronunciation test uses your device\'s microphone to record your voice. The system compares your pronunciation with the native audio and gives you a score with feedback.',
    'faq.q4': 'Can children use this platform?',
    'faq.a4': 'Absolutely! Our interface is designed to be child-friendly with large text, colorful illustrations, and gamified learning elements.',
    'faq.q5': 'Is the platform free?',
    'faq.a5': 'We offer a free tier with access to the first 2 levels. Premium subscription unlocks all levels and advanced features.',
    'faq.q6': 'How do I practice writing characters?',
    'faq.a6': 'Our interactive writing canvas lets you trace characters with your finger or mouse. A reference ghost character guides your stroke order.',
    'faq.q7': 'Do I get a certificate after completing levels?',
    'faq.a7': 'Yes! You\'ll receive a digital certificate for each level you complete, which you can download and share.',
    'faq.q8': 'Can I switch between Arabic and English?',
    'faq.a8': 'Yes, you can switch languages at any time using the language toggle in the header. Your progress is saved.',

    // CTA
    'cta.title': 'Ready to Start Learning Chinese?',
    'cta.subtitle': 'Join thousands of students already learning with NiHao.',
    'cta.create': 'Create Free Account',
    'cta.explore': 'Explore Courses',

    // Footer
    'footer.tagline': 'Making Chinese learning accessible for everyone.',
    'footer.quicklinks': 'Quick Links',
    'footer.learning': 'Learning',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Policy',
    'footer.copyright': 'All rights reserved.',

    // Courses Page
    'courses.title': 'Chinese Courses',
    'courses.subtitle': '8 levels to take you from zero to conversational Chinese',
    'courses.breadcrumb.home': 'Home',
    'courses.breadcrumb.courses': 'Courses',

    // Lesson Page
    'lesson.learning-objective': 'Learning Objective',
    'lesson.estimated-time': 'Estimated time',
    'lesson.vocabulary': 'Vocabulary',
    'lesson.examples': 'Example Sentences',
    'lesson.writing': 'Writing Practice',
    'lesson.writing.instruction': 'Draw the character following the stroke order',
    'lesson.writing.clear': 'Clear',
    'lesson.writing.show-answer': 'Show Answer',
    'lesson.writing.next': 'Next Character',
    'lesson.exercise': 'Practice Exercise',
    'lesson.question': 'Question',
    'lesson.of': 'of',
    'lesson.next-question': 'Next Question',
    'lesson.complete': 'Lesson Complete!',
    'lesson.score': 'Your Score',
    'lesson.continue': 'Continue to Next Lesson',

    // Quiz
    'quiz.title': 'Quiz',
    'quiz.question': 'Question',
    'quiz.submit': 'Submit Answer',
    'quiz.next': 'Next Question',
    'quiz.results': 'Quiz Results',
    'quiz.score': 'Your Score',
    'quiz.correct': 'Correct',
    'quiz.incorrect': 'Incorrect',
    'quiz.skipped': 'Skipped',
    'quiz.retake': 'Retake Quiz',
    'quiz.continue': 'Continue Learning',
    'quiz.review': 'Review Mistakes',

    // Pronunciation
    'pronunciation.title': 'Pronunciation Test',
    'pronunciation.listen': 'Listen',
    'pronunciation.record': 'Record',
    'pronunciation.recording': 'Recording...',
    'pronunciation.processing': 'Processing...',
    'pronunciation.excellent': 'Excellent!',
    'pronunciation.good': 'Good',
    'pronunciation.needs-practice': 'Needs Practice',
    'pronunciation.try-again': 'Try Again',
    'pronunciation.previous': 'Previous',
    'pronunciation.next': 'Next',

    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.continue': 'Continue where you left off',
    'dashboard.resume': 'Resume Lesson',
    'dashboard.recent': 'Recent Activity',
    'dashboard.view-all': 'View All',
    'dashboard.levels': 'Level Progress',
    'dashboard.achievements': 'Achievements',
    'dashboard.daily-goal': 'Daily Goal',
    'dashboard.study-more': 'Study more to reach your daily goal!',

    // Auth
    'auth.login.title': 'Welcome Back',
    'auth.login.subtitle': 'Sign in to continue your Chinese learning journey',
    'auth.login.email': 'Email',
    'auth.login.password': 'Password',
    'auth.login.remember': 'Remember me',
    'auth.login.forgot': 'Forgot password?',
    'auth.login.submit': 'Sign In',
    'auth.login.or': 'or',
    'auth.login.google': 'Continue with Google',
    'auth.login.no-account': "Don't have an account?",
    'auth.login.create': 'Create Account',

    'auth.register.title': 'Create Your Account',
    'auth.register.subtitle': 'Start learning Chinese for free today',
    'auth.register.name': 'Full Name',
    'auth.register.email': 'Email',
    'auth.register.password': 'Password',
    'auth.register.confirm-password': 'Confirm Password',
    'auth.register.age': 'Age (optional)',
    'auth.register.native-lang': 'Native Language',
    'auth.register.terms': 'I agree to the Terms of Service and Privacy Policy',
    'auth.register.submit': 'Create Account',
    'auth.register.has-account': 'Already have an account?',
    'auth.register.signin': 'Sign In',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.retry': 'Retry',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.show': 'Show',
    'common.hide': 'Hide',
    'common.more': 'Load More',
    'common.minutes': 'minutes',
    'common.hours': 'hours',
    'common.days': 'days',
    'common.lessons': 'lessons',
    'common.score': 'Score',
    'common.time': 'Time',
    'common.start': 'Start',
    'common.complete': 'Complete',
    'common.locked': 'Locked',
    'common.unlocked': 'Unlocked',
    'character.chinese': 'Chinese',
    'character.pinyin': 'Pinyin',
    'character.arabic': 'Arabic',
    'character.english': 'English',
    'character.audio': 'Audio',
    'character.image': 'Image',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.courses': 'الدورات',
    'nav.about': 'عن المنصة',
    'nav.blog': 'المدونة',
    'nav.contact': 'تواصل معنا',
    'nav.login': 'تسجيل الدخول',
    'nav.getstarted': 'ابدأ الآن',
    'nav.dashboard': 'لوحة التحكم',
    'nav.profile': 'الملف الشخصي',
    'nav.logout': 'تسجيل الخروج',
    'nav.vocabulary': 'المفردات',
    'nav.practice': 'التدريب',
    'nav.quiz': 'اختبار',
    'nav.pronunciation': 'النطق',
    'nav.writing': 'الكتابة',
    'nav.results': 'النتائج',
    'nav.certificate': 'الشهادة',
    'nav.faq': 'الأسئلة الشائعة',

    // Hero
    'hero.title': 'تعلم الصينية بسهولة',
    'hero.subtitle': 'دروس تفاعلية مع الصوت والبينيين والترجمات العربية والإنجليزية — مصممة للمبتدئين والصغار',
    'hero.cta.start': 'ابدأ التعلم مجاناً',
    'hero.cta.demo': 'شاهد العرض',
    'hero.stats.levels': '8 مستويات',
    'hero.stats.lessons': '+120 درس',
    'hero.stats.students': '+5000 طالب',
    'hero.scroll': 'مرر للأسفل للاستكشاف',

    // Features
    'features.title': 'كل ما تحتاجه لإتقان الصينية',
    'features.subtitle': 'مجموعة أدوات تعليمية كاملة مصممة للمبتدئين',
    'features.lessons.title': 'دروس تفاعلية',
    'features.lessons.desc': 'دروس خطوة بخطوة مع الصينية والبينيين والعربية والإنجليزية',
    'features.audio.title': 'النطق الصوتي',
    'features.audio.desc': 'استمع إلى النطق الأصلي لكل كلمة وجملة',
    'features.visual.title': 'التعلم المرئي',
    'features.visual.desc': 'صور ورسوم توضيحية لمساعدتك على حفظ المفردات',
    'features.writing.title': 'تمرين الكتابة',
    'features.writing.desc': 'تدرب على كتابة الحروف مع ترتيب الضربات الموجه',
    'features.listening.title': 'تمارين الاستماع',
    'features.listening.desc': 'درب أذنك مع تمارين تعتمد على الصوت',
    'features.quizzes.title': 'اختبارات',
    'features.quizzes.desc': 'اختبر معرفتك بأنواع متعددة من الاختبارات',
    'features.pronunciation.title': 'ذكاء النطق',
    'features.pronunciation.desc': 'احصل على ملاحظات فورية على نطقك الصيني',
    'features.progress.title': 'تتبع التقدم',
    'features.progress.desc': 'تتبع رحلتك التعليمية مع تحليلات مفصلة',
    'features.certificates.title': 'الشهادات',
    'features.certificates.desc': 'احصل على شهادات عند إكمال كل مستوى',

    // Levels
    'levels.title': 'ابدأ رحلتك',
    'levels.subtitle': '8 مستويات مصممة بعناية لتأخذك من الصفر إلى الثقة',
    'level.chinese-basics': 'أساسيات الصينية',
    'level.greetings': 'التحيات والتعارف',
    'level.numbers': 'الأرقام والألوان',
    'level.family': 'العائلة والأشخاص',
    'level.school': 'المدرسة والفصل',
    'level.food': 'الطعام والشراب',
    'level.activities': 'الأنشطة اليومية',
    'level.conversations': 'محادثات بسيطة',
    'level.desc.chinese-basics': 'تعلم أساسيات اللغة الصينية',
    'level.desc.greetings': 'أتقن التحيات وتقديم النفس',
    'level.desc.numbers': 'العد ووصف الألوان بالصينية',
    'level.desc.family': 'تحدث عن أفراد العائلة والأشخاص',
    'level.desc.school': 'تصفح مفردات المدرسة والفصل',
    'level.desc.food': 'اطلب الطعام وصف المشروبات',
    'level.desc.activities': 'صف روتينك اليومي',
    'level.desc.conversations': 'أجرِ محادثات بسيطة بالصينية',
    'level.start': 'ابدأ التعلم',
    'level.continue': 'استمر',
    'level.locked': 'مقفل',
    'level.lessons': 'دروس',

    // How It Works
    'how.title': 'كيف تعمل المنصة',
    'how.step1.title': 'اختر درساً',
    'how.step1.desc': 'تصفح مستوياتنا المنظمة واختر درساً يناسب مهاراتك الحالية.',
    'how.step2.title': 'تعلم بالصوت والصورة',
    'how.step2.desc': 'استمع إلى النطق الأصلي، شاهد الصور، واقرأ البينيين والترجمات العربية والإنجليزية.',
    'how.step3.title': 'تدرب على الكتابة والتحدث',
    'how.step3.desc': 'ارسم الحروف على لوحة الكتابة واختبر نطقك بملاحظات الذكاء الاصطناعي.',
    'how.step4.title': 'اختبر واكسب الشهادات',
    'how.step4.desc': 'اختبر معرفتك باختبارات تفاعلية واكسب شهادات كلما تقدمت.',

    // Why Learn Chinese
    'why.title': 'لماذا تتعلم الصينية؟',
    'why.reason1.title': 'أكثر لغة متحدثاً',
    'why.reason1.desc': 'تتحدث الصينية أكثر من 1.3 مليار شخص حول العالم. تعلمها يفتح أبواباً لأكبر مجتمع لغوي في العالم.',
    'why.reason2.title': 'بوابة ثقافية',
    'why.reason2.desc': 'افهم واحدة من أقدم الحضارات المستمرة في العالم — فنها وفلسفتها ومطبخها وتقاليدها.',
    'why.reason3.title': 'ميزة مهنية',
    'why.reason3.desc': 'الصين هي ثاني أكبر اقتصاد في العالم. مهارات اللغة الصينية مطلوبة بشدة في الأعمال والتكنولوجيا والدبلوماسية.',
    'why.reason4.title': 'فوائد للدماغ',
    'why.reason4.desc': 'تعلم الحروف الصينية يعزز الذاكرة والمعالجة البصرية والمرونة الإدراكية — رائع للعقول الصغيرة.',

    // Progress
    'progress.title': 'تتبع تقدمك',
    'progress.subtitle': 'شاهد كم وصلت وما ينتظرك',
    'progress.lessons': 'الدروس المكتملة',
    'progress.streak': 'السلسلة الحالية',
    'progress.score': 'متوسط الدرجات',
    'progress.time': 'وقت الدراسة',
    'progress.view': 'عرض لوحة التحكم الكاملة',

    // Testimonials
    'testimonials.title': 'ماذا يقول طلابنا',
    'testimonial.1.text': 'جعلت نهاو تعلم الصينية ممتعاً جداً لابنتي. إنها تحب تمرين الكتابة واختبارات النطق!',
    'testimonial.1.name': 'عائشة م.',
    'testimonial.1.location': 'دبي',
    'testimonial.2.text': 'كمبتدئ مطلق، كنت أخشى الحروف الصينية. لكن الدروس خطوة بخطوة مع البينيين والترجمات العربية جعلت الأمر سهلاً جداً.',
    'testimonial.2.name': 'عمر ك.',
    'testimonial.2.location': 'القاهرة',
    'testimonial.3.text': 'أفضل منصة تعليم صينية وجدتها. الاختبارات تحدية لكن عادلة، وأحب كسب الشهادات!',
    'testimonial.3.name': 'سارة ل.',
    'testimonial.3.location': 'لندن',

    // FAQ
    'faq.title': 'الأسئلة الشائعة',
    'faq.q1': 'هل هذه المنصة مناسبة للمبتدئين المطلقين؟',
    'faq.a1': 'نعم! نهاو مصممة خصيصاً للطلاب الذين ليس لديهم معرفة سابقة بالصينية. يبدأ المستوى الأول بالأساسيات المطلقة.',
    'faq.q2': 'هل أحتاج لمعرفة الإنجليزية لاستخدام هذه المنصة؟',
    'faq.a2': 'لا. جميع الدروس تشمل ترجمات عربية كاملة، لذا يمكن للناطقين بالعربية التعلم كلياً بلغتهم الأم.',
    'faq.q3': 'كيف يعمل اختبار النطق؟',
    'faq.a3': 'يستخدم اختبار النطق لدينا ميكروفون جهازك لتسجيل صوتك. يقارن النظام نطقك مع الصوت الأصلي ويعطيك درجة مع ملاحظات.',
    'faq.q4': 'هل يمكن للأطفال استخدام هذه المنصة؟',
    'faq.a4': 'بالتأكيد! واجهتنا مصممة لتكون مناسبة للأطفال مع نص كبير ورسوم توضيحية ملونة وعناصر تعليمية تفاعلية.',
    'faq.q5': 'هل المنصة مجانية؟',
    'faq.a5': 'نقدم خطة مجانية مع وصول إلى أول مستويين. الاشتراك المدفوع يفتح جميع المستويات والميزات المتقدمة.',
    'faq.q6': 'كيف أتدرب على كتابة الحروف؟',
    'faq.a6': 'تتيح لك لوحة الكتابة التفاعلية لدينا تتبع الحروف بإصبعك أو فأرتك. حرف مرجعي شفاف يرشدك في ترتيب الضربات.',
    'faq.q7': 'هل أحصل على شهادة بعد إكمال المستويات؟',
    'faq.a7': 'نعم! ستحصل على شهادة رقمية لكل مستوى تكمله، يمكنك تحميلها ومشاركتها.',
    'faq.q8': 'هل يمكنني التبديل بين العربية والإنجليزية؟',
    'faq.a8': 'نعم، يمكنك تبديل اللغة في أي وقت باستخدام مفتاح التبديل في الرأس. يتم حفظ تقدمك.',

    // CTA
    'cta.title': 'مستعد لبدء تعلم الصينية؟',
    'cta.subtitle': 'انضم إلى آلاف الطلاب الذين يتعلمون بالفعل مع نهاو.',
    'cta.create': 'إنشاء حساب مجاني',
    'cta.explore': 'استكشف الدورات',

    // Footer
    'footer.tagline': 'جعل تعلم الصينية متاحاً للجميع.',
    'footer.quicklinks': 'روابط سريعة',
    'footer.learning': 'التعلم',
    'footer.legal': 'قانوني',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    'footer.cookies': 'سياسة الكوكيز',
    'footer.copyright': 'جميع الحقوق محفوظة.',

    // Courses Page
    'courses.title': 'دورات اللغة الصينية',
    'courses.subtitle': '8 مستويات لتأخذك من الصفر إلى المحادثة بالصينية',
    'courses.breadcrumb.home': 'الرئيسية',
    'courses.breadcrumb.courses': 'الدورات',

    // Lesson Page
    'lesson.learning-objective': 'هدف التعلم',
    'lesson.estimated-time': 'الوقت المتوقع',
    'lesson.vocabulary': 'المفردات',
    'lesson.examples': 'جمل مثالية',
    'lesson.writing': 'تمرين الكتابة',
    'lesson.writing.instruction': 'ارسم الحرف باتباع ترتيب الضربات',
    'lesson.writing.clear': 'مسح',
    'lesson.writing.show-answer': 'إظهار الإجابة',
    'lesson.writing.next': 'الحرف التالي',
    'lesson.exercise': 'تمرين تطبيقي',
    'lesson.question': 'سؤال',
    'lesson.of': 'من',
    'lesson.next-question': 'السؤال التالي',
    'lesson.complete': 'اكتمل الدرس!',
    'lesson.score': 'درجتك',
    'lesson.continue': 'استمر إلى الدرس التالي',

    // Quiz
    'quiz.title': 'اختبار',
    'quiz.question': 'سؤال',
    'quiz.submit': 'إرسال الإجابة',
    'quiz.next': 'السؤال التالي',
    'quiz.results': 'نتائج الاختبار',
    'quiz.score': 'درجتك',
    'quiz.correct': 'صحيح',
    'quiz.incorrect': 'خطأ',
    'quiz.skipped': 'متخطى',
    'quiz.retake': 'إعادة الاختبار',
    'quiz.continue': 'استمر في التعلم',
    'quiz.review': 'مراجعة الأخطاء',

    // Pronunciation
    'pronunciation.title': 'اختبار النطق',
    'pronunciation.listen': 'استمع',
    'pronunciation.record': 'سجل',
    'pronunciation.recording': 'جاري التسجيل...',
    'pronunciation.processing': 'جاري المعالجة...',
    'pronunciation.excellent': 'ممتاز!',
    'pronunciation.good': 'جيد',
    'pronunciation.needs-practice': 'يحتاج تدريباً',
    'pronunciation.try-again': 'حاول مرة أخرى',
    'pronunciation.previous': 'السابق',
    'pronunciation.next': 'التالي',

    // Dashboard
    'dashboard.welcome': 'مرحباً بك',
    'dashboard.continue': 'استمر من حيث توقفت',
    'dashboard.resume': 'استئناف الدرس',
    'dashboard.recent': 'النشاط الأخير',
    'dashboard.view-all': 'عرض الكل',
    'dashboard.levels': 'تقدم المستويات',
    'dashboard.achievements': 'الإنجازات',
    'dashboard.daily-goal': 'الهدف اليومي',
    'dashboard.study-more': 'ادرس أكثر للوصول إلى هدفك اليومي!',

    // Auth
    'auth.login.title': 'مرحباً بعودتك',
    'auth.login.subtitle': 'سجل الدخول لمواصلة رحلتك في تعلم الصينية',
    'auth.login.email': 'البريد الإلكتروني',
    'auth.login.password': 'كلمة المرور',
    'auth.login.remember': 'تذكرني',
    'auth.login.forgot': 'نسيت كلمة المرور؟',
    'auth.login.submit': 'تسجيل الدخول',
    'auth.login.or': 'أو',
    'auth.login.google': 'المتابعة مع جوجل',
    'auth.login.no-account': 'ليس لديك حساب؟',
    'auth.login.create': 'إنشاء حساب',

    'auth.register.title': 'إنشاء حسابك',
    'auth.register.subtitle': 'ابدأ تعلم الصينية مجاناً اليوم',
    'auth.register.name': 'الاسم الكامل',
    'auth.register.email': 'البريد الإلكتروني',
    'auth.register.password': 'كلمة المرور',
    'auth.register.confirm-password': 'تأكيد كلمة المرور',
    'auth.register.age': 'العمر (اختياري)',
    'auth.register.native-lang': 'اللغة الأم',
    'auth.register.terms': 'أوافق على شروط الخدمة وسياسة الخصوصية',
    'auth.register.submit': 'إنشاء حساب',
    'auth.register.has-account': 'لديك حساب بالفعل؟',
    'auth.register.signin': 'تسجيل الدخول',

    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ ما',
    'common.retry': 'إعادة المحاولة',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.sort': 'ترتيب',
    'common.show': 'عرض',
    'common.hide': 'إخفاء',
    'common.more': 'تحميل المزيد',
    'common.minutes': 'دقيقة',
    'common.hours': 'ساعة',
    'common.days': 'أيام',
    'common.lessons': 'دروس',
    'common.score': 'الدرجة',
    'common.time': 'الوقت',
    'common.start': 'ابدأ',
    'common.complete': 'اكتمل',
    'common.locked': 'مقفل',
    'common.unlocked': 'مفتوح',
    'character.chinese': 'الصينية',
    'character.pinyin': 'البينيين',
    'character.arabic': 'العربية',
    'character.english': 'الإنجليزية',
    'character.audio': 'الصوت',
    'character.image': 'الصورة',
  }
};
