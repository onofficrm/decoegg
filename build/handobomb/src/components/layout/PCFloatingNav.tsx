import { Phone, MessageCircle, FileSearch, Car, ArrowUp } from 'lucide-react';

export function PCFloatingNav() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="hidden md:flex flex-col gap-3 fixed top-1/2 right-6 -translate-y-1/2 z-50">
      <a 
        href="tel:18004959"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-brand-orange text-white shadow-[0_0_20px_rgba(255,90,31,0.3)] hover:scale-110 transition-transform"
      >
        <Phone className="w-6 h-6" />
        <span className="absolute right-16 bg-brand-orange text-white text-sm font-bold px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          전화상담
        </span>
      </a>

      <a 
        href="https://open.kakao.com/o/seC75DCi"
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-brand-yellow text-brand-bg shadow-[0_0_20px_rgba(232,255,63,0.3)] hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-16 bg-brand-yellow text-brand-bg text-sm font-bold px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          카카오톡
        </span>
      </a>

      <a 
        href="#consult-form"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-brand-card border border-white/20 text-white shadow-lg hover:border-brand-yellow hover:text-brand-yellow transition-all"
      >
        <FileSearch className="w-6 h-6" />
        <span className="absolute right-16 bg-brand-card border border-white/20 text-white text-sm font-bold px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          조건 확인
        </span>
      </a>

      <a 
        href="#garage"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-brand-card border border-white/20 text-white shadow-lg hover:border-brand-yellow hover:text-brand-yellow transition-all"
      >
        <Car className="w-6 h-6" />
        <span className="absolute right-16 bg-brand-card border border-white/20 text-white text-sm font-bold px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          차량 보기
        </span>
      </a>

      <button 
        onClick={scrollToTop}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-brand-card border border-white/20 text-brand-body shadow-lg hover:bg-white/10 transition-all mt-4"
      >
        <ArrowUp className="w-6 h-6" />
        <span className="absolute right-16 bg-brand-card border border-white/20 text-brand-body text-sm font-bold px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          맨 위로
        </span>
      </button>
    </div>
  );
}
