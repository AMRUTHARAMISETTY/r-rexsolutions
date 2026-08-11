import React from 'react';
import { RRexLogo } from '../brand/RRexLogo';
import { Mail, MapPin, Globe, Share2, MessageCircle, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020711] border-t border-[#0060F0]/20 pt-16 pb-12 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <RRexLogo showText={true} showTagline={true} size="md" />
            <p className="text-sm text-[#94A3B8] max-w-sm leading-relaxed">
              R-REX Solutions transforms business ideas and requirements into intelligent, scalable, and reliable digital solutions through AI, software engineering, and cloud platforms.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-lg bg-[#06142B] border border-[#0060F0]/30 text-[#94A3B8] hover:text-[#00C0F0] hover:border-[#00C0F0] transition-colors" aria-label="LinkedIn">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-lg bg-[#06142B] border border-[#0060F0]/30 text-[#94A3B8] hover:text-[#00C0F0] hover:border-[#00C0F0] transition-colors" aria-label="GitHub">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-lg bg-[#06142B] border border-[#0060F0]/30 text-[#94A3B8] hover:text-[#00C0F0] hover:border-[#00C0F0] transition-colors" aria-label="Contact">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="font-mono-tech text-xs uppercase tracking-wider text-white mb-4">SERVICES</h4>
            <ul className="space-y-2.5 text-sm text-[#94A3B8]">
              <li><a href="#services" className="hover:text-[#00C0F0] transition-colors">AI Solutions & RAG</a></li>
              <li><a href="#services" className="hover:text-[#00C0F0] transition-colors">Software Engineering</a></li>
              <li><a href="#services" className="hover:text-[#00C0F0] transition-colors">Mobile Applications</a></li>
              <li><a href="#services" className="hover:text-[#00C0F0] transition-colors">ERP & Business Systems</a></li>
              <li><a href="#services" className="hover:text-[#00C0F0] transition-colors">Cloud & DevOps</a></li>
              <li><a href="#services" className="hover:text-[#00C0F0] transition-colors">Digital Growth & SEO</a></li>
            </ul>
          </div>

          {/* Col 4: Navigation */}
          <div>
            <h4 className="font-mono-tech text-xs uppercase tracking-wider text-white mb-4">COMPANY</h4>
            <ul className="space-y-2.5 text-sm text-[#94A3B8]">
              <li><a href="#about" className="hover:text-[#00C0F0] transition-colors">About R-REX</a></li>
              <li><a href="#process" className="hover:text-[#00C0F0] transition-colors">Methodology</a></li>
              <li><a href="#ecosystem" className="hover:text-[#00C0F0] transition-colors">Technology Ecosystem</a></li>
              <li><a href="#work" className="hover:text-[#00C0F0] transition-colors">Case Studies</a></li>
              <li><a href="#ai" className="hover:text-[#00C0F0] transition-colors">AI Architecture</a></li>
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div>
            <h4 className="font-mono-tech text-xs uppercase tracking-wider text-white mb-4">CONTACT</h4>
            <ul className="space-y-3 text-sm text-[#94A3B8]">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#00C0F0] shrink-0 mt-0.5" />
                <a href="mailto:contact@rrexsolutions.com" className="hover:text-[#00C0F0] transition-colors">
                  contact@rrexsolutions.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00C0F0] shrink-0 mt-0.5" />
                <span>Global Engineering Hub</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-[#0060F0]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <div className="font-mono-tech">
            © {new Date().getFullYear()} R-REX SOLUTIONS. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#06142B] border border-[#0060F0]/30 text-[#00C0F0] hover:bg-[#0060F0] hover:text-white transition-all cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
