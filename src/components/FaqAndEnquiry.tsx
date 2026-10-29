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
    <section id="faqs" className="py-16 sm:py-24 bg-[#EDF4FF]/40 relative">
      <span id="faq" className="sr-only" />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT: FAQ Accordion (col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#63718E]">
                  FREQUENTLY ASKED
                </span>
                <span className="w-8 h-[2px] bg-[#0755F5] rounded-full inline-block" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101E49] tracking-tight">
                Frequently Asked{' '}
                <span className="text-gradient-blue bg-gradient-to-r from-[#0755F5] to-[#0877FF] bg-clip-text text-transparent">Questions</span>
              </h2>
              <p className="text-sm sm:text-base text-[#63718E] mt-2">
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
                        ? 'border-[#0755F5]/40 bg-white shadow-soft'
                        : 'border-[#DCE7FA] bg-white hover:border-[#0755F5]/30'
                    }`}
                  >
                    <button
                      onClick={() => toggleAccordion(idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                      className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer"
                    >
                      <span className={`text-sm sm:text-base font-bold transition-colors ${
                        isOpen ? 'text-[#0755F5]' : 'text-[#101E49]'
                      }`}>
                        {faq.question}
                      </span>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? 'bg-[#0755F5] text-white' : 'bg-[#EDF4FF] text-[#0755F5] border border-[#DCE7FA]'
                      }`}>
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div
                        id={`faq-answer-${idx}`}
                        className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#63718E] leading-relaxed border-t border-[#DCE7FA]/70 animate-fadeIn"
                      >
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
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE7FA] shadow-card hover:shadow-card-hover transition-all duration-300">
              <div className="mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#EDF4FF] text-[#0755F5] border border-[#DCE7FA] uppercase tracking-wider mb-2">
                  <HelpCircle className="w-3.5 h-3.5" /> Get in Touch
                </span>
                <h3 className="text-2xl font-bold text-[#101E49] tracking-tight">
                  Enquire Now
                </h3>
                <p className="text-xs sm:text-sm text-[#63718E] mt-1">
                  Book a free counselling session with our experts.
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 border border-emerald-100">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-[#101E49]">Application Received!</h4>
                  <p className="text-xs text-[#63718E]">
                    Our lead advisor will contact you within 2 hours to curate your study pathway.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-semibold text-[#0755F5] hover:underline mt-2 inline-block cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#10243F] uppercase tracking-wide mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sravani Reddy"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-[#DCE7FA] rounded-xl text-xs sm:text-sm text-[#101E49] focus:border-[#0755F5] focus:ring-1 focus:ring-[#0755F5] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#101E49] uppercase tracking-wide mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sravani.reddy@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-[#DCE7FA] rounded-xl text-xs sm:text-sm text-[#101E49] focus:border-[#0755F5] focus:ring-1 focus:ring-[#0755F5] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#101E49] uppercase tracking-wide mb-1">
                      Mobile Number *
                    </label>
                    <div className="flex gap-2">
                      <span className="px-3 py-2.5 bg-[#EDF4FF] border border-[#DCE7FA] rounded-xl text-xs text-[#101E49] font-semibold flex items-center">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="98765 43210"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="flex-1 px-4 py-2.5 bg-white border border-[#DCE7FA] rounded-xl text-xs sm:text-sm text-[#101E49] focus:border-[#0755F5] focus:ring-1 focus:ring-[#0755F5] outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#101E49] uppercase tracking-wide mb-1">
                        Interested Country
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-[#DCE7FA] rounded-xl text-xs text-[#101E49] focus:border-[#0755F5] outline-none cursor-pointer"
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
                      <label className="block text-xs font-semibold text-[#101E49] uppercase tracking-wide mb-1">
                        Preferred Intake
                      </label>
                      <select
                        value={intake}
                        onChange={(e) => setIntake(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-[#DCE7FA] rounded-xl text-xs text-[#101E49] focus:border-[#0755F5] outline-none cursor-pointer"
                      >
                        <option value="Fall 2026">Fall 2026</option>
                        <option value="Spring 2027">Spring 2027</option>
                        <option value="Summer 2027">Summer 2027</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#101E49] uppercase tracking-wide mb-1">
                      Course / Program
                    </label>
                      <select
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-[#DCE7FA] rounded-xl text-xs text-[#101E49] focus:border-[#0755F5] focus:ring-1 focus:ring-[#0755F5] outline-none cursor-pointer"
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
                      className="w-full py-3.5 bg-gradient-to-r from-[#0755F5] to-[#0877FF] hover:from-[#0544C7] hover:to-[#0766E6] active:scale-[0.98] text-white font-bold rounded-2xl transition-all shadow-md shadow-[#0755F5]/30 hover:shadow-lg hover:shadow-[#0755F5]/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group mt-2 cursor-pointer"
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

                    <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-[#63718E] text-center">
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
