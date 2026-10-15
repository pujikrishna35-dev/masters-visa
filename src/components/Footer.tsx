import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF7F1] border-t border-slate-200/80 pt-16 pb-8 text-[#10243F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200/60">
          
          {/* Col 1: Brand & Socials (col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="lg" />
            <p className="text-xs sm:text-sm text-[#64748B] max-w-sm leading-relaxed pt-2">
              Masters Visa is a premier global education consultancy guiding aspiring students towards top universities across 35+ countries with end-to-end support.
            </p>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white hover:bg-[#1769AA] hover:text-white text-[#10243F] border border-slate-200 flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white hover:bg-[#F16B55] hover:text-white text-[#10243F] border border-slate-200 flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white hover:bg-[#1769AA] hover:text-white text-[#10243F] border border-slate-200 flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white hover:bg-red-600 hover:text-white text-[#10243F] border border-slate-200 flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#10243F]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#64748B]">
              {['Home', 'About Us', 'Study Abroad', 'Our Services', 'News', 'FAQs', 'Contact Us'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-[#D99A35] transition-colors flex items-center gap-1 group"
                  >
                    <span>{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Study Destinations (col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#10243F]">
              Study Destinations
            </h4>
            <ul className="space-y-2 text-xs text-[#64748B]">
              {['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'New Zealand', 'Ireland'].map((country) => (
                <li key={country}>
                  <a href="#destinations" className="hover:text-[#D99A35] transition-colors">
                    Study in {country}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Our Services (col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#10243F]">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs text-[#64748B]">
              {[
                'Career Counselling',
                'Test Preparation',
                'Application Process',
                'Loan Assistance',
                'Mock Interviews',
                'Visa Guidance',
                'Pre-Departure',
                'Part-Time Job Assistance'
              ].map((srv) => (
                <li key={srv}>
                  <a href="#services" className="hover:text-[#D99A35] transition-colors">
                    {srv}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact Us (col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#10243F]">
              Contact Us
            </h4>
            <div className="space-y-3 text-xs text-[#64748B]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F16B55] shrink-0 mt-0.5" />
                <span>123, Education Street, Trunk Road, Nellore, Andhra Pradesh, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="tel:+918185883705" className="hover:text-[#D99A35] font-medium">
                  +91 81858 83705
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-500 shrink-0" />
                <a href="mailto:info@mastersvisa.com" className="hover:text-[#D99A35] font-medium">
                  info@mastersvisa.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-4">
          <p>© 2026 Masters Visa. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-[#D99A35] transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#D99A35] transition-colors">Terms & Conditions</a>
            <a href="#disclaimer" className="hover:text-[#D99A35] transition-colors">Disclaimer</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
