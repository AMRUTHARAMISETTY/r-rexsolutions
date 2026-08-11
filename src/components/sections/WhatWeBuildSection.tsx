import React from 'react';
import { Bot, Code2, Smartphone, Building2, Cloud, TrendingUp, ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  features: string[];
}

const services: ServiceItem[] = [
  {
    id: 'ai-solutions',
    number: '01',
    title: 'AI SOLUTIONS & AUTOMATION',
    icon: Bot,
    description: 'Intelligent AI agents, custom RAG architecture, and automated workflows engineered to transform operations.',
    features: ['AI Agents & Assistants', 'RAG & Knowledge Systems', 'Workflow Automation', 'AI Model Integration'],
  },
  {
    id: 'software-engineering',
    number: '02',
    title: 'SOFTWARE ENGINEERING',
    icon: Code2,
    description: 'High-performance web applications, scalable SaaS platforms, and resilient microservice backends.',
    features: ['Modern Web Applications', 'SaaS Platform Architecture', 'Enterprise Backends & APIs', 'High-Scale Databases'],
  },
  {
    id: 'mobile-applications',
    number: '03',
    title: 'MOBILE APPLICATIONS',
    icon: Smartphone,
    description: 'Native and cross-platform mobile ecosystems built for fluid UX, offline capability, and high performance.',
    features: ['iOS & Android Apps', 'Cross-Platform Frameworks', 'Mobile Ecosystem Integration', 'Real-Time Sync'],
  },
  {
    id: 'erp-business-systems',
    number: '04',
    title: 'ERP & BUSINESS SYSTEMS',
    icon: Building2,
    description: 'Custom ERP, CRM, and business intelligence systems synchronized into a single unified dashboard.',
    features: ['Custom ERP & CRM', 'Institution Management', 'Process Automation', 'Business Analytics'],
  },
  {
    id: 'cloud-integration',
    number: '05',
    title: 'CLOUD & INTEGRATION',
    icon: Cloud,
    description: 'Cloud architecture, secure API integrations, automated CI/CD pipelines, and DevOps infrastructure.',
    features: ['Cloud Infrastructure', 'API Integrations & Mesh', 'DevOps & CI/CD', 'Security & Compliance'],
  },
  {
    id: 'digital-growth',
    number: '06',
    title: 'DIGITAL GROWTH',
    icon: TrendingUp,
    description: 'Technical SEO, conversion rate optimization, data analytics pipelines, and digital performance strategy.',
    features: ['Performance Optimization', 'Technical SEO & Analytics', 'Conversion Rate Optimization', 'Digital Ecosystems'],
  },
];

interface WhatWeBuildSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const WhatWeBuildSection: React.FC<WhatWeBuildSectionProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#0060F0]/15 pb-8">
          <div>
            <div className="font-mono-tech text-xs text-[#00C0F0] uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00C0F0] animate-pulse"></span>
              CORE CAPABILITIES
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
              WHAT WE BUILD
            </h2>
          </div>
          <p className="text-[#94A3B8] max-w-md text-sm sm:text-base font-normal">
            Technology should solve real problems. We design and engineer systems that create measurable business value.
          </p>
        </div>

        {/* 6 Interactive Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service.title)}
                className="rrex-glass-card group p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between cursor-pointer border border-[#00C0F0]/10 hover:border-[#00C0F0]/40 transition-all duration-300"
              >
                {/* Top Travelling Gradient Line Accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00C0F0] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div>
                  {/* Card Header: Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono-tech text-sm font-semibold text-[#00C0F0] bg-[#001040] px-3 py-1 rounded-md border border-[#0060F0]/30">
                      {service.number}
                    </span>
                    <div className="p-3 rounded-xl bg-[#06142B] border border-[#0060F0]/20 text-[#00C0F0] group-hover:text-white group-hover:bg-[#0060F0] transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-[#00C0F0] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div>
                  {/* Feature Bullets */}
                  <ul className="space-y-2 mb-6 border-t border-[#0060F0]/10 pt-4">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-[#94A3B8]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00C0F0]"></span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Link */}
                  <div className="flex items-center gap-2 text-xs font-mono-tech text-[#00C0F0] font-semibold group-hover:translate-x-1 transition-transform">
                    <span>EXPLORE SERVICE</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
