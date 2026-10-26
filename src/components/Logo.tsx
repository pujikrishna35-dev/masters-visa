import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const Logo: React.FC<Props> = ({ variant = 'dark', size = 'md', to = '/', onClick }) => {
  const isLight = variant === 'light';

  return (
    <Link to={to} onClick={onClick} className="flex items-center gap-2.5 group focus:outline-none select-none">
      {/* Geometric Ribbon / Folded M Emblem */}
      <div className="relative flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 duration-200">
        <svg
          viewBox="0 0 36 36"
          className={size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9'}
          fill="none"
        >
          {/* Left orange wing */}
          <path
            d="M6 28L14 8L18 18L10 32L6 28Z"
            fill="url(#logo-grad-orange)"
          />
          {/* Right coral wing */}
          <path
            d="M30 28L22 8L18 18L26 32L30 28Z"
            fill="url(#logo-grad-coral)"
          />
          {/* Center inner fold */}
          <path
            d="M18 18L14 8H22L18 18Z"
            fill="#FF783E"
            fillOpacity="0.85"
          />
          <defs>
            <linearGradient id="logo-grad-orange" x1="6" y1="8" x2="18" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF9B66" />
              <stop offset="1" stopColor="#FF783E" />
            </linearGradient>
            <linearGradient id="logo-grad-coral" x1="22" y1="8" x2="30" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF783E" />
              <stop offset="1" stopColor="#FF6685" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Name & Tagline */}
      <div className="flex flex-col text-left">
        <div className="flex items-center leading-none">
          <span
            className={`font-black tracking-tight ${
              size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'
            } ${isLight ? 'text-white' : 'text-brand-navy'}`}
          >
            Master
          </span>
          <span
            className={`font-black tracking-tight ${
              size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'
            } text-brand-coral`}
          >
            Visa
          </span>
        </div>
        <span
          className={`font-semibold tracking-[0.18em] ${
            size === 'sm' ? 'text-[8.5px]' : size === 'lg' ? 'text-[10px]' : 'text-[9px]'
          } ${isLight ? 'text-slate-300/90' : 'text-slate-500'} mt-0.5 uppercase`}
        >
          Study &bull; Dream &bull; Settle
        </span>
      </div>
    </Link>
  );
};
