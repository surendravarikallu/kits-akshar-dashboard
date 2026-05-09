import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Lenis from 'lenis';
import SectionRenderer from './components/renderer/SectionRenderer';
import NotificationsTicker from './components/layout/NotificationsTicker';
import Navbar from './components/layout/Navbar';
import Footer from './components/Footer';
import SEO from './components/seo/SEO';
import useFetchPage from './hooks/useFetchPage';
import LoginPage from './pages/LoginPage';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import NavbarManager from './pages/admin/NavbarManager';

// Mock notifications data (can be moved to backend later)
const mockNotifications = [
  { id: 1, title: 'Admissions Open for 2026-2027 Academic Year. Apply Now!', link: '#' },
  { id: 2, title: 'KITS Tech Symposium scheduled for October 15th.', link: '#' },
  { id: 3, title: 'Congratulations to the CSE batch for 100% placement record.', link: '#' }
];

function Home() {
  const { data, loading, error } = useFetchPage('home');

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-kits-black">
        <div className="text-kits-gold font-display text-2xl animate-pulse">KITS Akshar...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-kits-black">
        <div className="text-red-500 font-display">Error loading site content. Please ensure backend is running.</div>
      </div>
    );
  }

  const sections = data?.sections || [];
  const footerContent = sections.find(s => (s.type === 'footer' || s.sectionType?.name === 'footer'))?.content;
  const mainSections = sections.filter(s => (s.type !== 'footer' && s.sectionType?.name !== 'footer'));

  return (
    <main className="min-h-screen bg-kits-black">
      <SEO 
        title={data?.title || "KITS Akshar — Homepage"} 
        description="Experience the fully dynamic institutional ecosystem of KITS Akshar." 
      />
      <SectionRenderer sections={mainSections} />
      <Footer content={footerContent} />
    </main>
  );
}

function AppContent() {
  const location = useLocation();
  const isHideLayout = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <div className="text-kits-white font-satoshi selection:bg-kits-gold selection:text-kits-black">
      {!isHideLayout && <NotificationsTicker notifications={mockNotifications} />}
      {!isHideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Admin Protected Routes */}
        <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/navbar" element={<AdminLayout><NavbarManager /></AdminLayout>} />
      </Routes>
    </div>
  );
}

function App() {
  // Initialize Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

export default App;
