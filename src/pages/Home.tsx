import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, Volume2, Image, PenTool, Headphones, ClipboardCheck,
  Mic, TrendingUp, Award, Globe, Landmark, Briefcase, Brain,
  ChevronDown, ChevronLeft, ChevronRight, Star, Lock
} from 'lucide-react';
import { useI18n } from '@/i18n';
import { levels, faqItems, testimonials } from '@/data/courses';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// Hero Section
function HeroSection() {
  const { t, dir } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number | null>(null);

  // Liquid Glass Shader - simplified but visually stunning
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const dpr = Math.min(window.devicePixelRatio, 1.5);
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Vertex shader
    const vsSource = `attribute vec2 a_pos; void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;
    // Fragment shader - liquid glass effect
    const fsSource = `precision highp float;
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.0 + vec2(100.0);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - u_res * 0.5) / min(u_res.x, u_res.y);
  float t = u_time * 0.8;

  // Mouse influence
  vec2 mUV = (u_mouse - u_res * 0.5) / min(u_res.x, u_res.y);
  float mDist = length(uv - mUV);
  float influence = exp(-mDist * mDist * 4.0);
  vec2 mouseOffset = (uv - mUV) * influence * 0.15;

  // Flow noise
  vec2 p = (uv + mouseOffset) * 2.5;
  float flow1 = fbm(p + t * 0.15);
  float flow2 = fbm(p * 1.3 + vec2(43.7, 28.1) + t * 0.12);
  vec2 flow = vec2(flow1, flow2);

  float glassSurface = fbm(p + flow + vec2(t * 0.08, t * 0.06));
  float gradientMag = length(flow);
  float thickness = 0.5 + 0.5 * smoothstep(0.2, 0.8, glassSurface);

  // Caustics
  float caust = fbm((uv + mouseOffset) * 2.8 + t * 0.18);
  caust = pow(caust, 2.2) * 0.4;

  // Color mixing
  vec3 warm1 = vec3(0.18, 0.08, 0.05);
  vec3 warm2 = vec3(0.25, 0.12, 0.06);
  vec3 cool1 = vec3(0.12, 0.08, 0.06);
  vec3 caustColor = mix(warm1, warm2, smoothstep(0.1, 0.5, caust));
  caustColor = mix(caustColor, cool1, smoothstep(0.4, 0.8, caust) * 0.3);

  float thicknessAtten = thickness * thickness;
  vec3 absorption = vec3(0.55, 0.28, 0.15) * thicknessAtten * 0.15;
  float caustIntensity = smoothstep(0.05, 0.4, caust) * 0.65 + smoothstep(0.3, 0.8, caust) * 0.35;
  caustIntensity *= (0.4 + thicknessAtten * 0.6);

  vec3 col = caustColor * caustIntensity + absorption;

  // Fresnel edge
  float edgeFresnel = pow(smoothstep(0.3, 1.0, gradientMag), 2.0);
  col += vec3(0.25, 0.15, 0.10) * edgeFresnel * thicknessAtten * 0.1;

  // Specular
  float spec = pow(fbm((uv + mouseOffset) * 8.0 + t * 0.2), 4.0);
  col += vec3(0.30, 0.20, 0.15) * spec * thicknessAtten * 0.15;

  // Ambient
  col += vec3(0.08, 0.06, 0.06) * thicknessAtten;
  col.r += 0.03 * thicknessAtten + 0.025;
  col.g += 0.008;

  // Vignette
  vec2 vigUV = gl_FragCoord.xy / u_res;
  float vig = 1.0 - smoothstep(0.4, 1.3, length(vigUV - 0.5) * 1.5);
  col *= 0.55 + 0.45 * vig;

  // Tone mapping
  col = col * (2.51 * col + 0.03) / (col * (2.43 * col + 0.59) + 0.14);
  col = pow(col, vec3(0.92));

  gl_FragColor = vec4(max(col, vec3(0.0)), 1.0);
}`;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_res');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    const startTime = performance.now();
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX * dpr, y: (canvas.offsetHeight - e.clientY) * dpr };
    };
    canvas.addEventListener('mousemove', onMouseMove);

    const render = () => {
      const time = (performance.now() - startTime) * 0.001;
      gl.uniform1f(uTime, time);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animRef.current = requestAnimationFrame(render);
    };
    animRef.current = requestAnimationFrame(render);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      canvas.removeEventListener('mousemove', onMouseMove);
      ro.disconnect();
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '100vh' }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
      />
      <div
        className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto px-6 pb-24"
        style={{ alignItems: dir === 'rtl' ? 'flex-end' : 'flex-start', textAlign: dir === 'rtl' ? 'right' : 'left' }}
      >
        {/* Floating Chinese character */}
        <motion.div
          className="absolute font-chinese pointer-events-none select-none"
          style={{
            top: '15%',
            [dir === 'rtl' ? 'right' : 'left']: '5%',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            color: 'rgba(255, 51, 51, 0.12)',
            textShadow: '0 0 60px rgba(255, 51, 51, 0.3)',
            animation: 'float 4s ease-in-out infinite, pulse-glow 3s ease-in-out infinite',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.5 }}
        >
          你好
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-display font-black text-white leading-[0.9] tracking-tight mb-6"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              textShadow: '0 4px 30px rgba(0,0,0,0.5)',
            }}
          >
            {t('hero.title')}
          </h1>
        </motion.div>

        <motion.p
          className="text-lg leading-relaxed mb-8 max-w-[560px]"
          style={{ color: 'var(--color-text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Link to="/register" className="btn-primary">
            {t('hero.cta.start')}
          </Link>
          <button className="btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
            {t('hero.cta.demo')}
          </button>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-6 text-sm font-medium"
          style={{ color: 'var(--color-text-tertiary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <span>{t('hero.stats.levels')}</span>
          <span className="text-[#FF3333]">•</span>
          <span>{t('hero.stats.lessons')}</span>
          <span className="text-[#FF3333]">•</span>
          <span>{t('hero.stats.students')}</span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <div className="w-0.5 h-10 bg-white/30 rounded-full overflow-hidden">
            <div className="w-full h-full bg-white origin-top" style={{ animation: 'scroll-line 2s ease-in-out infinite' }} />
          </div>
          <span className="text-[10px] text-[#666] uppercase tracking-wider">{t('hero.scroll')}</span>
        </motion.div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const { t } = useI18n();

  const features = [
    { icon: BookOpen, title: 'features.lessons.title', desc: 'features.lessons.desc', tint: 'rgba(255,51,51,0.03)' },
    { icon: Volume2, title: 'features.audio.title', desc: 'features.audio.desc', tint: 'rgba(59,130,246,0.03)' },
    { icon: Image, title: 'features.visual.title', desc: 'features.visual.desc', tint: 'rgba(16,185,129,0.03)' },
    { icon: PenTool, title: 'features.writing.title', desc: 'features.writing.desc', tint: 'rgba(139,92,246,0.03)' },
    { icon: Headphones, title: 'features.listening.title', desc: 'features.listening.desc', tint: 'rgba(245,158,11,0.03)' },
    { icon: ClipboardCheck, title: 'features.quizzes.title', desc: 'features.quizzes.desc', tint: 'rgba(255,51,51,0.03)' },
    { icon: Mic, title: 'features.pronunciation.title', desc: 'features.pronunciation.desc', tint: 'rgba(236,72,153,0.03)' },
    { icon: TrendingUp, title: 'features.progress.title', desc: 'features.progress.desc', tint: 'rgba(6,182,212,0.03)' },
    { icon: Award, title: 'features.certificates.title', desc: 'features.certificates.desc', tint: 'rgba(245,158,11,0.03)' },
  ];

  return (
    <section className="section-padding">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display font-extrabold text-white mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
          {t('features.title')}
        </h2>
        <p className="text-lg max-w-[600px] mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
          {t('features.subtitle')}
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            className="liquid-glass p-6 group cursor-default"
            style={{ background: f.tint }}
            variants={fadeInUp}
            custom={i}
            whileHover={{ y: -4 }}
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <f.icon size={28} className="text-[#FF3333]" />
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-2">{t(f.title)}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{t(f.desc)}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// Levels Section (Treadmill Gallery)
function LevelsSection() {
  const { t, dir } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: number) => {
    const newIndex = Math.max(0, Math.min(levels.length - 1, activeIndex + direction));
    setActiveIndex(newIndex);
    if (scrollRef.current) {
      const card = scrollRef.current.children[newIndex] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  return (
    <section className="py-24 overflow-hidden" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-extrabold text-white mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            {t('levels.title')}
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>{t('levels.subtitle')}</p>
        </motion.div>

        {/* Treadmill Gallery */}
        <div className="relative">
          <button
            onClick={() => scroll(dir === 'rtl' ? 1 : -1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 icon-btn hidden md:flex"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll(dir === 'rtl' ? -1 : 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 icon-btn hidden md:flex"
          >
            <ChevronRight size={20} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {levels.map((level, i) => (
              <motion.div
                key={level.id}
                className="snap-center shrink-0 w-[280px] md:w-[320px] liquid-glass overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                onClick={() => setActiveIndex(i)}
                whileHover={{ y: -4 }}
              >
                <div className="relative h-[200px] overflow-hidden">
                  <img
                    src={level.image}
                    alt={level.titleEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-[#FF3333] flex items-center justify-center font-display font-black text-white text-lg">
                    {level.order}
                  </div>
                  {level.isPremium && (
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0a0a0a]/80 flex items-center justify-center">
                      <Lock size={14} className="text-[#a0a0a0]" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-white mb-1">{t(`level.${level.id.replace('level-', level.id === 'level-1' ? 'chinese-basics' : level.id === 'level-2' ? 'greetings' : level.id === 'level-3' ? 'numbers' : level.id === 'level-4' ? 'family' : level.id === 'level-5' ? 'school' : level.id === 'level-6' ? 'food' : level.id === 'level-7' ? 'activities' : 'conversations')}`)}</h3>
                  <p className="text-xs mb-3 font-arabic" style={{ color: 'var(--color-text-secondary)' }}>{level.titleAr}</p>
                  <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>{t(`level.desc.${level.id.replace('level-', level.id === 'level-1' ? 'chinese-basics' : level.id === 'level-2' ? 'greetings' : level.id === 'level-3' ? 'numbers' : level.id === 'level-4' ? 'family' : level.id === 'level-5' ? 'school' : level.id === 'level-6' ? 'food' : level.id === 'level-7' ? 'activities' : 'conversations')}`)}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                      {level.lessonCount} {t('level.lessons')} · ~{level.estimatedHours}h
                    </span>
                    <Link
                      to={level.lessons.length > 0 ? `/courses/${level.id}/lesson-1` : '/courses'}
                      className="btn-primary text-xs py-2 px-4"
                    >
                      {t('level.start')}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {levels.map((level, i) => (
            <div key={level.id} className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full transition-all ${
                  i === activeIndex ? 'bg-[#FF3333] scale-125 shadow-[0_0_10px_rgba(255,51,51,0.5)]' :
                  i < activeIndex ? 'bg-[#10b981]' : 'bg-white/20'
                }`}
              />
              {i < levels.length - 1 && (
                <div className={`w-8 h-0.5 rounded ${i < activeIndex ? 'bg-[#10b981]/50' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// How It Works Section
function HowItWorksSection() {
  const { t } = useI18n();

  const steps = [
    { num: '01', title: 'how.step1.title', desc: 'how.step1.desc', img: '/images/how-it-works-1.png' },
    { num: '02', title: 'how.step2.title', desc: 'how.step2.desc', img: '/images/how-it-works-2.png' },
    { num: '03', title: 'how.step3.title', desc: 'how.step3.desc', img: '/images/how-it-works-3.png' },
    { num: '04', title: 'how.step4.title', desc: 'how.step4.desc', img: '/images/how-it-works-4.png' },
  ];

  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/images/lesson-school.jpg"
        >
          <source src="/videos/video-classroom.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/40 to-[#0a0a0a]/80" />
      </div>

      <div className="relative z-10 section-padding">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-extrabold text-white mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            {t('how.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="liquid-glass-strong p-8 text-center group"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              whileHover={{ y: -4 }}
            >
              <span className="font-display font-black text-5xl text-[#FF3333]/30 block mb-4">{step.num}</span>
              <img src={step.img} alt="" className="w-[120px] h-[120px] mx-auto mb-4 object-contain" />
              <h3 className="font-display font-bold text-xl text-white mb-3">{t(step.title)}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{t(step.desc)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why Learn Chinese Section
function WhyLearnSection() {
  const { t, dir } = useI18n();

  const reasons = [
    { icon: Globe, title: 'why.reason1.title', desc: 'why.reason1.desc', color: '#FF3333' },
    { icon: Landmark, title: 'why.reason2.title', desc: 'why.reason2.desc', color: '#10b981' },
    { icon: Briefcase, title: 'why.reason3.title', desc: 'why.reason3.desc', color: '#3b82f6' },
    { icon: Brain, title: 'why.reason4.title', desc: 'why.reason4.desc', color: '#8b5cf6' },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background character */}
      <div
        className="absolute font-chinese pointer-events-none select-none"
        style={{
          [dir === 'rtl' ? 'right' : 'left']: '-5%',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(8rem, 20vw, 16rem)',
          color: 'rgba(255, 51, 51, 0.04)',
          zIndex: 0,
        }}
      >
        学
      </div>

      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display font-extrabold text-white mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
          {t('why.title')}
        </h2>
      </motion.div>

      <div className="max-w-[800px] relative z-10">
        <motion.div
          className="space-y-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              className="liquid-glass p-6 flex items-start gap-5 group cursor-default"
              variants={fadeInUp}
              custom={i}
              whileHover={{ x: dir === 'rtl' ? -4 : 4 }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                style={{ background: `${reason.color}15` }}
              >
                <reason.icon size={24} style={{ color: reason.color }} />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white mb-1">{t(reason.title)}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{t(reason.desc)}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Progress Preview Section
function ProgressPreviewSection() {
  const { t } = useI18n();
  const stats = [
    { label: 'progress.lessons', value: 24, icon: BookOpen, color: '#ffffff' },
    { label: 'progress.streak', value: '7', suffix: ' days', icon: TrendingUp, color: '#FF3333' },
    { label: 'progress.score', value: '82%', icon: TrendingUp, color: '#10b981' },
    { label: 'progress.time', value: '12h 30m', icon: Award, color: '#f59e0b' },
  ];

  return (
    <section className="py-24" style={{
      background: 'var(--color-bg-secondary)',
      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
      backgroundSize: '24px 24px',
    }}>
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-extrabold text-white mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            {t('progress.title')}
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>{t('progress.subtitle')}</p>
        </motion.div>

        <motion.div
          className="liquid-glass-strong max-w-[900px] mx-auto p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <stat.icon size={24} style={{ color: stat.color }} className="mx-auto mb-2" />
                <div className="font-display font-black text-3xl text-white mb-1">{stat.value}{stat.suffix || ''}</div>
                <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{t(stat.label)}</div>
              </motion.div>
            ))}
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span style={{ color: 'var(--color-text-secondary)' }}>Overall Progress</span>
              <span className="text-white font-display font-bold">65%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: '#FF3333', boxShadow: '0 0 10px rgba(255,51,51,0.3)' }}
                initial={{ width: 0 }}
                whileInView={{ width: '65%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Lesson 1: Hello and Greetings', date: '2 days ago', score: 90 },
              { name: 'Lesson 2: Numbers 1-10', date: 'Yesterday', score: 85 },
              { name: 'Quiz: Level 1 Assessment', date: 'Today', score: 78 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div>
                  <div className="text-sm text-white">{item.name}</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>{item.date}</div>
                </div>
                <div
                  className="font-display font-bold text-sm px-3 py-1 rounded-full"
                  style={{
                    background: item.score >= 80 ? 'rgba(16,185,129,0.15)' : item.score >= 50 ? 'rgba(245,158,11,0.15)' : 'rgba(255,51,51,0.15)',
                    color: item.score >= 80 ? '#10b981' : item.score >= 50 ? '#f59e0b' : '#FF3333',
                  }}
                >
                  {item.score}%
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link to="/dashboard" className="btn-primary text-sm py-3 px-8">{t('progress.view')}</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const { t } = useI18n();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-padding">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display font-extrabold text-white mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
          {t('testimonials.title')}
        </h2>
      </motion.div>

      <div className="max-w-[800px] mx-auto">
        <motion.div
          className="liquid-glass p-8 md:p-12 relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="absolute top-4 left-6 font-display text-6xl text-[#FF3333] leading-none">"</span>

          <div className="min-h-[160px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-lg text-white leading-relaxed mb-6 italic">{t(testimonials[current].text)}</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-white text-sm"
                    style={{ background: testimonials[current].color }}
                  >
                    {testimonials[current].initial}
                  </div>
                  <div>
                    <div className="font-display font-bold text-white">{t(testimonials[current].name)}</div>
                    <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{t(testimonials[current].location)}</div>
                  </div>
                  <div className="ml-auto flex gap-1">
                    {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-[#f59e0b] text-[#f59e0b]" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-[#FF3333] w-6' : 'bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding" style={{ maxWidth: 800 }}>
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display font-extrabold text-white mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
          {t('faq.title')}
        </h2>
      </motion.div>

      <motion.div
        className="space-y-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {faqItems.map((item, i) => (
          <motion.div
            key={i}
            className="liquid-glass overflow-hidden"
            variants={fadeInUp}
            custom={i}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className={`font-display font-semibold text-base ${openIndex === i ? 'text-[#FF3333]' : 'text-white'}`}>
                {t(item.q)}
              </span>
              <ChevronDown
                size={18}
                className={`text-[#a0a0a0] transition-transform duration-300 shrink-0 ml-4 ${openIndex === i ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: openIndex === i ? 200 : 0, opacity: openIndex === i ? 1 : 0 }}
            >
              <div className={`px-5 pb-5 text-sm leading-relaxed ${openIndex === i ? 'border-l-[3px] border-[#FF3333]' : ''}`} style={{ color: 'var(--color-text-secondary)' }}>
                {t(item.a)}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const { t } = useI18n();

  return (
    <section className="py-24 px-6" style={{ background: 'linear-gradient(to bottom, var(--color-bg-primary), #0d0505)' }}>
      <motion.div
        className="liquid-glass-strong max-w-[800px] mx-auto p-12 md:p-16 text-center relative overflow-hidden"
        style={{ borderRadius: 24, animation: 'pulse-glow 3s ease-in-out infinite' }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Background decorative character */}
        <div
          className="absolute font-chinese pointer-events-none select-none"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '12rem',
            color: 'rgba(255, 51, 51, 0.04)',
          }}
        >
          开始
        </div>

        <h2 className="font-display font-black text-white mb-4 relative z-10" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
          {t('cta.title')}
        </h2>
        <p className="text-lg mb-8 relative z-10" style={{ color: 'var(--color-text-secondary)' }}>
          {t('cta.subtitle')}
        </p>
        <div className="flex flex-wrap justify-center gap-4 relative z-10">
          <Link to="/register" className="btn-primary">{t('cta.create')}</Link>
          <Link to="/courses" className="btn-secondary">{t('cta.explore')}</Link>
        </div>
      </motion.div>
    </section>
  );
}

// AnimatePresence wrapper for testimonial
import { AnimatePresence } from 'framer-motion';

// Main Home Page
export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <LevelsSection />
      <HowItWorksSection />
      <WhyLearnSection />
      <ProgressPreviewSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
