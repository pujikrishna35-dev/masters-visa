import React from 'react';
import { X, CheckCircle2, GraduationCap, DollarSign, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import type { Destination } from '../types';

interface Props {
  destination: Destination | null;
  onClose: () => void;
  onBookCounselling: (destName: string) => void;
}

export const DestinationDetailModal: React.FC<Props> = ({ destination, onClose, onBookCounselling }) => {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-brand-navy/60 backdrop-blur-sm">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-floating border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover Image Header */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/50 to-transparent" />
          
          <button
            onClick={onClose}
            aria-label="Close details"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl">{destination.flag}</span>
                <span className="text-xs uppercase font-bold tracking-widest text-brand-coral bg-white/95 px-2.5 py-0.5 rounded-full">
                  Study Guide
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Study in {destination.name}</h3>
              <p className="text-xs sm:text-sm text-slate-200 mt-0.5">{destination.shortDesc}</p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <DollarSign className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Avg Tuition</p>
              <p className="text-xs font-bold text-brand-navy mt-0.5">{destination.avgTuition}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Post-Study Work</p>
              <p className="text-xs font-bold text-brand-navy mt-0.5">{destination.workPermit}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <ShieldCheck className="w-5 h-5 text-brand-coral mx-auto mb-1" />
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Visa Success</p>
              <p className="text-xs font-bold text-brand-navy mt-0.5">{destination.visaSuccessRate}</p>
            </div>
          </div>

          {/* Top Universities */}
          <div>
            <h4 className="text-sm font-bold text-brand-navy flex items-center gap-2 mb-3">
              <GraduationCap className="w-4 h-4 text-brand-coral" /> Top Partner Universities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {destination.popularUniversities.map((uni, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 bg-brand-bg-subtle rounded-xl text-xs font-semibold text-brand-navy">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{uni}</span>
                </div>
              ))}
            </div>
          </div>

          {/* High In-Demand Courses */}
          <div>
            <h4 className="text-sm font-bold text-brand-navy mb-2.5">Most Popular Master's Programs</h4>
            <div className="flex flex-wrap gap-2">
              {destination.topCourses.map((course, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                  {course}
                </span>
              ))}
            </div>
          </div>

          {/* Why study in this destination bullet points */}
          <div className="p-4 bg-brand-coral-light/60 rounded-2xl border border-brand-coral/20">
            <h5 className="text-xs font-bold uppercase tracking-wider text-brand-coral mb-1">Masters Visa Advantage</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              We provide application fee waivers, expedited offer letters, direct scholarship representation, and mock consular interview practice specifically tailored for student visas to {destination.name}.
            </p>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Next intake deadlines approaching fast. Reserve your free slot today.
          </div>
          <button
            onClick={() => {
              onClose();
              onBookCounselling(destination.name);
            }}
            className="w-full sm:w-auto px-6 py-3 bg-brand-coral hover:bg-brand-coral-hover text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-brand-coral/20 flex items-center justify-center gap-2"
          >
            <span>Apply to {destination.name}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
