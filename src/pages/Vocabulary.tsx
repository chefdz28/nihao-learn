import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Loader2 } from 'lucide-react';
import { useI18n } from '@/i18n';
import { fetchVocabulary } from '@/lib/dataService';
import AudioButton from '@/components/AudioButton';
import type { VocabRow } from '@/types/supabase';

export default function Vocabulary() {
  const { t } = useI18n();
  const [search, setSearch] = useState('');
  const [vocab, setVocab] = useState<VocabRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchVocabulary();
        setVocab(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = vocab.filter(v => {
    const q = search.toLowerCase();
    return v.chinese.includes(q) || v.pinyin.toLowerCase().includes(q) ||
      v.english.toLowerCase().includes(q) || v.arabic.includes(q);
  });

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8 pt-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-3 mb-8">
          <BookOpen size={28} className="text-[#FF3333]" />
          <h1 className="font-display font-black text-4xl text-white">{t('vocabulary.title')}</h1>
        </div>

        <div className="relative mb-8">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('vocabulary.search')}
            className="w-full h-14 pl-12 pr-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-[#666] focus:outline-none focus:border-[#FF3333]/50 text-lg"
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-white flex items-center justify-center gap-2"><Loader2 className="animate-spin" /> Loading...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                className="liquid-glass p-5 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.02, 0.5) }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-chinese text-4xl text-white">{item.chinese}</span>
                  <AudioButton text={item.chinese} size="sm" />
                </div>
                <p className="font-display text-sm text-[#a0a0a0] mb-1">{item.pinyin}</p>
                <p className="text-sm font-arabic" style={{ color: 'var(--color-text-secondary)' }}>{item.arabic}</p>
                <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>{item.english}</p>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>{t('vocabulary.no_results')}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
