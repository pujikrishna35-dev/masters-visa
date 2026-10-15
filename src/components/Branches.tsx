import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Phone, Mail, X } from 'lucide-react';
import { BRANCHES } from '../data/content';
import type { Branch } from '../types';

interface Props {
  onOpenCounselling: () => void;
}

export const Branches: React.FC<Props> = ({ onOpenCounselling }) => {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  useEffect(() => {
    if (!selectedBranch) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedBranch(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedBranch]);

  return (
    <section id="contact" className="py-16 sm:py-20 bg-[#FAF7F1] relative scroll-mt-20">
      <span id="branches" className="sr-only" />
      <span id="contact-us" className="sr-only" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#64748B]">
                CONTACT US & OUR BRANCHES
              </span>
              <span className="w-8 h-[2px] bg-[#D99A35] rounded-full inline-block" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#10243F] tracking-tight font-serif">
              Contact <span className="text-[#D99A35] font-serif">Our Branches</span>
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-2">
              Find a Masters Visa centre near you across major education hubs.
            </p>
          </div>

          <button
            onClick={onOpenCounselling}
            className="text-sm font-bold text-[#10243F] hover:text-[#D99A35] flex items-center gap-1.5 transition-colors group self-start md:self-auto"
          >
            <span>View All Branches</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 City Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {BRANCHES.map((branch) => (
            <div
              key={branch.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedBranch(branch)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedBranch(branch);
                }
              }}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:border-[#D99A35]/50 transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* City Photo */}
              <div className="relative h-28 w-full overflow-hidden bg-slate-100">
                <img
                  src={branch.image}
                  alt={branch.city}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                {branch.isHeadquarter && (
                  <span className="absolute top-2 left-2 bg-[#D99A35] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    HQ
                  </span>
                )}
              </div>

              {/* City Info */}
              <div className="p-3.5 flex flex-col justify-between flex-1 text-center">
                <h3 className="text-sm font-bold text-brand-navy group-hover:text-brand-coral transition-colors">
                  {branch.city}
                </h3>
                <div className="mt-2 text-[11px] font-bold text-brand-coral flex items-center justify-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Our Branch</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Branch Info Modal */}
      {selectedBranch && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedBranch(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="branch-modal-title"
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-floating border border-slate-100 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBranch(null)}
              aria-label="Close branch details"
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative h-36 rounded-2xl overflow-hidden mb-4">
              <img
                src={selectedBranch.image}
                alt={selectedBranch.city}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <h3 id="branch-modal-title" className="text-xl font-bold">{selectedBranch.city} Centre</h3>
                {selectedBranch.isHeadquarter && (
                  <span className="text-[10px] font-semibold bg-brand-coral px-2 py-0.5 rounded-full">
                    Headquarters
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 mb-6">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-coral shrink-0 mt-0.5" />
                <span>{selectedBranch.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href={`tel:${selectedBranch.phone}`} className="hover:text-brand-coral font-medium">
                  {selectedBranch.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <a href={`mailto:${selectedBranch.email}`} className="hover:text-brand-coral font-medium">
                  {selectedBranch.email}
                </a>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedBranch(null);
                onOpenCounselling();
              }}
              className="w-full py-3 bg-brand-coral hover:bg-brand-coral-hover text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-brand-coral/25"
            >
              Book In-Person Appointment at {selectedBranch.city}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
