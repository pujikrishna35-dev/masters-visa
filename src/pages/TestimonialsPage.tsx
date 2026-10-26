import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { Testimonials } from '../components/Testimonials';
import { StatsBar } from '../components/StatsBar';
import { FinalCta } from '../components/FinalCta';
import { TESTIMONIALS } from '../data/content';
import { Star } from 'lucide-react';

interface TestimonialsPageProps {
  onOpenCounselling: () => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ onOpenCounselling }) => {
  return (
    <div className="bg-[#FAF7F1]">
      {/* Page Header Banner */}
      <PageBanner
        breadcrumbs={[{ label: 'Success Stories' }]}
        badge="REAL EXPERIENCES, REAL RESULTS"
        badgeIcon={<Star className="w-3.5 h-3.5 text-[#D99A35] fill-[#D99A35]" />}
        title="Inspiring Student Success Stories & Reviews"
        highlightWord="Success Stories"
        description="Discover how Masters Visa helped thousands of students secure admissions into Ivy League, Russell Group, and Group of Eight universities with smooth visa approvals and safe arrivals."
      />

      {/* Main Interactive Carousel */}
      <Testimonials onOpenCounselling={onOpenCounselling} />

      {/* Stats Summary Bar */}
      <div className="py-8 bg-white border-y border-slate-200/70">
        <StatsBar />
      </div>

      {/* Complete Student Placement Showcase Grid */}
      <section className="py-16 sm:py-20 bg-[#FAF7F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#64748B] block mb-2">
              ALUMNI EXPERIENCES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#10243F] font-serif tracking-tight">
              Stories from Every Corner of the <span className="text-[#D99A35] font-serif">Globe</span>
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-3">
              Read how our personalised mentorship guided students from first counseling to landing on campus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft hover:shadow-card hover:border-[#D99A35]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Rating Stars + Country Flag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D99A35] text-[#D99A35]" />
                      ))}
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FAF7F1] text-[#10243F] border border-slate-200">
                      {t.country}
                    </span>
                  </div>

                  {/* Student Quote */}
                  <p className="text-sm text-[#475569] italic leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Student Info */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#D99A35]/40"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-[#10243F] truncate">
                      {t.name}
                    </h4>
                    <p className="text-xs text-[#D99A35] font-semibold truncate">
                      {t.university}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {t.course}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <FinalCta onOpenCounselling={onOpenCounselling} />
    </div>
  );
};

export default TestimonialsPage;
