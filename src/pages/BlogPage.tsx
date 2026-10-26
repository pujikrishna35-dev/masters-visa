import React, { useState } from 'react';
import { PageBanner } from '../components/PageBanner';
import { NewsSection } from '../components/NewsSection';
import { FinalCta } from '../components/FinalCta';
import { NEWS_ITEMS } from '../data/content';
import { Newspaper, Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogPageProps {
  onOpenCounselling: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenCounselling }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'UK Visa', 'Canada Visa', 'Scholarships', 'Admissions', 'USA OPT'];

  const filteredArticles = selectedCategory === 'All'
    ? NEWS_ITEMS
    : NEWS_ITEMS.filter(n => n.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="bg-[#FAF7F1]">
      {/* Page Header Banner */}
      <PageBanner
        breadcrumbs={[{ label: 'Blog & Insights' }]}
        badge="LATEST POLICIES & UPDATES"
        badgeIcon={<Newspaper className="w-3.5 h-3.5 text-[#D99A35]" />}
        title="Global Education News & Visa Insights"
        highlightWord="Visa Insights"
        description="Stay informed with expert analysis on student visa reforms, embassy processing timelines, scholarship deadlines, and country-specific immigration regulations."
      />

      {/* Main Interactive News Section */}
      <NewsSection onOpenCounselling={onOpenCounselling} />

      {/* Categories & Full Archive Grid */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#64748B] block mb-2">
                ARTICLE ARCHIVE
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#10243F] font-serif tracking-tight">
                Browse Articles by <span className="text-[#D99A35] font-serif">Category</span>
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#10243F] text-white shadow-sm'
                      : 'bg-[#FAF7F1] text-slate-600 hover:text-[#10243F] hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-[#FAF7F1] rounded-3xl overflow-hidden border border-slate-200/80 hover:border-[#D99A35]/50 hover:shadow-card transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 text-xs font-bold text-[#10243F] shadow-sm">
                    {article.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {article.date}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#10243F] group-hover:text-[#D99A35] transition-colors leading-snug mb-2 font-serif">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#64748B] line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <button
                    onClick={onOpenCounselling}
                    className="pt-2 text-xs font-bold text-[#D99A35] hover:text-[#B87A1E] flex items-center gap-1 transition-colors self-start cursor-pointer"
                  >
                    <span>Read Full Guide & Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <FinalCta onOpenCounselling={onOpenCounselling} />
    </div>
  );
};

export default BlogPage;
