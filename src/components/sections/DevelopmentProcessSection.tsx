import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Layout, Code2, ShieldCheck, Rocket, CheckCircle2 } from 'lucide-react';

export const DevelopmentProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: '01',
      title: 'Discovery & Business Strategy',
      subtitle: 'Understanding Requirements',
      icon: Compass,
      color: 'text-amber-400',
      description:
        'We start by understanding your business goals, target audience, budget, and timeline. Together, we define a clear project scope to prevent hidden costs or delays.',
      deliverables: [
        'Detailed Project Requirements & Scope',
        'Budget & Timeline Transparency',
        'Technical & Architecture Recommendation',
      ],
    },
    {
      id: '02',
      title: 'UI/UX Design & Architecture',
      subtitle: 'Prototyping & System Design',
      icon: Layout,
      color: 'text-blue-400',
      description:
        'Our design team creates intuitive, user-friendly wireframes and interactive visual prototypes before writing code, ensuring the product matches your vision.',
      deliverables: [
        'Interactive User Interface Prototypes',
        'Database & System Architecture Plan',
        'Client Feedback & Design Sign-off',
      ],
    },
    {
      id: '03',
      title: 'Agile Software Engineering',
      subtitle: 'Clean & Scalable Development',
      icon: Code2,
      color: 'text-cyan-400',
      description:
        'We build your web applications, ERPs, mobile apps, or AI tools using modern engineering practices. You get weekly updates and live preview links to track progress.',
      deliverables: [
        'Weekly Milestone Demos & Working Builds',
        'Clean, Maintainable Source Code',
        'AI Assistant & Database Integrations',
      ],
    },
    {
      id: '04',
      title: 'Testing & Security Verification',
      subtitle: 'Quality Assurance',
      icon: ShieldCheck,
      color: 'text-purple-400',
      description:
        'We rigorously test your application for speed, security, mobile responsiveness, and usability under heavy traffic to ensure total reliability.',
      deliverables: [
        'Cross-Browser & Mobile Usability Testing',
        'Page Speed & Database Optimization',
        'Role-Based Security & Data Protection',
      ],
    },
    {
      id: '05',
      title: 'Deployment & Dedicated Support',
      subtitle: 'Go-Live & Growth',
      icon: Rocket,
      color: 'text-emerald-400',
      description:
        'We handle seamless cloud deployment, domain setup, team onboarding, and provide continuous technical support to keep your software running smoothly.',
      deliverables: [
        'Smooth Zero-Downtime Launch',
        'Full Source Code & Admin Handoff',
        'Ongoing Maintenance & Support Plans',
      ],
    },
  ];

  return (
    <section 
      id="process"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#09090b] relative overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-xs font-semibold text-blue-400 mb-4 border border-blue-500/20">
            OUR DEVELOPMENT PROCESS
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            A Transparent Step-by-Step <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">Path to Success</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            No jargon, no unexpected surprises. Just clear communication, structured milestones, and predictable execution.
          </p>
        </div>

        {/* Stepper Navigation Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;

            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-xl border transition-all text-left flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? 'glass-panel border-blue-500/60 shadow-[0_0_20px_rgba(37,99,235,0.2)] bg-blue-950/30'
                    : 'glass-panel-subtle border-white/5 hover:border-white/20 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold font-mono ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                    STEP {step.id}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? step.color : 'text-slate-500'}`} />
                </div>
                <h3 className={`font-heading font-semibold text-xs sm:text-sm ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {step.subtitle}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Active Step Content Panel */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-bold text-cyan-400 mb-4">
                STEP {steps[activeStep].id} — {steps[activeStep].subtitle.toUpperCase()}
              </div>

              <h3 className="font-heading font-extrabold text-2xl sm:text-4xl text-white mb-4">
                {steps[activeStep].title}
              </h3>

              <p className="text-slate-300 text-base leading-relaxed mb-8">
                {steps[activeStep].description}
              </p>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Key Deliverables:
                </h4>
                {steps[activeStep].deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm p-8 rounded-2xl bg-gray-950/80 border border-white/10 text-center flex flex-col items-center justify-center">
                {React.createElement(steps[activeStep].icon, {
                  className: `w-16 h-16 mb-4 ${steps[activeStep].color}`,
                })}
                <span className="text-xs font-mono font-bold text-slate-400 mb-2">
                  PHASE {steps[activeStep].id} OF 05
                </span>
                <span className="font-heading font-bold text-lg text-white">
                  {steps[activeStep].title}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
