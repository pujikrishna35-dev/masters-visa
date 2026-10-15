import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { FlagIcon } from './FlagIcon';

interface Props {
  onOpenCounselling: () => void;
}

export const Testimonials: React.FC<Props> = ({ onOpenCounselling }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: '1',
      name: 'Sneha R.',
      country: 'Canada',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      quote: 'Master Visa made my dream of studying in Canada a reality. Their support was amazing throughout the process.',
    },
    {
      id: '2',
      name: 'Karthik M.',
      country: 'UK',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      quote: 'Very professional and genuine guidance. My visa was approved without any hassle. Highly recommended!',
    },
    {
      id: '3',
      name: 'Priya S.',
      country: 'Australia',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      quote: 'Clear process, quick responses and constant support. Master Visa is the best choice for study abroad.',
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Header */}
          <div className="lg:col-span-4 text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#64748B]">
                REAL STUDENT STORIES
              </span>
              <span className="w-8 h-[2px] bg-[#D99A35] rounded-full inline-block" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#10243F] tracking-tight font-serif leading-tight">
              Dreams Turned<br />
              <span className="text-[#D99A35] font-serif">Into Global Journeys</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#64748B] mt-3 leading-relaxed max-w-sm">
              Hear from our students who are now studying and building successful careers around the world.
            </p>

            {/* Slider Navigation Buttons + Dots */}
            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-[#D99A35] hover:text-[#D99A35] active:scale-95 text-slate-600 flex items-center justify-center transition-all shadow-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-[#D99A35] hover:text-[#D99A35] active:scale-95 text-slate-600 flex items-center justify-center transition-all shadow-sm"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-1.5 ml-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`rounded-full transition-all ${
                      currentIndex === idx ? 'w-3 h-2 bg-[#D99A35] rounded-full' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right 3 Testimonial Cards */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  onClick={onOpenCounselling}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenCounselling();
                    }
                  }}
                  className="bg-white rounded-3xl p-5 border border-slate-100/90 shadow-soft hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer text-left select-none"
                >
                  <div>
                    {/* Student Photo */}
                    <div className="w-full h-44 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Quote mark in blue */}
                    <div className="text-blue-500 mb-1.5">
                      <Quote className="w-5 h-5 fill-blue-500" />
                    </div>

                    {/* Quote Text */}
                    <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Student Name & Country Flag */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col gap-1">
                    <h3 className="text-xs font-bold text-[#10243F] group-hover:text-[#D99A35] transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#64748B]">
                      <FlagIcon country={item.country} className="w-3.5 h-2.5 rounded-xs" />
                      <span>{item.country}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
