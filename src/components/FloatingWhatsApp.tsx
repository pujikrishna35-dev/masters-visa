import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Optional Tooltip Bubble */}
      {showTooltip && (
        <div className="bg-white rounded-2xl shadow-floating border border-slate-100 p-3 max-w-xs animate-fadeIn relative text-left">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1 right-1 p-1 text-slate-400 hover:text-slate-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="text-xs font-bold text-[#10243F]">Chat with our Visa Expert</p>
          <p className="text-[11px] text-[#64748B] mt-0.5">We typically reply in 5 minutes on WhatsApp.</p>
        </div>
      )}

      {/* Floating Button */}
      <a
        href="https://wa.me/918185883705?text=Hi%20Masters%20Visa%2C%20I%20am%20interested%20in%20study%20abroad%20counselling."
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-floating flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none"
        aria-label="Chat with Masters Visa on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F16B55] rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">
          1
        </span>
      </a>
    </div>
  );
};
