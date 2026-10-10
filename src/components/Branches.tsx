import React, { useState } from 'react';
import { ArrowRight, MapPin, Phone, Mail, X } from 'lucide-react';
import { BRANCHES } from '../data/content';
import type { Branch } from '../types';

interface Props {
  onOpenCounselling: () => void;
}

export const Branches: React.FC<Props> = ({ onOpenCounselling }) => {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  return (
    <section id="branches" className="py-16 bg-brand-bg-subtle/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
              OUR BRANCHES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
              Our <span className="text-brand-coral font-serif italic">Branches</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              Find a Masters Visa centre near you across major education hubs.
            </p>
          </div>

          <button
            onClick={onOpenCounselling}
            className="text-sm font-bold text-brand-navy hover:text-brand-coral flex items-center gap-1.5 transition-colors group self-start md:self-auto"
          >
            <span>View All Branches</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 City Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BRANCHES.map((branch) => (
            <div
              key={branch.id}
              onClick={() => setSelectedBranch(branch)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* City Photo */}
              <div className="relative h-28 w-full overflow-hidden bg-slate-100">
                <img
                  src={branch.image}
                  alt={branch.city}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {branch.isHeadquarter && (
                  <span className="absolute top-2 left-2 bg-brand-coral text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-floating border border-slate-100 relative">
            <button
              onClick={() => setSelectedBranch(null)}
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
                <h3 className="text-xl font-bold">{selectedBranch.city} Centre</h3>
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
