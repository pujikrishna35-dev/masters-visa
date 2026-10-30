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
    <div className="bg-[#EDF4FF]">
      {/* Page Header Banner */}
      <PageBanner
        breadcrumbs={[{ label: 'Success Stories' }]}
        badge="REAL EXPERIENCES, REAL RESULTS"
        badgeIcon={<Star className="w-3.5 h-3.5 text-[#0755F5] fill-[#0755F5]" />}
        title="Inspiring Student Success Stories & Reviews"
        highlightWord="Success Stories"
        description="Discover how Masters Visa helped thousands of students secure admissions into Ivy League, Russell Group, and Group of Eight universities with smooth visa approvals and safe arrivals."
      />

      {/* Main Interactive Carousel */}
      <Testimonials onOpenCounselling={onOpenCounselling} />

      {/* Stats Summary Bar */}
      <div className="py-8 bg-transparent">
        <StatsBar />
      </div>

      {/* Complete Student Placement Showcase Grid */}
      <section className="py-16 sm:py-20 bg-white border-t border-[#DCE7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#63718E] block mb-2">
              ALUMNI EXPERIENCES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#101E49] tracking-tight">
              Stories from Every Corner of the <span className="bg-gradient-to-r from-[#0755F5] to-[#0877FF] bg-clip-text text-transparent font-extrabold">Globe</span>
            </h2>
            <p className="text-sm sm:text-base text-[#63718E] mt-3">
              Read how our personalised mentorship guided students from first counseling to landing on campus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-[#EDF4FF]/40 rounded-3xl p-6 sm:p-7 border border-[#DCE7FA] shadow-soft hover:shadow-card hover:border-[#0755F5]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Rating Stars + Country Flag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white text-[#101E49] border border-[#DCE7FA]">
                      {t.country}
                    </span>
                  </div>

                  {/* Student Quote */}
                  <p className="text-sm text-[#172344] italic leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Student Info */}
                <div className="pt-4 border-t border-[#DCE7FA] flex items-center gap-3.5">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#0755F5]/40"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-[#101E49] truncate">
                      {t.name}
                    </h4>
                    <p className="text-xs text-[#0755F5] font-semibold truncate">
                      {t.university}
                    </p>
                    <p className="text-[11px] text-[#63718E] truncate">
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
