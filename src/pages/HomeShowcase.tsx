import React, { useState } from 'react';
import { ArrowLeft, Play, Sparkles, RefreshCw, Cpu, ShieldCheck, Layers, CheckCircle2, TrendingUp, Clock, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HomeShowcaseProps {
  onBackToHero: () => void;
  onOpenContact: () => void;
}

export const HomeShowcase: React.FC<HomeShowcaseProps> = ({ onBackToHero, onOpenContact }) => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'how-we-build' | 'results'>('simulator');
  const [selectedProject, setSelectedProject] = useState('school-erp');
  const [isRunning, setIsRunning] = useState(false);
  const [outputLogs, setOutputLogs] = useState<string[]>([
    '✅ R-REX SOLUTIONS — Project Builder Ready',
    '📋 Select a project type and click "Start Building" to see our process.',
  ]);

  const projectTypes = [
    { id: 'school-erp', label: '🎓 School ERP System' },
    { id: 'hospital', label: '🏥 Hospital Management' },
    { id: 'ecommerce', label: '🛒 E-Commerce Store' },
    { id: 'ai-chatbot', label: '🤖 AI Chatbot' },
  ];

  const projectSteps: Record<string, string[]> = {
    'school-erp': [
      '📋 Step 1: Understanding your school\'s requirements — students, grades, fee structure...',
      '🎨 Step 2: Designing the admin dashboard, parent portal, and student app...',
      '⚙️ Step 3: Building student attendance, grade book, and fee payment system...',
      '🔔 Step 4: Setting up automated parent SMS & email notifications...',
      '🚀 Step 5: Testing with real student data, staff training, and go-live!',
      '✅ Done! Your campus is now fully digital. 5,000+ students managed seamlessly.',
    ],
    hospital: [
      '📋 Step 1: Mapping your clinic workflow — departments, doctors, billing...',
      '🎨 Step 2: Designing patient booking portal and doctor dashboard...',
      '⚙️ Step 3: Building appointment scheduling, prescriptions, and billing module...',
      '🔔 Step 4: Automated appointment reminders via SMS and WhatsApp...',
      '🚀 Step 5: Security testing, staff onboarding, and deployment...',
      '✅ Done! Patient wait times reduced by 45%. Staff loves the system.',
    ],
    ecommerce: [
      '📋 Step 1: Understanding your products, categories, and shipping needs...',
      '🎨 Step 2: Designing a high-converting storefront and product pages...',
      '⚙️ Step 3: Building cart, checkout, payment gateway, and inventory sync...',
      '🔔 Step 4: Setting up order confirmation emails and delivery tracking...',
      '🚀 Step 5: Speed optimization, mobile testing, and launch!',
      '✅ Done! Your store is live and converting visitors into buyers.',
    ],
    'ai-chatbot': [
      '📋 Step 1: Understanding your business — FAQs, products, support scenarios...',
      '🎨 Step 2: Designing the chat interface and conversation flows...',
      '⚙️ Step 3: Training the AI on your company data, products, and policies...',
      '🔔 Step 4: Integrating with your website, WhatsApp, or CRM...',
      '🚀 Step 5: Testing 100+ real conversations and fine-tuning responses...',
      '✅ Done! Your AI assistant handles 70% of customer questions automatically.',
    ],
  };

  const handleRunSimulation = () => {
    setIsRunning(true);
    setOutputLogs(['🚀 Starting your project build simulation...']);

    const steps = projectSteps[selectedProject];
    steps.forEach((step, i) => {
      setTimeout(() => {
        setOutputLogs((prev) => [...prev, step]);
        if (i === steps.length - 1) {
          setIsRunning(false);
          confetti({
            particleCount: 40,
            spread: 55,
            origin: { y: 0.7 },
            colors: ['#06b6d4', '#3b82f6', '#a855f7'],
          });
        }
      }, (i + 1) * 600);
    });
  };

  const results = [
    {
      icon: TrendingUp,
      color: 'text-emerald-400',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-950/40',
      label: 'Average Revenue Impact',
      value: '+38%',
      detail: 'Average revenue increase reported by clients within 6 months of launching their custom software.',
    },
    {
      icon: Clock,
      color: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-950/40',
      label: 'Time Saved Per Week',
      value: '12+ Hours',
      detail: 'Staff time saved weekly from manual tasks after implementing our automation and ERP systems.',
    },
    {
      icon: CheckCircle2,
      color: 'text-blue-400',
      border: 'border-blue-500/30',
      bg: 'bg-blue-950/40',
      label: 'On-Time Delivery Rate',
      value: '96%',
      detail: 'Projects delivered on time and within budget, backed by our milestone-based delivery model.',
    },
    {
      icon: DollarSign,
      color: 'text-purple-400',
      border: 'border-purple-500/30',
      bg: 'bg-purple-950/40',
      label: 'Client Satisfaction Score',
      value: '4.9 / 5',
      detail: 'Based on post-launch feedback surveys from school, hospital, retail, and startup clients.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-cyan-500 p-[1px] shadow-[0_0_20px_rgba(6,182,212,0.4)] flex-shrink-0">
              <div className="w-full h-full bg-[#09090b] rounded-[11px] flex items-center justify-center p-1 overflow-hidden">
                <img
                  src="/assets/r_rex_logo.jpg"
                  alt="R-REX Logo"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            <div>
              <button
                onClick={onBackToHero}
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-cyan-300 mb-1 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </button>
              <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
                R-RE<span className="text-cyan-400">X</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                  How We Work
                </span>
              </h1>
              <p className="text-slate-400 text-sm mt-0.5">
                See exactly how we turn your idea into a live, working software product.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenContact}
            className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 font-heading font-semibold text-xs text-white tracking-wide shadow-md hover:shadow-blue-500/20 transition-all cursor-pointer"
          >
            Start Your Project
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3 mb-8 glass-panel-subtle p-1.5 rounded-2xl w-fit border border-white/10">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Project Simulator
          </button>
          <button
            onClick={() => setActiveTab('how-we-build')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'how-we-build'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            How We Build
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'results'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Client Results
          </button>
        </div>

        {/* Tab 1: Project Simulator */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Panel */}
            <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-white/10 flex flex-col">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-4">
                <Sparkles className="w-4 h-4" /> PROJECT BUILD SIMULATOR
              </div>
              <h3 className="font-heading font-extrabold text-xl text-white mb-2">
                See How We'd Build Your Project
              </h3>
              <p className="text-slate-400 text-xs mb-6">
                Select your project type and watch our step-by-step delivery process unfold in real time.
              </p>

              <div className="space-y-2 mb-6">
                {projectTypes.map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => {
                      setSelectedProject(pt.id);
                      setOutputLogs([
                        '✅ R-REX SOLUTIONS — Project Builder Ready',
                        `📋 Selected: ${pt.label}. Click "Start Building" to see our process.`,
                      ]);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                      selectedProject === pt.id
                        ? 'bg-blue-600/20 border-blue-500/50 text-white'
                        : 'glass-panel-subtle border-white/10 text-slate-300 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    {pt.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleRunSimulation}
                disabled={isRunning}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 font-heading font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/30 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-auto"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Building in progress...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" /> Start Building
                  </>
                )}
              </button>
            </div>

            {/* Output Panel */}
            <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-white/10 flex flex-col">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <span className="text-slate-400 flex items-center gap-2 text-xs font-mono">
                  🖥️ Live Build Preview
                </span>
                {isRunning && (
                  <span className="text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded text-[10px] border border-emerald-500/30 animate-pulse">
                    BUILDING...
                  </span>
                )}
                {!isRunning && outputLogs.some(l => l.includes('✅ Done')) && (
                  <span className="text-blue-400 bg-blue-950/50 px-2 py-0.5 rounded text-[10px] border border-blue-500/30">
                    COMPLETE
                  </span>
                )}
              </div>

              <div className="flex-1 bg-gray-950/90 rounded-xl p-4 overflow-y-auto max-h-80 space-y-2.5 border border-white/5 font-mono text-sm">
                {outputLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={
                      log.includes('✅ Done')
                        ? 'text-emerald-400 font-bold'
                        : log.includes('🚀')
                        ? 'text-cyan-300'
                        : log.includes('⚙️')
                        ? 'text-blue-300'
                        : 'text-slate-300'
                    }
                  >
                    {log}
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs text-blue-200 leading-relaxed">
                💡 <strong>This is how every project works at R-REX SOLUTIONS</strong> — clear steps, real communication, and zero surprises.
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: How We Build */}
        {activeTab === 'how-we-build' && (
          <div className="glass-panel rounded-3xl p-8 border border-white/10">
            <h3 className="font-heading font-extrabold text-2xl text-white mb-2">
              Our Simple 3-Layer Approach
            </h3>
            <p className="text-slate-400 text-sm mb-8 max-w-2xl">
              Every R-REX solution is built in three layers — a beautiful front-end your customers see, a powerful engine that runs your business, and a secure cloud backbone that keeps everything running 24/7.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-gray-950/80 border border-cyan-500/30">
                <div className="p-3 rounded-xl bg-cyan-950/60 w-fit text-cyan-400 mb-4">
                  <Layers className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-lg text-white mb-2">What Your Users See</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  A fast, beautiful, and easy-to-use interface — whether it's a web app, admin dashboard, customer portal, or mobile app. Designed to feel intuitive from day one.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {['Mobile-friendly design', 'Intuitive navigation', 'Fast page loading', 'Modern & professional look'].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-gray-950/80 border border-blue-500/30">
                <div className="p-3 rounded-xl bg-blue-950/60 w-fit text-blue-400 mb-4">
                  <Cpu className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-lg text-white mb-2">The Engine Behind It</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  All the logic that makes your software smart — automated processes, billing, data calculations, AI responses, and real-time updates that run reliably in the background.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {['Business rules & automation', 'AI integrations', 'Payment processing', 'Email & SMS notifications'].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-gray-950/80 border border-purple-500/30">
                <div className="p-3 rounded-xl bg-purple-950/60 w-fit text-purple-400 mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-lg text-white mb-2">Safe, Secure & Always On</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Your data is protected with login security, role-based permissions, and automatic backups. Hosted on enterprise-grade cloud servers with 99.9% uptime.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {['Secure user logins', 'Role-based access', 'Daily data backups', '99.9% uptime hosting'].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Client Results */}
        {activeTab === 'results' && (
          <div className="glass-panel rounded-3xl p-8 border border-white/10">
            <h3 className="font-heading font-extrabold text-2xl text-white mb-2">
              Real Results From Real Clients
            </h3>
            <p className="text-slate-400 text-sm mb-8 max-w-2xl">
              Numbers don't lie. Here's what clients reported after working with R-REX SOLUTIONS to build and launch their custom software.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {results.map((result, idx) => {
                const Icon = result.icon;
                return (
                  <div key={idx} className={`p-6 rounded-2xl ${result.bg} border ${result.border} flex items-start gap-4`}>
                    <div className={`p-3 rounded-xl bg-gray-950/80 border border-white/10 ${result.color} shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`font-heading font-black text-3xl ${result.color} mb-1`}>{result.value}</div>
                      <div className="font-heading font-bold text-sm text-white mb-2">{result.label}</div>
                      <p className="text-slate-400 text-xs leading-relaxed">{result.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-5 rounded-2xl bg-blue-950/30 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-heading font-bold text-white mb-1">Ready to see results like these?</h4>
                <p className="text-slate-400 text-sm">Book a free consultation — no commitment required.</p>
              </div>
              <button
                onClick={onOpenContact}
                className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 font-heading font-semibold text-sm text-white transition-all shrink-0 cursor-pointer shadow-lg shadow-blue-600/25"
              >
                Book Free Consultation
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
