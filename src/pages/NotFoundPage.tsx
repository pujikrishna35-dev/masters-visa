import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] bg-[#FAF7F1] flex items-center justify-center py-20 px-4">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FDF7EC] border-2 border-[#D99A35]/35 text-[#D99A35] mx-auto shadow-md">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D99A35]">
            404 — PAGE NOT FOUND
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#10243F] font-serif">
            Looks like you’ve wandered off the map
          </h1>
          <p className="text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
            The page you are looking for doesn’t exist, has been moved, or the link might be broken.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D99A35] to-[#F16B55] hover:opacity-95 text-white text-xs sm:text-sm font-bold rounded-full shadow-md transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            to="/destinations"
            className="inline-flex items-center gap-1.5 px-5 py-3 bg-white hover:bg-slate-50 text-[#10243F] border border-slate-200 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer"
          >
            <span>Explore Destinations</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D99A35]" />
          </Link>
        </div>

        <div className="pt-8 border-t border-slate-200/80">
          <p className="text-xs text-slate-400">
            Need urgent assistance? Call our admissions desk at{' '}
            <a href="tel:+918185883705" className="text-[#D99A35] font-semibold hover:underline">
              +91 81858 83705
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
