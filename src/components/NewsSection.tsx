import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, X } from 'lucide-react';
import { NEWS_ITEMS } from '../data/content';
import type { NewsItem } from '../types';

interface Props {
  onOpenCounselling: () => void;
}

export const NewsSection: React.FC<Props> = ({ onOpenCounselling }) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <section id="news" className="py-16 bg-brand-bg-subtle/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
              NEWS & INSIGHTS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
              Stay Updated with{' '}
              <span className="text-brand-coral font-serif italic">Global Education</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              Latest study abroad updates, visa information and expert guidance.
            </p>
          </div>

          <button
            onClick={onOpenCounselling}
            className="text-sm font-bold text-brand-navy hover:text-brand-coral flex items-center gap-1.5 transition-colors group self-start md:self-auto"
          >
            <span>View All News</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {NEWS_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedNews(item)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* Cover Image with Category Tag */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.categoryColor} shadow-sm`}>
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 text-[10px] text-white/90 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3" />
                  <span>{item.readTime}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-brand-navy group-hover:text-brand-coral transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-coral group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-floating border border-slate-100 relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${selectedNews.categoryColor}`}>
                {selectedNews.category}
              </span>
              <span className="text-xs text-slate-400">{selectedNews.date}</span>
            </div>
            <h3 className="text-xl font-bold text-brand-navy mb-3">{selectedNews.title}</h3>
            <img
              src={selectedNews.image}
              alt={selectedNews.title}
              className="w-full h-48 object-cover rounded-2xl mb-4"
            />
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {selectedNews.summary}
            </p>
            <button
              onClick={() => {
                setSelectedNews(null);
                onOpenCounselling();
              }}
              className="w-full py-3 bg-brand-coral hover:bg-brand-coral-hover text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-brand-coral/25"
            >
              Speak with a Counselor About This Update
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
