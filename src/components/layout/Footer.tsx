import React from 'react';
import { Globe, Share2, MessageSquare } from 'lucide-react';

interface FooterProps {
  onNavigateHome?: () => void;
  onOpenContactModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateHome, onOpenContactModal }) => {
  return (
    <footer className="bg-[#030712] text-slate-400 border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[800px] h-64 bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          
          {/* Brand Info */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <div 
                onClick={onNavigateHome}
                className="flex items-center gap-3 cursor-pointer group mb-4 select-none"
                role="button"
                tabIndex={0}
                aria-label="R-REX SOLUTIONS Home"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-cyan-500 p-[1px] shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] transition-all duration-300">
                  <div className="w-full h-full bg-[#09090b] rounded-[11px] flex items-center justify-center overflow-hidden p-1">
                    <img 
                      src="/assets/r_rex_logo.jpg" 
                      alt="R-REX SOLUTIONS Logo" 
                      className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-black text-2xl text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    R-RE<span className="text-cyan-400">X</span> <span className="text-slate-100 font-extrabold">SOLUTIONS</span>
                  </span>
                  <span className="text-xs font-semibold tracking-widest text-cyan-400/90 uppercase -mt-0.5">
                    Ideas to Implementation
                  </span>
                </div>
              </div>
              
              <p className="text-slate-300 text-sm leading-relaxed max-w-sm mb-6">
                Ideas to Implementation. We design, build, and deploy custom software applications, AI solutions, ERP management platforms, and cloud systems for growing organizations.
              </p>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <a 
                href="#website" 
                aria-label="Company Website"
                className="p-2.5 rounded-full glass-panel-subtle hover:text-white hover:border-cyan-500/40 transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a 
                href="#social" 
                aria-label="Social Link"
                className="p-2.5 rounded-full glass-panel-subtle hover:text-white hover:border-cyan-500/40 transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a 
                href="#contact" 
                aria-label="Contact Us"
                className="p-2.5 rounded-full glass-panel-subtle hover:text-white hover:border-cyan-500/40 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column 1: Services */}
          <div className="md:col-span-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  AI Solutions & Chatbots
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  ERP & Management Systems
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Web & SaaS Applications
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Mobile App Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Cloud Infrastructure & Security
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Workflow Automation
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2: Resources & Company */}
          <div className="md:col-span-2">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-cyan-400 transition-colors">
                  Our Process
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-cyan-400 transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-400 transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Box Column */}
          <div className="md:col-span-3">
            <div className="glass-panel p-5 rounded-2xl border border-white/10">
              <h4 className="font-heading font-bold text-base text-white mb-2">
                Let's discuss your project
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                Partner with R-REX SOLUTIONS for reliable custom software and AI development.
              </p>
              <button
                onClick={onOpenContactModal}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-heading font-semibold text-xs tracking-wide shadow-md hover:shadow-blue-500/20 transition-all cursor-pointer"
              >
                Schedule Free Consultation
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} R-REX SOLUTIONS. All rights reserved. Ideas to Implementation.
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-slate-200 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
