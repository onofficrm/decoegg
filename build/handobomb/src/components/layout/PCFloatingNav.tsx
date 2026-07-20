import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { focusPage } from '../../lib/sitePages';

export function PCFloatingNav() {
  return (
    <div className="hidden md:flex flex-col gap-3 fixed top-1/2 right-6 -translate-y-1/2 z-50">
      <a
        href="tel:18004959"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-brand-orange text-white shadow-[0_0_20px_rgba(255,90,31,0.25)] hover:scale-105 transition-transform"
        aria-label="전화상담"
      >
        <Phone className="w-5 h-5" />
        <span className="absolute right-14 bg-black/90 text-white text-xs font-medium px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          전화상담
        </span>
      </a>

      <a
        href="https://open.kakao.com/o/seC75DCi"
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-brand-yellow text-brand-bg shadow-[0_0_20px_rgba(232,255,63,0.2)] hover:scale-105 transition-transform"
        aria-label="카카오톡 상담"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="absolute right-14 bg-black/90 text-white text-xs font-medium px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          카카오톡
        </span>
      </a>

      <button
        type="button"
        onClick={() => focusPage('/')}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-black/70 border border-white/10 text-brand-body hover:text-white hover:border-white/25 transition-all mt-2"
        aria-label="맨 위로"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}
