import { useEffect, useState } from 'react';
import { Phone, MessageCircle, X, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { getConsultAvailability } from '../../lib/consultAvailability';

const STORAGE_KEY = 'handobomb_exit_cta_shown';

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const availability = getConsultAvailability();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(STORAGE_KEY) === '1') return;

    let shown = false;
    const markShown = () => {
      if (shown) return;
      shown = true;
      sessionStorage.setItem(STORAGE_KEY, '1');
      setOpen(true);
    };

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY > 12) return;
      if (e.relatedTarget || (e as MouseEvent & { toElement?: EventTarget }).toElement) return;
      markShown();
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = (window.scrollY + window.innerHeight) / Math.max(doc.scrollHeight, 1);
      if (scrolled >= 0.72) markShown();
    };

    document.addEventListener('mouseout', onMouseOut);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="exitCtaTitle"
        className="relative w-full max-w-md bg-brand-card border border-brand-yellow/30 clip-chamfer p-6 sm:p-8 shadow-[0_0_40px_rgba(232,255,63,0.15)]"
      >
        <button
          type="button"
          aria-label="닫기"
          className="absolute top-3 right-3 p-2 text-brand-body hover:text-white"
          onClick={() => setOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>

        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4 border ${
            availability.open
              ? 'bg-brand-green/15 text-brand-green border-brand-green/30'
              : 'bg-white/5 text-brand-body border-white/10'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${availability.open ? 'bg-brand-green animate-pulse' : 'bg-brand-body'}`} />
          {availability.label}
        </div>

        <h3 id="exitCtaTitle" className="text-2xl font-display font-black text-white mb-2 tracking-tight">
          조건 확인, 지금 남겨두세요
        </h3>
        <p className="text-sm text-brand-body leading-relaxed mb-6">
          {availability.detail}
          <br />
          상담 신청만으로 신용조회·계약은 진행되지 않습니다.
        </p>

        <div className="space-y-3">
          <Button
            variant="primary"
            fullWidth
            size="lg"
            onClick={() => {
              setOpen(false);
              document.getElementById('consult-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            조건 확인 신청하기 <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="accent" fullWidth onClick={() => (window.location.href = 'tel:18004959')}>
              <Phone className="w-4 h-4 mr-1" /> 전화
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => window.open('https://open.kakao.com/o/seC75DCi', '_blank')}
            >
              <MessageCircle className="w-4 h-4 mr-1 text-brand-yellow" />
              <span className="text-white">카톡</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
