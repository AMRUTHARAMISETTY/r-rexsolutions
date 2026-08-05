import React from 'react';
import { motion } from 'framer-motion';
import { HeroCanvasBg } from '../background/HeroCanvasBg';
import { Cpu, Terminal, ShieldCheck, Sparkles, Zap, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onContactClick,
}) => {
  return (
    <section 
      aria-label="R-REX SOLUTIONS Hero Section"
      className="relative min-h-screen w-full flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#030712]"
    >
      {/* Background Asset & Canvas Particle Field */}
      <HeroCanvasBg />

      {/* Main Centered Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center justify-center my-auto">
        
        {/* Official Brand Logo Showcase & Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Logo Emblem Icon Badge */}
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-60 blur-md group-hover:opacity-90 transition-opacity duration-500 animate-pulse-glow" />
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#030712] border border-cyan-500/40 p-2 flex items-center justify-center shadow-2xl">
              <img 
                src="/assets/r_rex_logo.jpg" 
                alt="R-REX SOLUTIONS Official Brand Logo"
                className="w-full h-full object-contain rounded-xl drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.15)] group hover:border-blue-400/60 transition-all duration-300">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
            </span>
            <span className="text-xs sm:text-sm font-medium tracking-wide text-blue-200">
              Custom Software & AI Solutions Agency
            </span>
            <span className="hidden sm:inline-block w-px h-3 bg-blue-500/40" />
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Ideas to Implementation
            </span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-white mb-6 select-none max-w-5xl"
        >
          Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-200">AI & Custom Software</span> That Grows Your Business
        </motion.h1>

        {/* Subheadline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-lg sm:text-2xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            We design, develop, and launch modern web applications, AI solutions, ERP systems, mobile apps, and automation platforms tailored to your business goals.
          </p>
        </motion.div>

        {/* Value Bullet Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm font-medium text-slate-300 mb-10"
        >
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-cyan-400 text-xs font-bold">✓</span>
            <span>Trusted Engineering</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-cyan-400 text-xs font-bold">✓</span>
            <span>Transparent Communication</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-cyan-400 text-xs font-bold">✓</span>
            <span>Affordable Execution</span>
          </div>
        </motion.div>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16"
        >
          <button
            onClick={onContactClick}
            type="button"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-heading font-semibold text-lg transition-all duration-200 shadow-xl shadow-blue-600/25 hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Start Your Project</span>
            <Zap className="w-5 h-5 text-cyan-300" />
          </button>

          <button
            onClick={onExploreClick}
            type="button"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel border border-slate-700/80 hover:border-slate-500 text-slate-200 hover:text-white font-heading font-semibold text-lg transition-all duration-200 text-center cursor-pointer"
          >
            View Our Work
          </button>
        </motion.div>

        {/* Floating Code & Architecture Teaser Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65 }}
          className="w-full max-w-4xl glass-panel rounded-2xl border border-white/10 p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-left relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700 pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs font-heading font-medium text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                R-REX Agency Overview — Strategy to Execution
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="p-3.5 rounded-xl bg-gray-950/80 border border-white/5 hover:border-blue-500/30 transition-colors">
              <div className="text-blue-400 font-heading font-bold mb-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" /> 01. DISCOVERY & STRATEGY
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Deconstruct business vision into a clear technical roadmap, UX prototypes, and transparent milestones.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-950/80 border border-white/5 hover:border-cyan-500/30 transition-colors">
              <div className="text-cyan-400 font-heading font-bold mb-1 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" /> 02. AGILE ENGINEERING
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Develop robust web applications, ERP management portals, mobile apps, and custom AI tools.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-950/80 border border-white/5 hover:border-purple-500/30 transition-colors">
              <div className="text-purple-400 font-heading font-bold mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> 03. LAUNCH & SUPPORT
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Secure cloud deployment, performance optimization, and dedicated long-term technical partnership.
              </p>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 cursor-pointer text-slate-400 hover:text-cyan-300 transition-colors"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll Down</span>
        <ArrowDown className="w-4 h-4 text-cyan-400" />
      </motion.div>
    </section>
  );
};
