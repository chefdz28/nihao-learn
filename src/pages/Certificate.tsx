import { motion } from 'framer-motion';
import { Download, Share2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n';

export default function Certificate() {
  const { t } = useI18n(); void t;
  const earned = true;
  const userName = 'Student Name';
  const levelName = 'Chinese Basics';
  const date = 'December 15, 2024';

  if (!earned) {
    return (
      <div className="max-w-[600px] mx-auto px-6 py-16 text-center">
        <div className="liquid-glass p-12">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#666]"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
          </div>
          <h2 className="font-display font-bold text-2xl text-white mb-2">Certificate Locked</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>Complete all lessons in this level to earn your certificate.</p>
          <Link to="/courses" className="btn-primary text-sm py-2 px-6">Continue Learning</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto px-6 py-8">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-[#a0a0a0] hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Certificate */}
        <div
          className="relative p-12 md:p-16 text-center"
          style={{
            background: 'url(/images/cert-bg.jpg) center/cover',
            borderRadius: 16,
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          <div className="absolute inset-0 bg-[#0a0a0a]/40 rounded-2xl" />
          <div className="relative z-10">
            <p className="font-display text-lg tracking-wider text-[#f59e0b] mb-2">Certificate of Completion</p>
            <div className="w-16 h-0.5 bg-[#f59e0b] mx-auto mb-6" />
            <p className="text-sm text-[#a0a0a0] mb-4">This certifies that</p>
            <h2 className="font-display font-black text-4xl text-white mb-4">{userName}</h2>
            <p className="text-sm text-[#a0a0a0] mb-4">has successfully completed</p>
            <h3 className="font-display font-bold text-2xl text-[#FF3333] mb-6">{levelName}</h3>
            <p className="text-sm text-[#a0a0a0] mb-8">{date}</p>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="w-24 h-0.5 bg-white/20 mb-2" />
                <p className="text-xs text-[#a0a0a0]">NiHao Team</p>
              </div>
            </div>
            <p className="text-xs text-[#666] mt-6">Cert ID: NH-2024-L1-001</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-8">
          <button className="btn-primary">
            <Download size={16} /> Download PDF
          </button>
          <button className="btn-secondary">
            <Share2 size={16} /> Share
          </button>
        </div>
      </motion.div>
    </div>
  );
}
