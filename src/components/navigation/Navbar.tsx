import React, { useState, useEffect } from 'react';
import { RRexLogo } from '../brand/RRexLogo';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'AI Solutions', href: '#ai' },
    { label: 'Process', href: '#process' },
    { label: 'Ecosystem', href: '#ecosystem' },
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#020711]/85 backdrop-blur-xl border-b border-[#0060F0]/20 shadow-[0_10px_30px_rgba(0,16,64,0.4)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <RRexLogo showText={true} showTagline={false} size="md" animated={true} />
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 bg-[#06142B]/50 backdrop-blur-md px-6 py-2 rounded-full border border-[#00C0F0]/15">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#94A3B8] hover:text-[#EAF4FF] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#00C0F0] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Primary CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenContact}
            className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2 group cursor-pointer"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#EAF4FF] p-2 rounded-lg bg-[#06142B] border border-[#0060F0]/30"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#020711]/95 backdrop-blur-2xl border-b border-[#00C0F0]/20 px-6 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-display font-medium text-[#94A3B8] hover:text-[#00C0F0] py-2 border-b border-[#0060F0]/10"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="btn-primary w-full py-3 mt-2 flex items-center justify-center gap-2 text-sm font-semibold"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
