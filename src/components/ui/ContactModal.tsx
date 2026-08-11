import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialService = '',
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: initialService || 'AI Solutions & Automation',
    budget: '$25,000 - $50,000',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020711]/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="rrex-glass-card max-w-xl w-full p-8 sm:p-10 rounded-3xl border border-[#00C0F0]/40 relative shadow-[0_0_80px_rgba(0,192,240,0.3)]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#94A3B8] hover:text-white p-2 rounded-lg bg-[#06142B] border border-[#0060F0]/30 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#001040] border border-[#00C0F0]/30 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#00C0F0]" />
              <span className="font-mono-tech text-[10px] text-[#00C0F0] uppercase tracking-wider font-semibold">
                PROJECT KICK-OFF
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              START A PROJECT WITH R-REX
            </h3>
            <p className="text-sm text-[#94A3B8] mb-6">
              Fill out your project goals and our engineering team will get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono-tech text-xs text-[#EAF4FF] block mb-1">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#020711] border border-[#0060F0]/30 text-white text-sm focus:border-[#00C0F0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono-tech text-xs text-[#EAF4FF] block mb-1">WORK EMAIL *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#020711] border border-[#0060F0]/30 text-white text-sm focus:border-[#00C0F0] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono-tech text-xs text-[#EAF4FF] block mb-1">PRIMARY SERVICE</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#020711] border border-[#0060F0]/30 text-white text-sm focus:border-[#00C0F0] focus:outline-none"
                  >
                    <option>AI Solutions & Automation</option>
                    <option>Software Engineering</option>
                    <option>Mobile Applications</option>
                    <option>ERP & Business Systems</option>
                    <option>Cloud & Integration</option>
                    <option>Digital Growth</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono-tech text-xs text-[#EAF4FF] block mb-1">ESTIMATED BUDGET</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#020711] border border-[#0060F0]/30 text-white text-sm focus:border-[#00C0F0] focus:outline-none"
                  >
                    <option>$10,000 - $25,000</option>
                    <option>$25,000 - $50,000</option>
                    <option>$50,000 - $100,000</option>
                    <option>$100,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-mono-tech text-xs text-[#EAF4FF] block mb-1">PROJECT DETAILS & OBJECTIVES</label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe what system or AI tool you wish to build..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#020711] border border-[#0060F0]/30 text-white text-sm focus:border-[#00C0F0] focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>SEND PROJECT INQUIRY</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 flex flex-col items-center">
            <CheckCircle2 className="w-16 h-16 text-[#00C0F0] mb-4 animate-bounce" />
            <h3 className="font-display text-2xl font-bold text-white mb-2">INQUIRY RECEIVED</h3>
            <p className="text-sm text-[#94A3B8] max-w-xs">
              Thank you! Our R-REX engineering team has received your submission and will contact you shortly.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
