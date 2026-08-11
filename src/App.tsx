import { useState } from 'react';
import { GlobalCanvas } from './three/GlobalCanvas';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { WhatWeBuildSection } from './components/sections/WhatWeBuildSection';
import { AiSection } from './components/sections/AiSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { WhyRRexSection } from './components/sections/WhyRRexSection';
import { EcosystemSection } from './components/sections/EcosystemSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { AboutSection } from './components/sections/AboutSection';
import { CtaSection } from './components/sections/CtaSection';
import { FinaleSection } from './components/sections/FinaleSection';
import { Footer } from './components/footer/Footer';
import { ContactModal } from './components/ui/ContactModal';
import { useScrollProgress } from './hooks/useScrollProgress';

export function App() {
  const { scrollProgress } = useScrollProgress();
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [isDisintegrated, setIsDisintegrated] = useState(false);

  const handleOpenContact = (serviceName?: string) => {
    if (serviceName) setSelectedService(serviceName);
    setContactOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#020711] text-[#EAF4FF] font-sans selection:bg-[#0060F0] selection:text-white">
      {/* Real-Time Three.js Global Background Canvas */}
      <GlobalCanvas
        scrollProgress={scrollProgress}
        isDisintegrated={isDisintegrated}
      />

      {/* Navigation Header */}
      <Navbar onOpenContact={() => handleOpenContact()} />

      {/* Main Page Content Sections */}
      <main className="relative z-10">
        <HeroSection onOpenContact={() => handleOpenContact()} />
        <WhatWeBuildSection onSelectService={(svc) => handleOpenContact(svc)} />
        <AiSection onOpenContact={() => handleOpenContact('AI Solutions & Automation')} />
        <ProcessSection />
        <WhyRRexSection />
        <EcosystemSection />
        <ProjectsSection />
        <AboutSection />
        <CtaSection onOpenContact={() => handleOpenContact()} />
        <FinaleSection
          isDisintegrated={isDisintegrated}
          onToggleDisintegration={() => setIsDisintegrated(!isDisintegrated)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Contact / Project Kickoff Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
}

export default App;
