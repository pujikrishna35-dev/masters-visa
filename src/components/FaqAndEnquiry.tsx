import React, { useState } from 'react';
import { Plus, Minus, ArrowRight, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/content';
import confetti from 'canvas-confetti';

export const FaqAndEnquiry: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  // Enquiry form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [country, setCountry] = useState('USA');
  const [course, setCourse] = useState('Master of Science (MS)');
  const [intake, setIntake] = useState('Fall 2026');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 90,
          spread: 65,
          origin: { y: 0.7 }
        });
      } catch {
        // silent
      }
    }, 600);
  };

  return (
    <section id="faq" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT: FAQ Accordion (col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1 block">
                FREQUENTLY ASKED
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
                Frequently Asked{' '}
                <span className="text-brand-coral font-serif italic">Questions</span>
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                Find answers to common questions about studying abroad, admissions and visas.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              {FAQS.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'border-brand-coral/40 bg-white shadow-soft'
                        : 'border-slate-100 bg-slate-50/60 hover:border-slate-200'
                    }`}
                  >
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 focus:outline-none"
                    >
                      <span className={`text-sm sm:text-base font-bold transition-colors ${
                        isOpen ? 'text-brand-coral' : 'text-brand-navy'
                      }`}>
                        {faq.question}
                      </span>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? 'bg-brand-coral text-white' : 'bg-white text-slate-400 border border-slate-200'
                      }`}>
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 animate-fadeIn">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Enquire Now Premium Form (col-span-5) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-300">
              <div className="mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-brand-coral/10 text-brand-coral uppercase tracking-wider mb-2">
                  <HelpCircle className="w-3.5 h-3.5" /> Get in Touch
                </span>
                <h3 className="text-2xl font-extrabold text-brand-navy tracking-tight">
                  Enquire Now
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Book a free counselling session with our experts.
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 border border-emerald-100">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-brand-navy">Application Received!</h4>
                  <p className="text-xs text-slate-600">
                    Our lead advisor will contact you within 2 hours to curate your study pathway.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-semibold text-brand-coral hover:underline mt-2 inline-block"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sravani Reddy"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-brand-navy focus:bg-white focus:border-brand-coral focus:ring-1 focus:ring-brand-coral outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sravani.reddy@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-brand-navy focus:bg-white focus:border-brand-coral focus:ring-1 focus:ring-brand-coral outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                      Mobile Number *
                    </label>
                    <div className="flex gap-2">
                      <span className="px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-brand-navy font-semibold flex items-center">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="98765 43210"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-brand-navy focus:bg-white focus:border-brand-coral focus:ring-1 focus:ring-brand-coral outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                        Interested Country
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-brand-navy focus:bg-white focus:border-brand-coral outline-none cursor-pointer"
                      >
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Ireland">Ireland</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                        Preferred Intake
                      </label>
                      <select
                        value={intake}
                        onChange={(e) => setIntake(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-brand-navy focus:bg-white focus:border-brand-coral outline-none cursor-pointer"
                      >
                        <option value="Fall 2026">Fall 2026</option>
                        <option value="Spring 2027">Spring 2027</option>
                        <option value="Summer 2027">Summer 2027</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                      Course / Program
                    </label>
                    <select
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-brand-navy focus:bg-white focus:border-brand-coral outline-none cursor-pointer"
                    >
                      <option value="Master of Science (MS)">Master of Science (MS)</option>
                      <option value="MBA / Management">MBA / Management</option>
                      <option value="Data Science & AI">Data Science & AI</option>
                      <option value="Computer Science / IT">Computer Science / IT</option>
                      <option value="Engineering & Robotics">Engineering & Robotics</option>
                      <option value="Health & Biotechnology">Health & Biotechnology</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-brand-coral hover:bg-brand-coral-hover text-white font-bold rounded-2xl transition-all shadow-md shadow-brand-coral/25 flex items-center justify-center gap-2 group mt-2"
                  >
                    {isSubmitting ? (
                      <span>Scheduling Call...</span>
                    ) : (
                      <>
                        <span>Book Free Counselling</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>No Cost | No Obligation | 100% Confidential</span>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
