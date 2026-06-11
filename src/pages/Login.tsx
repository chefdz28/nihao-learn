import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useI18n } from '@/i18n';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const { t } = useI18n();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Min 6 characters';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      await signIn(email, password);
      // Navigation is handled by AuthRoute in App.tsx
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setAuthError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex">
      {/* Left - Video Background (Desktop) */}
      <div className="hidden lg:block w-1/2 relative">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/images/lesson-chinese-basics.jpg"
        >
          <source src="/videos/video-classroom.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0a0a0a]/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="font-chinese text-8xl text-white/10">学</span>
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          className="liquid-glass-strong w-full max-w-[420px] p-10 md:p-12"
          style={{ borderRadius: 20 }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <h1 className="font-display font-extrabold text-3xl text-white mb-2">{t('auth.login.title')}</h1>
          <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>{t('auth.login.subtitle')}</p>

          {authError && (
            <div className="mb-4 p-3 rounded-lg bg-[#FF3333]/10 border border-[#FF3333]/30 text-[#FF3333] text-sm">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white mb-2">{t('auth.login.email')}</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`w-full h-[52px] px-4 rounded-xl bg-white/[0.03] border ${errors.email ? 'border-[#FF3333]' : 'border-white/10'} text-white placeholder-[#666] focus:outline-none focus:border-[#FF3333]/50 transition-colors`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-[#FF3333] text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">{t('auth.login.password')}</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={`w-full h-[52px] px-4 pr-12 rounded-xl bg-white/[0.03] border ${errors.password ? 'border-[#FF3333]' : 'border-white/10'} text-white placeholder-[#666] focus:outline-none focus:border-[#FF3333]/50 transition-colors`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-[#FF3333] text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--color-text-secondary)' }}>
                <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 accent-[#FF3333]" />
                {t('auth.login.remember')}
              </label>
              <Link to="#" className="text-sm text-[#FF3333] hover:text-[#ff5555] transition-colors">{t('auth.login.forgot')}</Link>
            </div>

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              <LogIn size={16} />
              {loading ? 'Signing in...' : t('auth.login.submit')}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: 'var(--color-text-secondary)' }}>
            {t('auth.login.no-account')}{' '}
            <Link to="/register" className="text-[#FF3333] hover:text-[#ff5555] font-display font-semibold transition-colors">{t('auth.login.create')}</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
