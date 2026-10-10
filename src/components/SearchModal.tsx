import React, { useState } from 'react';
import { Search, X, ArrowRight, Globe, Building2, BookOpen, Newspaper } from 'lucide-react';
import { DESTINATIONS, SERVICES, UNIVERSITIES, NEWS_ITEMS } from '../data/content';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination: (destId: string) => void;
}

export const SearchModal: React.FC<Props> = ({ isOpen, onClose, onSelectDestination }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredDestinations = DESTINATIONS.filter(d => 
    d.name.toLowerCase().includes(query.toLowerCase()) || 
    d.shortDesc.toLowerCase().includes(query.toLowerCase()) ||
    d.topCourses.some(c => c.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredUniversities = UNIVERSITIES.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.country.toLowerCase().includes(query.toLowerCase())
  );

  const filteredServices = SERVICES.filter(s =>
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredNews = NEWS_ITEMS.filter(n =>
    n.title.toLowerCase().includes(query.toLowerCase()) ||
    n.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-brand-navy/60 backdrop-blur-sm">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-floating border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative border-b border-slate-100 px-6 py-4 flex items-center">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search countries, universities, courses, or services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base text-brand-navy placeholder-slate-400 bg-transparent outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-brand-navy hover:bg-slate-100 transition-colors ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
          {/* Quick suggestions when empty */}
          {!query && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {['Study in UK', 'Germany Free Tuition', 'USA STEM OPT', 'Canada Post-Grad Work', 'IELTS Prep', 'Scholarships 2026'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term.split(' ')[term.split(' ').length - 1])}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-brand-coral-light hover:text-brand-coral text-xs font-medium text-slate-600 rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Destinations */}
          {filteredDestinations.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <Globe className="w-4 h-4 text-brand-coral" /> Study Destinations
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredDestinations.slice(0, 4).map(d => (
                  <div
                    key={d.id}
                    onClick={() => {
                      onClose();
                      onSelectDestination(d.id);
                    }}
                    className="p-3 bg-slate-50 hover:bg-brand-bg-subtle rounded-2xl border border-slate-100 cursor-pointer flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{d.flag}</span>
                      <div>
                        <h4 className="text-sm font-bold text-brand-navy group-hover:text-brand-coral transition-colors">{d.name}</h4>
                        <p className="text-xs text-slate-500 line-clamp-1">{d.shortDesc}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-coral group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Universities */}
          {filteredUniversities.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <Building2 className="w-4 h-4 text-blue-500" /> Partner Universities
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredUniversities.map(u => (
                  <div key={u.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                    <span className="text-lg">{u.flag}</span>
                    <div>
                      <h4 className="text-sm font-semibold text-brand-navy">{u.name}</h4>
                      <p className="text-xs text-slate-500">{u.country} • {u.qsRank}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services */}
          {filteredServices.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4 text-emerald-500" /> Services
              </div>
              <div className="space-y-1.5">
                {filteredServices.slice(0, 3).map(s => (
                  <div key={s.id} className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                    <span className="font-semibold text-brand-navy">{s.title}</span>
                    <span className="text-slate-500">{s.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* News */}
          {filteredNews.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <Newspaper className="w-4 h-4 text-amber-500" /> News & Insights
              </div>
              <div className="space-y-2">
                {filteredNews.slice(0, 2).map(n => (
                  <div key={n.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-bold text-brand-coral uppercase tracking-wider">{n.category}</span>
                    <h5 className="text-xs font-semibold text-brand-navy mt-0.5">{n.title}</h5>
                  </div>
                ))}
              </div>
            </div>
          )}

          {query && filteredDestinations.length === 0 && filteredUniversities.length === 0 && filteredServices.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <p>No results found for "{query}".</p>
              <p className="text-xs mt-1">Try searching for USA, UK, IELTS, or Visa guidance.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
