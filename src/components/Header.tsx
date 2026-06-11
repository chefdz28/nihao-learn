import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, PenTool, Mic, LogOut, User, LayoutDashboard, Settings } from 'lucide-react';
import { useI18n } from '@/i18n';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { lang, t, setLang } = useI18n();
  const { user, isAuthenticated, isAdmin, signOut } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'nav.home' },
    { path: '/courses', label: 'nav.courses' },
    { path: '/about', label: 'nav.about' },
    { path: '/blog', label: 'nav.blog' },
    { path: '/contact', label: 'nav.contact' },
  ];

  const learningLinks = [
    { path: '/vocabulary', label: 'nav.vocabulary', icon: BookOpen },
    { path: '/practice', label: 'nav.practice', icon: PenTool },
    { path: '/pronunciation', label: 'nav.pronunciation', icon: Mic },
  ];

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        height: '72px',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="font-display font-extrabold text-2xl text-white tracking-tight">NiHao</span>
          <span className="font-chinese text-xs bg-[#FF3333] text-white rounded-full w-7 h-7 flex items-center justify-center">你好</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-display font-semibold text-base px-4 py-2 rounded-lg transition-colors ${
                isActive(link.path) ? 'text-[#FF3333]' : 'text-[#a0a0a0] hover:text-white'
              }`}
              style={isActive(link.path) ? { borderBottom: '2px solid #FF3333' } : undefined}
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="hidden sm:flex items-center liquid-glass rounded-lg p-1 gap-1">
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-md text-sm font-display font-semibold transition-all ${
                lang === 'en' ? 'bg-[#FF3333] text-white' : 'text-[#a0a0a0] hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('ar')}
              className={`px-3 py-1 rounded-md text-sm font-display font-semibold transition-all ${
                lang === 'ar' ? 'bg-[#FF3333] text-white' : 'text-[#a0a0a0] hover:text-white'
              }`}
            >
              عربي
            </button>
          </div>

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <div className="hidden lg:flex items-center gap-2">
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`font-display font-semibold text-sm px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                    isActive('/admin') ? 'text-[#FF3333] border-[#FF3333]/50' : 'text-[#a0a0a0] border-white/10 hover:text-white hover:border-[#FF3333]/50'
                  }`}
                >
                  <Settings size={14} /> Admin
                </Link>
              )}
              <Link
                to="/dashboard"
                className={`font-display font-semibold text-sm px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                  isActive('/dashboard') ? 'text-[#FF3333] border-[#FF3333]/50' : 'text-[#a0a0a0] border-white/10 hover:text-white hover:border-[#FF3333]/50'
                }`}
              >
                <LayoutDashboard size={14} /> {user?.fullName || 'Dashboard'}
              </Link>
              <button
                onClick={handleLogout}
                className="font-display font-semibold text-sm text-[#a0a0a0] hover:text-[#FF3333] px-3 py-2 rounded-lg border border-white/10 hover:border-[#FF3333]/30 transition-all"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <Link
                to="/login"
                className="font-display font-semibold text-sm text-[#a0a0a0] hover:text-white px-4 py-2 rounded-lg border border-white/10 hover:border-[#FF3333]/50 transition-all"
              >
                {t('nav.login')}
              </Link>
              <Link to="/register" className="btn-primary text-sm py-2 px-5">
                {t('nav.getstarted')}
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden icon-btn"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden liquid-glass-strong absolute top-[72px] left-4 right-4 p-6 flex flex-col gap-2"
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-display font-semibold text-lg py-3 px-4 rounded-lg transition-colors ${
                isActive(link.path) ? 'text-[#FF3333] bg-[#FF3333]/10' : 'text-white hover:bg-white/5'
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {t(link.label)}
            </Link>
          ))}
          <hr className="border-white/10 my-2" />
          {learningLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center gap-3 text-[#a0a0a0] hover:text-white py-2 px-4 rounded-lg hover:bg-white/5 transition-colors"
            >
              <link.icon size={18} />
              <span className="font-display font-semibold">{t(link.label)}</span>
            </Link>
          ))}

          {isAuthenticated && (
            <>
              <hr className="border-white/10 my-2" />
              <Link to="/dashboard" className="flex items-center gap-3 text-[#a0a0a0] hover:text-white py-2 px-4 rounded-lg hover:bg-white/5 transition-colors">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <Link to="/profile" className="flex items-center gap-3 text-[#a0a0a0] hover:text-white py-2 px-4 rounded-lg hover:bg-white/5 transition-colors">
                <User size={18} /> Profile
              </Link>
              {isAdmin && (
                <Link to="/admin" className="flex items-center gap-3 text-[#a0a0a0] hover:text-white py-2 px-4 rounded-lg hover:bg-white/5 transition-colors">
                  <Settings size={18} /> Admin Panel
                </Link>
              )}
              <button onClick={handleLogout} className="flex items-center gap-3 text-[#FF3333] py-2 px-4 rounded-lg hover:bg-[#FF3333]/10 transition-colors w-full text-left">
                <LogOut size={18} /> Logout
              </button>
            </>
          )}

          <hr className="border-white/10 my-2" />
          <div className="flex sm:hidden items-center gap-2 px-4">
            <button
              onClick={() => setLang('en')}
              className={`px-4 py-2 rounded-lg text-sm font-display font-semibold flex-1 ${
                lang === 'en' ? 'bg-[#FF3333] text-white' : 'text-[#a0a0a0] bg-white/5'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('ar')}
              className={`px-4 py-2 rounded-lg text-sm font-display font-semibold flex-1 ${
                lang === 'ar' ? 'bg-[#FF3333] text-white' : 'text-[#a0a0a0] bg-white/5'
              }`}
            >
              عربي
            </button>
          </div>

          {!isAuthenticated && (
            <div className="flex gap-2 mt-2 px-4">
              <Link to="/login" className="btn-secondary flex-1 text-sm py-3 justify-center">
                {t('nav.login')}
              </Link>
              <Link to="/register" className="btn-primary flex-1 text-sm py-3 justify-center">
                {t('nav.getstarted')}
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
