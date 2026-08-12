import React, { useState } from 'react';
import { Search, Compass, Layout, Code, GitMerge, Rocket, CheckCircle2 } from 'lucide-react';

interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  details: string[];
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'DISCOVER',
    subtitle: 'Understand the requirement.',
    description: 'We analyze your business objectives, operational bottlenecks, user personas, and technical constraints.',
    icon: Search,
    details: ['Stakeholder Workshops', 'Technical Feasibility Audit', 'Data Architecture Assessment', 'ROI Roadmap'],
  },
  {
    number: '02',
    title: 'DEFINE',
    subtitle: 'Identify the right solution.',
    description: 'We establish the precise scope, technology stack, AI model selections, and engineering specifications.',
    icon: Compass,
    details: ['System Architecture Blueprint', 'Tech Stack Selection', 'Sprint & Milestone Timeline', 'Security Protocol Definition'],
  },
  {
    number: '03',
    title: 'DESIGN',
    subtitle: 'Architect the experience & system.',
    description: 'We prototype intuitive UX/UI design systems alongside microservices, schema definitions, and API specifications.',
    icon: Layout,
    details: ['Interactive UI/UX Prototypes', 'DB Schema & API Contracts', 'AI Agent Flowchart', 'Design Token System'],
  },
  {
    number: '04',
    title: 'BUILD',
    subtitle: 'Engineer the product.',
    description: 'Our senior engineers build your software with 100% clean, modular, tested, and maintainable TypeScript/Python code.',
    icon: Code,
    details: ['Agile Sprint Delivery', 'Continuous Automated Testing', 'Clean Architecture Standards', 'Code Quality Inspections'],
  },
  {
    number: '05',
    title: 'INTEGRATE',
    subtitle: 'Connect systems & workflows.',
    description: 'We connect your newly engineered modules with existing legacy ERPs, CRMs, cloud databases, and third-party APIs.',
    icon: GitMerge,
    details: ['Enterprise ERP/CRM Sync', 'Secure Webhook Pipeline', 'Zero-Downtime Data Migration', 'API Mesh Integration'],
  },
  {
    number: '06',
    title: 'LAUNCH',
    subtitle: 'Deploy and optimize.',
    description: 'We deploy to production cloud infrastructure with real-time telemetry, automated backups, and ongoing optimization.',
    icon: Rocket,
    details: ['Cloud Deployment Pipeline', 'Live Performance Telemetry', 'SLAUptime Monitoring', 'Iterative AI Tuning'],
  },
];

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="process" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="font-mono-tech text-xs text-[#00C0F0] uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00C0F0]"></span>
            HOW WE DELIVER — THE R-REX BUILD PROTOCOL
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight">
            FROM IDEA{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0060F0] to-[#00C0F0]">
              TO IMPLEMENTATION.
            </span>
          </h2>
          <p className="text-[#94A3B8] text-base mt-4">
            A battle-tested 6-stage engineering framework that eliminates ambiguity, reduces delivery risk, and guarantees production-grade quality every time.
          </p>
        </div>

        {/* Interactive Process Stepper Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Steps Selector Column */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? 'bg-[#06142B] border-[#00C0F0] shadow-[0_0_25px_rgba(0,192,240,0.25)] translate-x-2'
                      : 'bg-[#020711]/60 border-[#0060F0]/15 hover:border-[#00C0F0]/30 hover:bg-[#06142B]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className={`font-mono-tech text-sm font-bold ${isActive ? 'text-[#00C0F0]' : 'text-[#94A3B8]'}`}>
                        {step.number}
                      </span>
                      <Icon className={`w-5 h-5 ${isActive ? 'text-[#00C0F0]' : 'text-[#94A3B8]'}`} />
                      <div>
                        <h4 className={`font-display font-bold text-base ${isActive ? 'text-white' : 'text-[#94A3B8]'}`}>
                          {step.title}
                        </h4>
                        <p className="text-xs text-[#94A3B8]">{step.subtitle}</p>
                      </div>
                    </div>
                    {isActive && <CheckCircle2 className="w-5 h-5 text-[#00C0F0]" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Step Detailed Card Display */}
          <div className="lg:col-span-7">
            <div className="rrex-glass-card p-8 sm:p-10 rounded-3xl border border-[#00C0F0]/30 relative overflow-hidden min-h-[420px] flex flex-col justify-between">
              
              {/* Angular Background Line */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#0060F0]/15 to-transparent pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono-tech text-xs text-[#00C0F0] bg-[#001040] px-3 py-1 rounded-md border border-[#0060F0]/40">
                    STAGE {steps[activeStep].number} OF 06
                  </span>
                  <div className="p-3 rounded-xl bg-[#0060F0]/20 text-[#00C0F0] border border-[#00C0F0]/30">
                    {React.createElement(steps[activeStep].icon, { className: 'w-6 h-6' })}
                  </div>
                </div>

                <h3 className="font-display text-3xl font-bold text-white mb-2">
                  {steps[activeStep].title}
                </h3>
                <p className="font-display text-lg text-[#00C0F0] mb-4">
                  {steps[activeStep].subtitle}
                </p>
                <p className="text-base text-[#94A3B8] leading-relaxed mb-8">
                  {steps[activeStep].description}
                </p>
              </div>

              <div>
                <h5 className="font-mono-tech text-xs uppercase tracking-wider text-white mb-4">KEY DELIVERABLES:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {steps[activeStep].details.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-[#020711]/70 border border-[#0060F0]/20 text-xs text-[#EAF4FF]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00C0F0]"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
