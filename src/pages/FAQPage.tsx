import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Search, MessageCircle } from 'lucide-react';
import { useI18n } from '@/i18n';
import { faqItems } from '@/data/courses';

export default function FAQPage() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const filtered = faqItems.filter(item => {
    const q = t(item.q).toLowerCase();
    const a = t(item.a).toLowerCase();
    return q.includes(search.toLowerCase()) || a.includes(search.toLowerCase());
  });

  return (
    <div className="max-w-[800px] mx-auto px-6 py-8">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display font-black text-4xl text-white mb-4">{t('faq.title')}</h1>
        <div className="relative max-w-md mx-auto">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full h-[52px] pl-12 pr-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-[#666] focus:outline-none focus:border-[#FF3333]/50"
          />
        </div>
      </motion.div>

      <div className="space-y-3">
        {filtered.map((item, i) => (
          <motion.div
            key={i}
            className="liquid-glass overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className={`font-display font-semibold text-base ${openIndex === i ? 'text-[#FF3333]' : 'text-white'}`}>
                {t(item.q)}
              </span>
              <ChevronDown size={18} className={`text-[#a0a0a0] transition-transform duration-300 shrink-0 ml-4 ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: openIndex === i ? 300 : 0, opacity: openIndex === i ? 1 : 0 }}
            >
              <div className={`px-5 pb-5 text-sm leading-relaxed ${openIndex === i ? 'border-l-[3px] border-[#FF3333]' : ''}`} style={{ color: 'var(--color-text-secondary)' }}>
                {t(item.a)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#a0a0a0]">No questions found matching your search.</p>
        </div>
      )}

      {/* CTA */}
      <motion.div
        className="liquid-glass p-8 text-center mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <MessageCircle size={32} className="text-[#FF3333] mx-auto mb-4" />
        <h3 className="font-display font-bold text-xl text-white mb-2">Still have questions?</h3>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>Our team is happy to help you with anything.</p>
        <Link to="/contact" className="btn-primary text-sm py-2 px-6">Contact Us</Link>
      </motion.div>
    </div>
  );
}
