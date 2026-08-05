import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { ProblemsWeSolveSection } from './components/sections/ProblemsWeSolveSection';
import { DevelopmentProcessSection } from './components/sections/DevelopmentProcessSection';
import { WhyChooseUsSection } from './components/sections/WhyChooseUsSection';
import { FeaturedProjectsSection } from './components/sections/FeaturedProjectsSection';
import { FaqSection } from './components/sections/FaqSection';
import { Footer } from './components/layout/Footer';
import { ContactModal } from './components/ui/ContactModal';
import { HomeShowcase } from './pages/HomeShowcase';

export function App() {
  const [currentView, setCurrentView] = useState<'hero' | 'home'>('hero');
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Sync browser hash / path navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.pathname === '/home' || window.location.hash === '#home') {
        setCurrentView('home');
      } else {
        setCurrentView('hero');
      }
    };

    handleHashChange();
    window.addEventListener('popstate', handleHashChange);
    return () => window.removeEventListener('popstate', handleHashChange);
  }, []);

  const navigateToHome = () => {
    setCurrentView('home');
    window.history.pushState(null, '', '/home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHero = () => {
    setCurrentView('hero');
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* Sticky Frosted Navigation Bar */}
      <Navbar
        onNavigateHome={navigateToHero}
        onOpenContactModal={() => setIsContactOpen(true)}
      />

      {/* Main View Router */}
      <main>
        {currentView === 'hero' ? (
          <>
            <HeroSection
              onExploreClick={navigateToHome}
              onContactClick={() => setIsContactOpen(true)}
            />
            <ServicesSection onOpenContact={() => setIsContactOpen(true)} />
            <ProblemsWeSolveSection />
            <DevelopmentProcessSection />
            <WhyChooseUsSection onOpenContact={() => setIsContactOpen(true)} />
            <FeaturedProjectsSection onOpenShowcase={navigateToHome} />
            <FaqSection />
          </>
        ) : (
          <HomeShowcase
            onBackToHero={navigateToHero}
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}
      </main>

      {/* Modern Footer */}
      <Footer
        onNavigateHome={navigateToHero}
        onOpenContactModal={() => setIsContactOpen(true)}
      />

      {/* Interactive Consultation Form Modal Dialog */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

export default App;
