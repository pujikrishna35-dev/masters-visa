import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  highlightWord?: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  hideBottomBorder?: boolean;
  sideImage?: string;
  sideImageAlt?: string;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  badge,
  badgeIcon,
  title,
  highlightWord,
  description,
  breadcrumbs,
  hideBottomBorder = false,
  sideImage,
  sideImageAlt,
}) => {
  // Render title with highlighted word in electric blue gradient
  const renderTitle = () => {
    if (!highlightWord || !title.includes(highlightWord)) {
      return title;
    }

    const parts = title.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="bg-gradient-to-r from-[#0755F5] to-[#0877FF] bg-clip-text text-transparent font-extrabold">{highlightWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className={`relative overflow-hidden bg-gradient-to-b from-[#EDF4FF] via-[#EDF4FF]/60 to-white ${hideBottomBorder ? '' : 'border-b border-[#DCE7FA]'} pt-10 pb-12 sm:pt-14 sm:pb-16`}>
      {/* Decorative background glow matching the brand palette */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0755F5]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-[#493DFF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${sideImage ? 'lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-10 xl:gap-12' : ''}`}>
          {/* Left Text Column */}
          <div className={`${sideImage ? 'flex-1 max-w-2xl xl:max-w-3xl' : ''}`}>
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#63718E] mb-4 sm:mb-6 font-medium">
              <Link
                to="/"
                className="flex items-center gap-1 hover:text-[#0755F5] transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>

              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <React.Fragment key={idx}>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    {isLast || !crumb.href ? (
                      <span className="text-[#101E49] font-semibold">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        to={crumb.href}
                        className="hover:text-[#0755F5] transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>

            {/* Badge Eyebrow */}
            {badge && (
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DCE7FA] text-[11px] font-bold text-[#0755F5] uppercase tracking-wider shadow-sm">
                  {badgeIcon}
                  <span>{badge}</span>
                </span>
              </div>
            )}

            {/* Big Editorial Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101E49] tracking-tight leading-[1.15] max-w-4xl mb-4">
              {renderTitle()}
            </h1>

            {/* Subtitle Description */}
            <p className="text-sm sm:text-base lg:text-lg text-[#63718E] max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>

          {/* Right Side Illustration */}
          {sideImage && (
            <div className="flex items-center justify-center lg:justify-end shrink-0 w-full lg:w-auto mt-6 lg:mt-0">
              <div className="relative max-w-[480px] sm:max-w-[540px] lg:max-w-[520px] xl:max-w-[620px] w-full flex items-center justify-center">
                {/* Soft ambient radial glow behind illustration */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0755F5]/10 via-[#0755F5]/5 to-transparent rounded-full blur-2xl -z-10 pointer-events-none" />

                <img
                  src={sideImage}
                  alt={sideImageAlt || "Study abroad destinations illustration"}
                  className="w-full h-auto object-contain select-none pointer-events-none transform transition-transform duration-500 hover:scale-[1.02]"
                  style={{
                    maskImage: 'linear-gradient(to bottom, black 82%, transparent 98%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 98%)',
                  }}
                  loading="eager"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
