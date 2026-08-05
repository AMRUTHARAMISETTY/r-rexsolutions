import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigateHome?: () => void;
  onOpenContactModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateHome, onOpenContactModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 glass-nav shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <div 
            onClick={onNavigateHome}
            className="flex items-center gap-3 cursor-pointer group select-none"
            role="button"
            tabIndex={0}
            aria-label="R-REX SOLUTIONS Home"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-cyan-500 p-[1px] shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all duration-300">
              <div className="w-full h-full bg-[#030712] rounded-[11px] flex items-center justify-center overflow-hidden p-1">
                <img 
                  src="/assets/r_rex_logo.jpg" 
                  alt="R-REX SOLUTIONS Logo" 
                  className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                R-RE<span className="text-cyan-400">X</span> <span className="text-slate-100 font-extrabold">SOLUTIONS</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-cyan-400/90 uppercase -mt-0.5 font-semibold">
                Ideas to Implementation
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 glass-panel-subtle px-6 py-2 rounded-full border border-white/10">
            <a 
              href="#services" 
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            >
              Services
            </a>
            <a 
              href="#process" 
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            >
              Process
            </a>
            <a 
              href="#why-us" 
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            >
              Why Us
            </a>
            <a 
              href="#projects" 
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            >
              Projects
            </a>
            <a 
              href="#faq" 
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onOpenContactModal}
              className="px-5 py-2.5 rounded-full font-heading font-semibold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/20 hover:shadow-blue-500/40 transition-all duration-200 cursor-pointer flex items-center gap-2"
            >
              <span>Start Your Project</span>
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass-panel border-b border-white/10 px-4 pt-4 pb-6 mt-3"
        >
          <div className="flex flex-col gap-3">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5"
            >
              Services & Solutions
            </a>
            <a 
              href="#process" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5"
            >
              Development Process
            </a>
            <a 
              href="#why-us" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5"
            >
              Why Choose R-REX
            </a>
            <a 
              href="#projects" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5"
            >
              Case Studies
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5"
            >
              Frequently Asked Questions
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContactModal?.();
              }}
              className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center justify-center gap-2"
            >
              <span>Start Your Project</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};
