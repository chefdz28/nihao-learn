import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { useI18n } from '@/i18n';
import { useAuth } from '@/contexts/AuthContext';

export default function Register() {
  const { t } = useI18n();
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 8) newErrors.password = 'Min 8 characters';
    if (form.password !== form.confirm) newErrors.confirm = 'Passwords do not match';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      await signUp(form.email, form.password, form.name);
      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setAuthError(message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center p-6">
        <motion.div
          className="liquid-glass-strong w-full max-w-[420px] p-10 text-center"
          style={{ borderRadius: 20 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 rounded-full bg-[#10b981]/15 flex items-center justify-center mx-auto mb-4">
            <UserPlus size={28} className="text-[#10b981]" />
          </div>
          <h2 className="font-display font-bold text-2xl text-white mb-2">Account Created!</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            Please check your email to confirm your account, then log in.
          </p>
          <Link to="/login" className="btn-primary w-full">Go to Login</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-72px)] flex">
      <div className="hidden lg:block w-1/2 relative">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover" poster="/images/lesson-greetings.jpg">
          <source src="/videos/video-classroom.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0a0a0a]/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-chinese text-8xl text-white/10">你好</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <motion.div
          className="liquid-glass-strong w-full max-w-[420px] p-10 md:p-12"
          style={{ borderRadius: 20 }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display font-extrabold text-3xl text-white mb-2">{t('auth.register.title')}</h1>
          <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>{t('auth.register.subtitle')}</p>

          {authError && (
            <div className="mb-4 p-3 rounded-lg bg-[#FF3333]/10 border border-[#FF3333]/30 text-[#FF3333] text-sm">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className={`w-full h-[52px] px-4 rounded-xl bg-white/[0.03] border ${errors.name ? 'border-[#FF3333]' : 'border-white/10'} text-white placeholder-[#666] focus:outline-none focus:border-[#FF3333]/50`}
                placeholder="Your name"
              />
              {errors.name && <p className="text-[#FF3333] text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">{t('auth.register.email')}</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className={`w-full h-[52px] px-4 rounded-xl bg-white/[0.03] border ${errors.email ? 'border-[#FF3333]' : 'border-white/10'} text-white placeholder-[#666] focus:outline-none focus:border-[#FF3333]/50`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-[#FF3333] text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">{t('auth.register.password')}</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className={`w-full h-[52px] px-4 pr-12 rounded-xl bg-white/[0.03] border ${errors.password ? 'border-[#FF3333]' : 'border-white/10'} text-white placeholder-[#666] focus:outline-none focus:border-[#FF3333]/50`}
                  placeholder="Min 8 characters"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666] hover:text-white">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-[#FF3333] text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Confirm Password</label>
              <input
                type="password"
                value={form.confirm}
                onChange={e => setForm({ ...form, confirm: e.target.value })}
                className={`w-full h-[52px] px-4 rounded-xl bg-white/[0.03] border ${errors.confirm ? 'border-[#FF3333]' : 'border-white/10'} text-white placeholder-[#666] focus:outline-none focus:border-[#FF3333]/50`}
                placeholder="Repeat password"
              />
              {errors.confirm && <p className="text-[#FF3333] text-xs mt-1">{errors.confirm}</p>}
            </div>

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              <UserPlus size={16} />
              {loading ? 'Creating account...' : t('auth.register.submit')}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: 'var(--color-text-secondary)' }}>
            Already have an account?{' '}
            <Link to="/login" className="text-[#FF3333] hover:text-[#ff5555] font-display font-semibold">Log In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
