import React, { useEffect, useRef, useState } from 'react';

export interface CountryCard {
  id: string;
  name: string;
  city: string;
  flag: string;
  image: string;
  label?: string;
}

export const COUNTRIES_LIST: CountryCard[] = [
  {
    id: 'usa',
    name: 'USA',
    city: 'New York',
    flag: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=600&q=80',
    label: 'EXPLORE',
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    city: 'London',
    flag: '🇬🇧',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80',
    label: 'EXPLORE',
  },
  {
    id: 'canada',
    name: 'Canada',
    city: 'Toronto',
    flag: '🇨🇦',
    image: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=600&q=80',
    label: 'EXPLORE',
  },
  {
    id: 'australia',
    name: 'Australia',
    city: 'Sydney',
    flag: '🇦🇺',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80',
    label: 'EXPLORE',
  },
  {
    id: 'france',
    name: 'France',
    city: 'Paris',
    flag: '🇫🇷',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    label: 'EXPLORE',
  },
  {
    id: 'germany',
    name: 'Germany',
    city: 'Berlin',
    flag: '🇩🇪',
    image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=600&q=80',
    label: 'EXPLORE',
  },
  {
    id: 'ireland',
    name: 'Ireland',
    city: 'Dublin',
    flag: '🇮🇪',
    image: 'https://images.unsplash.com/photo-1549918864-48ac978761a4?auto=format&fit=crop&w=600&q=80',
    label: 'EXPLORE',
  },
  {
    id: 'new-zealand',
    name: 'New Zealand',
    city: 'Auckland',
    flag: '🇳🇿',
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=600&q=80',
    label: 'EXPLORE',
  },
  {
    id: 'italy',
    name: 'Italy',
    city: 'Rome',
    flag: '🇮🇹',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80',
    label: 'EXPLORE',
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
    city: 'Amsterdam',
    flag: '🇳🇱',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=600&q=80',
    label: 'EXPLORE',
  },
  {
    id: 'sweden',
    name: 'Sweden',
    city: 'Stockholm',
    flag: '🇸🇪',
    image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=600&q=80',
    label: 'EXPLORE',
  },
  {
    id: 'finland',
    name: 'Finland',
    city: 'Helsinki',
    flag: '🇫🇮',
    image: 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=600&q=80',
    label: 'EXPLORE',
  },
  {
    id: 'denmark',
    name: 'Denmark',
    city: 'Copenhagen',
    flag: '🇩🇰',
    image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=600&q=80',
    label: 'EXPLORE',
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    city: 'Zurich',
    flag: '🇨🇭',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80',
    label: 'EXPLORE',
  },
  {
    id: 'dubai-uae',
    name: 'Dubai / UAE',
    city: 'Dubai',
    flag: '🇦🇪',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
    label: 'EXPLORE',
  },
  {
    id: 'singapore',
    name: 'Singapore',
    city: 'Singapore',
    flag: '🇸🇬',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80',
    label: 'EXPLORE',
  },
];

// Tripled to guarantee a true seamless infinite loop without gaps
const TRIPLE_COUNTRIES = [...COUNTRIES_LIST, ...COUNTRIES_LIST, ...COUNTRIES_LIST];

interface Props {
  onSelectCountry?: (country: CountryCard) => void;
}

export const HeroImageCarousel: React.FC<Props> = ({ onSelectCountry }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const offsetRef = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const isPausedRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startOffsetRef = useRef<number>(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isGrabbing, setIsGrabbing] = useState(false);

  // Premium scrolling speed: 28 pixels per second (smooth, continuous, clear movement)
  const SPEED_PX_PER_SEC = 28;

  useEffect(() => {
    let animationFrameId: number;

    const loop = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }
      const delta = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = timestamp;

      // Continuous automatic movement from RIGHT to LEFT
      if (!isDraggingRef.current && !isPausedRef.current) {
        offsetRef.current += SPEED_PX_PER_SEC * delta;
      }

      // True seamless infinite loop wrapping
      if (trackRef.current) {
        const singleSetWidth = trackRef.current.scrollWidth / 3;
        if (singleSetWidth > 50) {
          if (offsetRef.current >= singleSetWidth) {
            offsetRef.current = offsetRef.current % singleSetWidth;
          } else if (offsetRef.current < 0) {
            offsetRef.current = (offsetRef.current % singleSetWidth) + singleSetWidth;
          }
        }
        trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  // Pointer event handlers for manual Drag (Desktop) and Swipe (Mobile/Tablet)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    isPausedRef.current = true;
    setIsGrabbing(true);
    startXRef.current = e.clientX;
    startOffsetRef.current = offsetRef.current;

    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // silent
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    // Drag LEFT -> images move LEFT (offset increases)
    // Drag RIGHT -> images move RIGHT (offset decreases)
    const deltaX = e.clientX - startXRef.current;
    offsetRef.current = startOffsetRef.current - deltaX;

    if (trackRef.current) {
      const singleSetWidth = trackRef.current.scrollWidth / 3;
      if (singleSetWidth > 0) {
        while (offsetRef.current >= singleSetWidth) {
          offsetRef.current -= singleSetWidth;
          startOffsetRef.current -= singleSetWidth;
        }
        while (offsetRef.current < 0) {
          offsetRef.current += singleSetWidth;
          startOffsetRef.current += singleSetWidth;
        }
      }
      trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
    }
  };

  const scheduleResume = () => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
    // Resume automatic movement smoothly after approx 1.5 seconds without resetting position
    resumeTimerRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 1500);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsGrabbing(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // silent
      }
      scheduleResume();
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsGrabbing(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // silent
      }
      scheduleResume();
    }
  };

  return (
    <div className="w-full relative py-1 select-none overflow-hidden">
      {/* Viewport container with soft fade mask on extreme edges */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className={`w-full overflow-hidden relative touch-pan-y ${
          isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, transparent 4%, black 20%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 4%, black 20%, black 100%)',
        }}
        role="region"
        aria-label="Continuous country and study destination carousel"
      >
        {/* Continuous Track */}
        <div
          ref={trackRef}
          className="flex items-center gap-3.5 sm:gap-4 md:gap-4 w-max will-change-transform py-2"
          style={{
            transform: 'translate3d(0, 0, 0)',
          }}
        >
          {TRIPLE_COUNTRIES.map((country, idx) => (
            <div
              key={`${country.id}-${idx}`}
              onClick={() => onSelectCountry && onSelectCountry(country)}
              className="relative flex-shrink-0 w-[155px] sm:w-[165px] md:w-[172px] lg:w-[178px] h-[105px] sm:h-[112px] md:h-[116px] lg:h-[120px] rounded-2xl overflow-hidden border-2 border-white shadow-md shadow-slate-900/15 bg-slate-900 group transition-all duration-300 hover:scale-[1.04] hover:shadow-xl cursor-pointer"
            >
              {/* Country Photograph */}
              <img
                src={country.image}
                alt={`${country.name} - ${country.city}`}
                draggable={false}
                className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-500 group-hover:scale-108"
                loading="lazy"
              />

              {/* Bottom Caption Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-2.5 pt-7 bg-gradient-to-t from-black/90 via-black/55 to-transparent flex items-end justify-between pointer-events-none">
                <div className="flex flex-col min-w-0 pr-1 leading-tight">
                  {/* City Name with Pin */}
                  <div className="flex items-center gap-1">
                    <span className="text-red-500 text-[10px] sm:text-xs leading-none drop-shadow-sm flex-shrink-0">
                      📍
                    </span>
                    <span className="text-white text-xs sm:text-[13px] font-bold tracking-tight drop-shadow-sm truncate">
                      {country.city}
                    </span>
                  </div>
                  {/* Flag + Country Name */}
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[11px] leading-none flex-shrink-0">
                      {country.flag}
                    </span>
                    <span className="text-slate-200 text-[10px] sm:text-[11px] font-medium tracking-tight drop-shadow-sm truncate">
                      {country.name}
                    </span>
                  </div>
                </div>

                {country.label && (
                  <span className="text-[8.5px] uppercase tracking-wider font-extrabold text-white/95 bg-white/20 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/30 flex-shrink-0">
                    {country.label}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
