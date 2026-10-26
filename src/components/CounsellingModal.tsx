import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, Sparkles, ArrowRight, Phone, Mail, User, Globe, Calendar, GraduationCap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultDestination?: string;
}

export const CounsellingModal: React.FC<Props> = ({ isOpen, onClose, defaultDestination = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    destination: defaultDestination || 'USA',
    program: 'Master\'s Degree (MS / MSc / MA)',
    intake: 'Fall 2026',
    notes: ''
  });

  useEffect(() => {
    if (defaultDestination) {
      let mapped = defaultDestination;
      const lower = defaultDestination.toLowerCase().trim();
      if (['corporate-internships', 'corporate internships & co-op', 'internships', 'internship', 'co-op', 'coop', 'corporate'].includes(lower)) {
        mapped = 'Corporate Internships & Co-op';
      } else if (['part-time-jobs', 'part-time jobs & student work rights', 'part-time', 'parttime', 'campus-jobs', 'campus-job', 'student-work-rights', 'work-rights'].includes(lower)) {
        mapped = 'Part-Time Jobs & Student Work Rights';
      } else if (lower === 'internship & part-time jobs' || lower === 'internship-parttime') {
        mapped = 'Corporate Internships & Co-op';
      }
      setFormData(prev => ({ ...prev, destination: mapped }));
    }
  }, [defaultDestination]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // silent fallback
      }
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-brand-navy/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="counselling-modal-title"
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-floating border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#10243F] via-[#1C385C] to-[#10243F] px-6 py-5 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase bg-[#FDF7EC] text-[#D99A35] px-2.5 py-0.5 rounded-full border border-[#D99A35]/30">
                <Sparkles className="w-3 h-3 text-[#D99A35]" /> Free 1-on-1 Session
              </span>
            </div>
            <h3 id="counselling-modal-title" className="text-xl font-bold mt-1 text-white font-serif">Book Free Counselling</h3>
            <p className="text-xs text-slate-300 mt-0.5">Take the first confident step towards your global career.</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-bold text-brand-navy">Counselling Session Booked!</h4>
            <p className="text-sm text-slate-600 mt-2 max-w-sm mx-auto">
              Thank you, <span className="font-semibold text-brand-navy">{formData.name}</span>. Our senior study abroad counsellor will contact you at <span className="font-semibold text-brand-navy">{formData.countryCode} {formData.phone}</span> within 2 hours.
            </p>

            <div className="mt-6 p-4 bg-brand-bg-subtle rounded-2xl border border-slate-100 text-left text-xs space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Target Destination:</span>
                <span className="font-semibold text-brand-navy">{formData.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Intake:</span>
                <span className="font-semibold text-brand-navy">{formData.intake}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Assigned Branch:</span>
                <span className="font-semibold text-brand-navy">Nellore (Global Online Hub)</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="mt-6 w-full py-3 bg-brand-coral hover:bg-brand-coral-hover text-white font-semibold rounded-xl transition-all shadow-md shadow-brand-coral/20"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-brand-navy placeholder-slate-400 focus:bg-white focus:border-brand-coral focus:ring-2 focus:ring-brand-coral/10 outline-none transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="rahul.sharma@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-brand-navy placeholder-slate-400 focus:bg-white focus:border-brand-coral focus:ring-2 focus:ring-brand-coral/10 outline-none transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                Mobile Number *
              </label>
              <div className="flex gap-2">
                <div className="relative w-28 flex-shrink-0">
                  <select
                    value={formData.countryCode}
                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                    aria-label="Country calling code"
                    className="w-full px-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-brand-navy focus:bg-white focus:border-brand-coral outline-none cursor-pointer"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+971">🇦🇪 +971</option>
                  </select>
                </div>
                <div className="relative flex-1">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-brand-navy placeholder-slate-400 focus:bg-white focus:border-brand-coral focus:ring-2 focus:ring-brand-coral/10 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Destination & Intake Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                  Interested Destination *
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-brand-navy focus:bg-white focus:border-brand-coral outline-none cursor-pointer"
                  >
                    <option value="USA">🇺🇸 USA</option>
                    <option value="UK">🇬🇧 United Kingdom</option>
                    <option value="Canada">🇨🇦 Canada</option>
                    <option value="Australia">🇦🇺 Australia</option>
                    <option value="Germany">🇩🇪 Germany</option>
                    <option value="France">🇫🇷 France</option>
                    <option value="New Zealand">🇳🇿 New Zealand</option>
                    <option value="Ireland">🇮🇪 Ireland</option>
                    <option value="Airport Pickup & Accommodation">✈️ Airport Pickup & Accommodation</option>
                    <option value="Corporate Internships & Co-op">💼 Corporate Internships & Co-op</option>
                    <option value="Part-Time Jobs & Student Work Rights">🕒 Part-Time Jobs & Student Work Rights</option>
                    {formData.destination && ![
                      'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'New Zealand', 'Ireland',
                      'Airport Pickup & Accommodation',
                      'Corporate Internships & Co-op',
                      'Part-Time Jobs & Student Work Rights'
                    ].includes(formData.destination) && (
                      <option value={formData.destination}>{formData.destination}</option>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                  Target Intake
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.intake}
                    onChange={(e) => setFormData({ ...formData, intake: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-brand-navy focus:bg-white focus:border-brand-coral outline-none cursor-pointer"
                  >
                    <option value="Fall 2026">Fall 2026 (Aug/Sep)</option>
                    <option value="Spring 2027">Spring 2027 (Jan/Feb)</option>
                    <option value="Summer 2027">Summer 2027 (May)</option>
                    <option value="Fall 2027">Fall 2027</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Course / Program */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                Target Program
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-brand-navy focus:bg-white focus:border-brand-coral outline-none cursor-pointer"
                >
                  <option value="Master's Degree (MS / MSc / MA)">Master's Degree (MS / MSc / MA)</option>
                  <option value="MBA / Business Management">MBA / Business Management</option>
                  <option value="Data Science / AI / Computing">Data Science / AI / Computing</option>
                  <option value="Engineering / Tech">Engineering / Technology</option>
                  <option value="Undergraduate / Bachelor's">Undergraduate / Bachelor's</option>
                  <option value="Doctoral / PhD">Doctoral / PhD</option>
                </select>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-[#D99A35] via-[#E28330] to-[#F16B55] hover:opacity-95 text-white font-bold rounded-2xl transition-all shadow-md shadow-[#D99A35]/25 flex items-center justify-center gap-2 group mt-2"
            >
              {isLoading ? (
                <span>Securing Your Slot...</span>
              ) : (
                <>
                  <span>Book Free Counselling</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Trust disclaimer */}
            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>No Cost • No Obligation • 100% Confidential</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
