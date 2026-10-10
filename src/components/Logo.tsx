import React from 'react';

interface Props {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<Props> = ({ variant = 'dark', size = 'md' }) => {
  const isLight = variant === 'light';

  return (
    <a href="#" className="flex items-center gap-2.5 group focus:outline-none select-none">
      {/* 3D Angled Graduation Cap Icon without dark box */}
      <div className="relative flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 duration-200">
        <svg
          viewBox="0 0 48 48"
          className={size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10'}
          fill="none"
        >
          {/* Cap Lower base */}
          <path
            d="M13 23V31.5C13 31.5 17 36.5 24 36.5C31 36.5 35 31.5 35 31.5V23"
            fill={isLight ? '#FFFFFF' : '#0F233E'}
          />
          {/* Mortarboard Diamond Top */}
          <path
            d="M24 9L44 19L24 29L4 19L24 9Z"
            fill={isLight ? '#FFFFFF' : '#122644'}
          />
          {/* Tassel Button */}
          <circle cx="24" cy="19" r="2" fill="#F05838" />
          {/* Tassel hanging down on left */}
          <path
            d="M24 19C17 21 11.5 25.5 10 28"
            stroke="#F05838"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <rect x="8.5" y="27.5" width="3" height="7.5" rx="1.5" fill="#F05838" />
        </svg>
      </div>

      {/* Brand Name & Tagline */}
      <div className="flex flex-col text-left">
        <div className="flex items-center leading-none">
          <span
            className={`font-black tracking-tight ${
              size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-2xl'
            } ${isLight ? 'text-white' : 'text-brand-navy'}`}
          >
            Masters
          </span>
          <span
            className={`font-black tracking-tight ${
              size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-2xl'
            } text-brand-coral ml-1`}
          >
            Visa
          </span>
        </div>
        <span
          className={`font-bold tracking-[0.18em] ${
            size === 'sm' ? 'text-[8.5px]' : size === 'lg' ? 'text-[11px]' : 'text-[9.5px]'
          } ${isLight ? 'text-slate-300' : 'text-slate-500'} mt-1 uppercase`}
        >
          Your Global Education Partner
        </span>
      </div>
    </a>
  );
};
