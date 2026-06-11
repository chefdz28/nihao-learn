import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ChevronRight, Play } from 'lucide-react';
import { useI18n } from '@/i18n';
import { fetchLevels, fetchLessons } from '@/lib/dataService';
import type { LevelRow, LessonRow } from '@/types/supabase';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } }),
};

export default function Courses() {
  const { t } = useI18n();
  const [levels, setLevels] = useState<LevelRow[]>([]);
  const [lessons, setLessons] = useState<LessonRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [lData, lsData] = await Promise.all([fetchLevels(), fetchLessons()]);
        setLevels(lData);
        setLessons(lsData);
      } catch (err) {
        console.error('Courses load error:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading courses...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--color-text-tertiary)' }}>
            <Link to="/" className="hover:text-white transition-colors">{t('courses.breadcrumb.home')}</Link>
            <ChevronRight size={14} />
            <span className="text-white">{t('courses.breadcrumb.courses')}</span>
          </div>
          <motion.h1 className="font-display font-black text-white mb-4" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.9 }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {t('courses.title')}
          </motion.h1>
          <motion.p className="text-lg max-w-[600px]" style={{ color: 'var(--color-text-secondary)' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
            {t('courses.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Level Grid */}
      <section className="pb-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
            {levels.map((level, i) => {
              const levelLessons = lessons.filter(l => l.level_id === level.id);
              const hasLessons = levelLessons.length > 0;
              const firstLesson = levelLessons[0];

              return (
                <motion.div key={level.id} className="liquid-glass overflow-hidden group" variants={fadeInUp} custom={i} whileHover={{ y: -4 }}>
                  <div className="relative h-[200px] overflow-hidden">
                    <img src={level.image_url || '/images/lesson-chinese-basics.jpg'} alt={level.title_en} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-[#FF3333] flex items-center justify-center font-display font-black text-white text-lg">{level.order_num}</div>
                    {level.is_premium && (
                      <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-[#0a0a0a]/80 flex items-center gap-1">
                        <Lock size={12} className="text-[#a0a0a0]" />
                        <span className="text-[10px] text-[#a0a0a0] font-display font-bold uppercase">Premium</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-lg text-white mb-1">{level.title_en}</h3>
                    <p className="text-xs mb-2 font-arabic" style={{ color: 'var(--color-text-secondary)' }}>{level.title_ar}</p>
                    <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>{level.description_en}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                        {levelLessons.length} {t('level.lessons')} · ~{level.estimated_hours}h
                      </span>
                      {hasLessons && firstLesson ? (
                        <Link to={`/courses/${level.id}/${firstLesson.id}`} className="btn-primary text-xs py-2 px-4" onClick={e => e.stopPropagation()}>
                          <Play size={12} /> {t('level.start')}
                        </Link>
                      ) : (
                        <span className="text-xs px-3 py-2 rounded-lg bg-white/5 text-[#666] font-display font-bold uppercase">{t('level.locked')}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
