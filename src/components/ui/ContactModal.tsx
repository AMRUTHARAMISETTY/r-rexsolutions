import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2, Send, Phone, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectScope: 'Web Application or SaaS Platform',
    budget: 'under-5k',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.message.trim()) newErrors.message = 'Please describe your project';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#3b82f6', '#06b6d4', '#a855f7'],
      });
    }, 1000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      projectScope: 'Web Application or SaaS Platform',
      budget: 'under-5k',
      message: '',
    });
    setErrors({});
    onClose();
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-2.5 rounded-xl bg-gray-950/80 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 transition-all ${
      errors[field]
        ? 'border-red-500 focus:border-red-400 focus:ring-red-500/30'
        : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/20'
    }`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl z-10 my-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  FREE CONSULTATION
                </div>
                <h2 id="contact-modal-title" className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-1">
                  Let's Build Something Great
                </h2>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  Tell us about your project. We'll get back to you within 24 hours with a clear plan, timeline, and transparent quote.
                </p>

                {/* Quick contact badges */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <a
                    href="mailto:hello@r-rexsolutions.com"
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    hello@r-rexsolutions.com
                  </a>
                  <a
                    href="tel:+1234567890"
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    +1 (234) 567-8900
                  </a>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Name + Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={inputClass('name')}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        placeholder="Your Company Name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className={inputClass('company')}
                      />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClass('email')}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={inputClass('phone')}
                      />
                    </div>
                  </div>

                  {/* Project Type + Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        What Are You Building? <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={formData.projectScope}
                        onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 cursor-pointer"
                      >
                        <option value="Web Application or SaaS Platform">Web Application / SaaS Platform</option>
                        <option value="School or College ERP System">School / College ERP System</option>
                        <option value="Hospital or Clinic Management">Hospital / Clinic Management</option>
                        <option value="AI Chatbot or Automation Tool">AI Chatbot / Automation Tool</option>
                        <option value="Mobile App (iOS & Android)">Mobile App (iOS &amp; Android)</option>
                        <option value="E-Commerce or Retail Platform">E-Commerce / Retail Platform</option>
                        <option value="Business ERP or CRM">Business ERP / CRM</option>
                        <option value="Other">Other / Not sure yet</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 cursor-pointer"
                      >
                        <option value="under-2k">Under $2,000</option>
                        <option value="under-5k">$2,000 – $5,000</option>
                        <option value="5k-10k">$5,000 – $10,000</option>
                        <option value="10k-25k">$10,000 – $25,000</option>
                        <option value="25k-plus">$25,000+</option>
                        <option value="discuss">Let's discuss</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Describe Your Project <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="What problem are you trying to solve? What features do you need? Any timeline requirements?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`${inputClass('message')} resize-none`}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-heading font-semibold text-base transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending your request...
                      </span>
                    ) : (
                      <>
                        <span>Get Free Consultation</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-500">
                    We reply within 24 hours. No spam, no commitments.
                  </p>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="py-8 text-center flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-white mb-3">
                  Message Received! 🎉
                </h3>
                <p className="text-slate-300 text-sm max-w-sm mx-auto mb-3 leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{formData.name}</span>. Our team will review your project details and get back to you within <strong className="text-cyan-400">24 hours</strong>.
                </p>
                <p className="text-slate-400 text-xs mb-8">
                  Check your inbox at <span className="text-slate-200">{formData.email}</span>
                </p>
                <button
                  onClick={handleReset}
                  className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-heading font-semibold text-sm transition-all cursor-pointer shadow-lg shadow-blue-600/25"
                >
                  Back to Website
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
