import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Lesson from './pages/Lesson';
import Quiz from './pages/Quiz';
import Vocabulary from './pages/Vocabulary';
import Practice from './pages/Practice';
import Pronunciation from './pages/Pronunciation';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Results from './pages/Results';
import Certificate from './pages/Certificate';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import FAQPage from './pages/FAQPage';
import Admin from './pages/Admin';

// Protected route - requires authentication
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><div className="text-white">Loading...</div></div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

// Admin route - requires admin role
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><div className="text-white">Loading...</div></div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

// Auth redirect - if logged in, redirect to dashboard
function AuthRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><div className="text-white">Loading...</div></div>;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:levelId/:lessonId" element={<Lesson />} />
        <Route path="/quiz/:levelId" element={<Quiz />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/pronunciation" element={<Pronunciation />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQPage />} />

        {/* Auth routes - redirect if already logged in */}
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />

        {/* Protected student routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
        <Route path="/certificate" element={<ProtectedRoute><Certificate /></ProtectedRoute>} />

        {/* Admin only */}
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
      </Routes>
    </Layout>
  );
}
