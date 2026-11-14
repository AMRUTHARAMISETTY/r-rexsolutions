import { useEffect } from 'react';
import { useReducedMotion } from './hooks/useReducedMotion';
import { CursorGlow } from './components/layout/CursorGlow';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { ManifestoSection } from './components/sections/ManifestoSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { CapabilitiesStrip } from './components/sections/CapabilitiesStrip';
import { ProcessSection } from './components/sections/ProcessSection';
import { WorkSection } from './components/sections/WorkSection';
import { WhyChooseUsSection } from './components/sections/WhyChooseUsSection';
import { WhoWeServeSection } from './components/sections/WhoWeServeSection';
import { AboutSection } from './components/sections/AboutSection';
import { InsightsSection } from './components/sections/InsightsSection';
import { LinkedInSection } from './components/sections/LinkedInSection';
import { FinalCtaSection } from './components/sections/FinalCtaSection';
import { ContactSection } from './components/sections/ContactSection';

export function App() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const pauseAnimations = () => document.documentElement.classList.toggle('tab-hidden', document.hidden);
    document.addEventListener('visibilitychange', pauseAnimations);
    return () => document.removeEventListener('visibilitychange', pauseAnimations);
  }, []);

  return (
    <>
      <CursorGlow />
      <ScrollProgress reducedMotion={reducedMotion} />
      <Navbar />
      <main>
        <HeroSection reducedMotion={reducedMotion} />
        <ManifestoSection reducedMotion={reducedMotion} />
        <ServicesSection reducedMotion={reducedMotion} />
        <ProcessSection reducedMotion={reducedMotion} />
        <CapabilitiesStrip />
        <WorkSection />
        <WhyChooseUsSection />
        <WhoWeServeSection />
        <AboutSection />
        <InsightsSection />
        <LinkedInSection />
        <FinalCtaSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
