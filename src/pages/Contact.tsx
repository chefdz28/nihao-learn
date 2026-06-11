import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Check } from 'lucide-react';
import { useI18n } from '@/i18n';

export default function Contact() {
  const { t } = useI18n(); void t;
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'general', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message.length >= 20) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-8">
      <motion.h1
        className="font-display font-black text-4xl text-white mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Get in Touch
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-6">
            <div className="liquid-glass p-6">
              <Mail size={24} className="text-[#FF3333] mb-3" />
              <h3 className="font-display font-bold text-white mb-1">Email</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>support@nihao-learn.com</p>
            </div>
            <div className="liquid-glass p-6">
              <MapPin size={24} className="text-[#FF3333] mb-3" />
              <h3 className="font-display font-bold text-white mb-1">Location</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Dubai, UAE · Cairo, Egypt · London, UK</p>
            </div>
            <div className="liquid-glass p-6">
              <h3 className="font-display font-bold text-white mb-3">Follow Us</h3>
              <div className="flex gap-3">
                {['X', 'IG', 'YT', 'TK'].map(s => (
                  <a key={s} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#a0a0a0] hover:text-[#FF3333] hover:border-[#FF3333]/30 transition-all text-xs font-display font-bold">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {submitted ? (
            <div className="liquid-glass-strong p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-[#10b981]/15 flex items-center justify-center mx-auto mb-4">
                <Check size={28} className="text-[#10b981]" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">Message Sent!</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>We will get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="liquid-glass p-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full h-[48px] px-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-[#666] focus:outline-none focus:border-[#FF3333]/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full h-[48px] px-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-[#666] focus:outline-none focus:border-[#FF3333]/50"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Subject</label>
                <select
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  className="w-full h-[48px] px-4 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#FF3333]/50"
                >
                  <option value="general" className="bg-[#1a1a1a]">General Inquiry</option>
                  <option value="support" className="bg-[#1a1a1a]">Technical Support</option>
                  <option value="billing" className="bg-[#1a1a1a]">Billing</option>
                  <option value="feedback" className="bg-[#1a1a1a]">Feedback</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Message</label>
                <textarea
                  required
                  minLength={20}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-[#666] focus:outline-none focus:border-[#FF3333]/50 resize-none"
                  placeholder="Your message (min 20 characters)"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                <Send size={16} />
                Send Message
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
