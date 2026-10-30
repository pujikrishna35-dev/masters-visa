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
      {/* Reference Matched Graduation Cap Icon with Gold Tassel */}
      <div className="relative flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 duration-200">
        <div className={`rounded-xl flex items-center justify-center ${
          size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9'
        }`}>
          <svg
            viewBox="0 0 32 32"
            className="w-full h-full drop-shadow-sm"
            fill="none"
          >
            {/* Cap Crown / Diamond Top */}
            <path
              d="M16 4L2 11L16 18L30 11L16 4Z"
              fill={isLight ? '#FFFFFF' : '#0755F5'}
            />
            {/* Cap Lower Base / Band */}
            <path
              d="M7 14.5V20.5C7 23.5 11 26 16 26C21 26 25 23.5 25 20.5V14.5L16 19L7 14.5Z"
              fill={isLight ? 'rgba(255,255,255,0.75)' : '#101E49'}
            />
            {/* Tassel String & Bob */}
            <path
              d="M26 13V21.5"
              stroke="#F59E0B"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="26" cy="22.5" r="1.5" fill="#F59E0B" />
          </svg>
        </div>
      </div>

      {/* Brand Name matching reference screenshot "MastersVisa" */}
      <div className="flex flex-col text-left">
        <div className="flex items-center leading-none">
          <span
            className={`font-black tracking-tight ${
              size === 'sm' ? 'text-[19px]' : size === 'lg' ? 'text-2xl' : 'text-[21px]'
            } ${isLight ? 'text-white' : 'text-[#101E49]'}`}
          >
            MastersVisa
          </span>
        </div>
        <span
          className={`font-semibold tracking-[0.12em] ${
            size === 'sm' ? 'text-[7.5px]' : size === 'lg' ? 'text-[9px]' : 'text-[8px]'
          } ${isLight ? 'text-blue-200/80' : 'text-[#63718E]'} mt-0.5 uppercase`}
        >
          Your Global Education Partner
        </span>
      </div>
    </Link>
  );
};
